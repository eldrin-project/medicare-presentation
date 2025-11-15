#!/bin/bash

# MCP Server Setup Script for MediCare Backend
# This script configures MCP servers from project-level .mcp/config.json
# Can be copied to other projects and reused

set +e  # Don't exit on error - handle gracefully

echo "🏥 MediCare Backend - MCP Server Setup"
echo "======================================"
echo ""

# Get script directory (works even if script is symlinked)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_CONFIG="$SCRIPT_DIR/.mcp/config.json"

# Check if config exists
if [ ! -f "$MCP_CONFIG" ]; then
    echo "❌ Error: MCP config not found at $MCP_CONFIG"
    echo "Expected project-level configuration file."
    exit 1
fi

# Check prerequisites
if ! command -v claude &> /dev/null; then
    echo "❌ Error: 'claude' command not found."
    echo "Please install Claude Code first: https://docs.claude.com/en/docs/claude-code"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    echo "❌ Error: 'npx' command not found."
    echo "Please install Node.js first: https://nodejs.org/"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo "❌ Error: 'jq' command not found."
    echo "Please install jq: brew install jq (macOS) or apt-get install jq (Linux)"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Function to check if an MCP server is already installed
is_mcp_installed() {
    local server_name="$1"
    local mcp_list=$(claude mcp list 2>/dev/null)
    if echo "$mcp_list" | grep -qw "$server_name"; then
        return 0  # Found
    else
        return 1  # Not found
    fi
}

# Function to substitute environment variables in config
substitute_env_vars() {
    local json="$1"
    local var_name="$2"
    local var_value="$3"
    echo "$json" | sed "s|\${$var_name}|$var_value|g"
}

# Read server names from config
SERVER_NAMES=$(jq -r '.servers | keys[]' "$MCP_CONFIG")

# Track installed servers for summary
INSTALLED_SERVERS=()
SKIPPED_SERVERS=()

# Process each server
for SERVER_NAME in $SERVER_NAMES; do
    PRIORITY=$(jq -r ".servers.\"$SERVER_NAME\".priority" "$MCP_CONFIG")
    DESCRIPTION=$(jq -r ".servers.\"$SERVER_NAME\".description" "$MCP_CONFIG")
    SETUP_INSTRUCTIONS=$(jq -r ".servers.\"$SERVER_NAME\".setupInstructions // empty" "$MCP_CONFIG")

    # Icon based on priority
    case "$PRIORITY" in
        "essential") ICON="⭐⭐⭐" ;;
        "recommended") ICON="⭐⭐" ;;
        "optional") ICON="⭐" ;;
        *) ICON="🔧" ;;
    esac

    echo "$ICON Setting up $SERVER_NAME ($PRIORITY)..."
    echo "Description: $DESCRIPTION"

    if is_mcp_installed "$SERVER_NAME"; then
        echo "⏭️  $SERVER_NAME already installed, skipping..."
        SKIPPED_SERVERS+=("$SERVER_NAME")
        echo ""
        continue
    fi

    # Get base config
    COMMAND=$(jq -r ".servers.\"$SERVER_NAME\".command" "$MCP_CONFIG")
    ARGS=$(jq -c ".servers.\"$SERVER_NAME\".args" "$MCP_CONFIG")
    ENV=$(jq -c ".servers.\"$SERVER_NAME\".env" "$MCP_CONFIG")
    DEFAULT_ENV=$(jq -r ".servers.\"$SERVER_NAME\".defaultEnv // {}" "$MCP_CONFIG")

    # Check if this server needs environment variables
    NEEDS_ENV=false
    if echo "$ARGS" | grep -q '\${' || echo "$ENV" | grep -q '\${'; then
        NEEDS_ENV=true
    fi

    if [ "$NEEDS_ENV" = true ]; then
        echo ""
        if [ -n "$SETUP_INSTRUCTIONS" ]; then
            echo "$SETUP_INSTRUCTIONS"
            echo ""
        fi

        # Handle server-specific environment variable collection
        case "$SERVER_NAME" in
            "postgres")
                DEFAULT_URL=$(echo "$DEFAULT_ENV" | jq -r '.POSTGRES_URL // "postgresql://postgres:postgres@localhost:5432/medicare_dev"')
                read -p "Enter PostgreSQL connection string [$DEFAULT_URL]: " POSTGRES_URL
                POSTGRES_URL=${POSTGRES_URL:-$DEFAULT_URL}
                ARGS=$(substitute_env_vars "$ARGS" "POSTGRES_URL" "$POSTGRES_URL")
                ;;

            "brave-search")
                read -p "Enter your Brave API key (or press Enter to skip): " BRAVE_API_KEY
                if [ -z "$BRAVE_API_KEY" ]; then
                    echo "⏭️  Skipped $SERVER_NAME"
                    SKIPPED_SERVERS+=("$SERVER_NAME")
                    echo ""
                    continue
                fi
                ENV=$(substitute_env_vars "$ENV" "BRAVE_API_KEY" "$BRAVE_API_KEY")
                ;;

            "github")
                read -p "Enter your GitHub token (or press Enter to skip): " GITHUB_TOKEN
                if [ -z "$GITHUB_TOKEN" ]; then
                    echo "⏭️  Skipped $SERVER_NAME"
                    SKIPPED_SERVERS+=("$SERVER_NAME")
                    echo ""
                    continue
                fi
                ENV=$(substitute_env_vars "$ENV" "GITHUB_TOKEN" "$GITHUB_TOKEN")
                ;;
        esac
    fi

    # Build final JSON config
    MCP_JSON=$(jq -n \
        --arg command "$COMMAND" \
        --argjson args "$ARGS" \
        --argjson env "$ENV" \
        '{command: $command, args: $args, env: $env}')

    # Install the server
    if claude mcp add-json "$SERVER_NAME" "$MCP_JSON"; then
        echo "✅ $SERVER_NAME configured"
        INSTALLED_SERVERS+=("$SERVER_NAME")
    else
        echo "⚠️  Failed to configure $SERVER_NAME (may already exist)"
        SKIPPED_SERVERS+=("$SERVER_NAME")
    fi

    echo ""
done

# Summary
echo "======================================"
echo "🎉 MCP Server Setup Complete!"
echo "======================================"
echo ""

if [ ${#INSTALLED_SERVERS[@]} -gt 0 ]; then
    echo "✅ Newly installed servers:"
    for server in "${INSTALLED_SERVERS[@]}"; do
        DESC=$(jq -r ".servers.\"$server\".description" "$MCP_CONFIG")
        echo "  • $server - $DESC"
    done
    echo ""
fi

if [ ${#SKIPPED_SERVERS[@]} -gt 0 ]; then
    echo "⏭️  Skipped/Already installed:"
    for server in "${SKIPPED_SERVERS[@]}"; do
        echo "  • $server"
    done
    echo ""
fi

echo "⚠️  IMPORTANT: Restart Claude Code to activate the MCP servers."
echo ""
echo "Usage examples:"
echo "  - 'Show me the patients table schema' (PostgreSQL MCP)"
echo "  - 'Search for Axum middleware examples' (Brave Search MCP)"
echo "  - 'Remember: we use Argon2id for password hashing' (Memory MCP)"
echo "  - 'Create a PR for the auth module' (GitHub MCP)"
echo ""
echo "Configuration file: .mcp/config.json"
echo "To reuse in other projects: cp -r .mcp /path/to/other/project && ./setup-mcp.sh"
echo ""
