# Quick Start Guide

Get started with the MediCare Copywriter Plugin in under 5 minutes.

## Installation (One-Time Setup)

### Step 1: Add the Marketplace

```bash
/plugin marketplace add /Users/tibor/projects/medi-care-app/medicare-copywriter/.claude-plugin/marketplace.json
```

### Step 2: Install the Plugin

```bash
/plugin install medicare-copywriter@medicare-dev-marketplace
```

### Step 3: Verify Installation

```bash
/help
```

You should see these new commands:
- `/generate-hero`
- `/generate-features`
- `/generate-cta`
- `/generate-persona`
- `/translate-copy`
- `/refine-medical-tone`

## Common Use Cases

### Use Case 1: Create a Patient Hero Section

```
/generate-hero
```

**When prompted, answer**:
- Persona: **Patient**
- Features to highlight: **Easy appointment booking, secure messaging, 24/7 access**

**You'll get**: Complete hero section with badge, headline, subtitle, CTAs, and stats.

### Use Case 2: Generate Practice Features

```
/generate-features
```

**When prompted, answer**:
- Persona: **Practice**
- Number of features: **4**
- Specific features: **Scheduling, patient portal, billing, analytics**

**You'll get**: 4 polished feature descriptions with icons and technical tags.

### Use Case 3: Improve Existing Copy

```
/refine-medical-tone
```

**Then provide**:
```
Original copy: "Our platform helps you manage your health."
Target persona: Patient
```

**You'll get**: Refined version with Medical Futurism tone, explanations of changes, and alternatives.

### Use Case 4: Translate to Romanian

```
/translate-copy
```

**Then provide**:
```
Source text: "Transform Patient Care with Intelligent Healthcare"
Target language: Romanian (ro)
Content type: Hero headline
```

**You'll get**: Romanian translation with cultural adaptations and character count.

## 5-Minute Tutorial

Let's create complete marketing copy for the Patient persona:

### 1. Hero Section (1 min)
```
/generate-hero

Persona: Patient
Features: Easy scheduling, secure messaging, instant access
```

### 2. Features (2 min)
```
/generate-features

Persona: Patient
Number: 4
Features: Appointment booking, telemedicine, medical records, notifications
```

### 3. CTA (1 min)
```
/generate-cta

Placement: Footer
Persona: Patient
Offer: Free trial
```

### 4. Translate (1 min)
```
/translate-copy

Source: [paste your hero headline]
Target: Romanian
```

**Result**: Complete patient page copy in under 5 minutes!

## Tips & Tricks

### Tip 1: Generate Multiple Variations
Each command can provide 2-3 variations. Just ask:
```
/generate-hero

Can you provide 3 different variations for the Practice persona?
```

### Tip 2: Refine Before Translating
Always refine your English copy first:
```
1. /generate-hero
2. /refine-medical-tone (on the output)
3. /translate-copy (translate refined version)
```

### Tip 3: Persona Comparison
Generate the same section for all three personas to see differences:
```
/generate-features

Generate scheduling feature for Patient, then Practice, then Clinic personas
```

### Tip 4: A/B Test Variations
Ask for different urgency levels or tone:
```
/generate-cta

Generate 2 versions: one urgent, one relaxed
```

## Troubleshooting

### Commands not showing in /help?
**Solution**: Reinstall the plugin
```bash
/plugin uninstall medicare-copywriter
/plugin install medicare-copywriter@medicare-dev-marketplace
```

### Want to update the plugin?
After making changes to command files:
```bash
/plugin uninstall medicare-copywriter
/plugin install medicare-copywriter@medicare-dev-marketplace
```

### Need to see plugin details?
```bash
/plugin
```
Then select "Manage Plugins" → "medicare-copywriter"

## Next Steps

- Read full [README.md](README.md) for detailed guidelines
- Explore each command's full documentation
- Create a style guide from your generated copy
- Build a copy library for your marketing pages

## Example Workflow

Here's a real-world workflow for creating the Romanian Practice page:

```bash
# 1. Generate English hero
/generate-hero
[Persona: Practice, Features: Patient management, scheduling, analytics]

# 2. Refine the output
/refine-medical-tone
[Paste generated headline, request: "Make it more ROI-focused"]

# 3. Generate features
/generate-features
[Persona: Practice, Number: 6, Features: All practice management tools]

# 4. Generate CTA
/generate-cta
[Placement: Mid-page, Persona: Practice, Offer: Free trial]

# 5. Translate everything
/translate-copy
[Translate hero, features, and CTA to Romanian]

# 6. Create final JSON
Copy all outputs into /locales/ro.json
```

**Time**: ~10 minutes for complete page copy in two languages!

## Support

Need help? Commands provide detailed instructions when you run them. Just type the command and follow the prompts!

---

Happy copywriting! ⚕️
