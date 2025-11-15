# MediCare Copywriter Plugin

AI-powered medical marketing copywriter for generating persona-specific, multilingual content with the **Medical Futurism** aesthetic.

## Overview

This Claude Code plugin provides specialized copywriting commands for healthcare marketing, supporting three distinct personas (Patient, Practice, Clinic) and three languages (English, Romanian, Arabic).

## Features

- **Persona-Specific Content**: Tailored copy for Patient, Practice, and Clinic audiences
- **Medical Futurism Tone**: Bold, innovative healthcare marketing that avoids clichés
- **Multilingual Support**: English, Romanian, and Arabic translations
- **Compliance-Aware**: GDPR and HIPAA compliant messaging
- **Conversion-Optimized**: Copy structured for maximum engagement and conversion

## Installation

### Local Development

1. Create a marketplace configuration at `.claude-plugin/marketplace.json`:

```json
{
  "name": "medicare-dev-marketplace",
  "owner": { "name": "MediCare Team" },
  "plugins": [
    {
      "name": "medicare-copywriter",
      "source": "./medicare-copywriter",
      "description": "Medical marketing copywriter plugin"
    }
  ]
}
```

2. Install the marketplace:
```bash
/plugin marketplace add ./.claude-plugin/marketplace.json
```

3. Install the plugin:
```bash
/plugin install medicare-copywriter@medicare-dev-marketplace
```

4. Verify installation:
```bash
/help
```

You should see all the copywriter commands listed.

## Available Commands

### `/generate-hero`
Generate compelling hero section copy for medical marketing pages.

**What it creates**:
- Badge text (short, punchy phrase)
- Main headline (regular + gradient highlight)
- Subtitle (1-2 sentences)
- Primary and secondary CTA buttons
- Social proof statistics

**Example usage**:
```
/generate-hero
```

Then specify:
- Target persona (Patient/Practice/Clinic)
- Key features to highlight
- Any specific messaging requirements

### `/generate-features`
Generate feature descriptions for medical product pages.

**What it creates**:
- Feature titles (2-4 words, action-oriented)
- Descriptions (1-2 sentences with benefits)
- Technical tags (2-3 per feature)
- Icon suggestions (Lucide React icons)

**Example usage**:
```
/generate-features
```

Specify:
- Persona type
- Number of features needed (typically 4-8)
- Specific features to include

### `/generate-cta`
Generate call-to-action copy for various page sections.

**What it creates**:
- Section title (benefit-driven headline)
- Subtitle (addresses concerns/objections)
- Primary CTA button text
- Secondary CTA button text
- Trust note (disclaimer/reassurance)

**Example usage**:
```
/generate-cta
```

Specify:
- CTA placement (hero/mid-page/footer)
- Target persona
- Specific offer type

### `/generate-persona`
Generate persona-specific content tailored to Patient, Practice, or Clinic audiences.

**What it creates**:
- Solutions section copy
- Feature focus areas
- Social proof examples
- Value propositions

**Example usage**:
```
/generate-persona
```

Specify:
- Target persona
- Content type needed
- Competitive differentiation points

### `/translate-copy`
Translate marketing copy to Romanian or Arabic while preserving brand voice.

**What it provides**:
- Native-quality translations
- Cultural adaptations
- RTL considerations for Arabic
- Length-optimized versions for UI constraints

**Example usage**:
```
/translate-copy
```

Provide:
- Source text
- Target language (ro/ar)
- Content type
- UI constraints (if any)

### `/refine-medical-tone`
Refine existing copy to match Medical Futurism tone and improve conversion.

**What it improves**:
- Eliminates healthcare clichés
- Adds power words and specificity
- Converts passive to active voice
- Increases conversion potential

**Example usage**:
```
/refine-medical-tone
```

Provide:
- Original copy
- Concerns (too generic, not converting, etc.)
- Target persona

## Medical Futurism Brand Guidelines

### Tone Principles
- **Innovative without being cold**: Cutting-edge tech + human compassion
- **Bold without being aggressive**: Confident, not pushy
- **Visual without being generic**: Specific imagery, avoid clichés
- **Technical without being complex**: Smart features explained simply

### Color Palette (for context)
- Deep Teals: `#0A4D4E`, `#0D6A6C` (trust, sophistication)
- Electric Cyan: `#00D9FF`, `#5EEEFF` (innovation, energy)
- Coral Accents: `#FF6B6B` (warmth, humanity)

### Power Words
Transform, revolutionary, seamless, intelligent, secure, instant, effortless, comprehensive

### Avoid Healthcare Clichés
❌ "Your health is our priority"
❌ "Caring for you and your family"
❌ "Quality care you can trust"

### Embrace Modern Alternatives
✅ "Healthcare that adapts to your life"
✅ "Intelligent care coordination"
✅ "Your health data, your control"

## Three Core Personas

### 1. Patient Persona
**Focus**: Convenience, trust, privacy, simplicity
**Language**: Simple, empathetic, personal
**Key Benefits**: Easy access, control, secure messaging

### 2. Practice Persona
**Focus**: Efficiency, ROI, patient satisfaction
**Language**: Professional, results-oriented
**Key Benefits**: Time savings, streamlined workflows, growth

### 3. Clinic Persona
**Focus**: Scalability, integration, compliance
**Language**: Technical, strategic
**Key Benefits**: Enterprise features, analytics, customization

## Supported Languages

### English (en)
Primary language, international standards

### Romanian (ro)
- GDPR compliance emphasis
- Formal yet approachable
- European healthcare context

### Arabic (ar)
- RTL script support
- Middle East market
- Cultural sensitivity in health messaging

## Compliance Considerations

All generated copy adheres to:
- **GDPR**: European data protection standards
- **HIPAA**: US healthcare privacy standards
- No false health outcome promises
- Accurate security claims
- Honest about limitations

## Best Practices

### For Hero Sections
1. Start with persona selection
2. Review 2-3 variations
3. A/B test different headlines
4. Include trust signals prominently

### For Features
1. Focus on benefits over capabilities
2. Use specific, quantifiable claims
3. Match features to persona priorities
4. Include technical tags for credibility

### For CTAs
1. Use action-oriented button text
2. Remove friction ("no credit card required")
3. Offer multiple conversion paths
4. Add trust signals

### For Translations
1. Preserve brand voice
2. Adapt cultural references
3. Verify medical terminology
4. Test UI constraints (especially Romanian length)

## Development Workflow

1. **Generate base copy** using persona-specific commands
2. **Refine tone** using `/refine-medical-tone`
3. **Translate** to Romanian and Arabic using `/translate-copy`
4. **Test** copy in actual UI
5. **Iterate** based on conversion data

## Examples

### Hero Section Example

```json
{
  "badge": "GDPR & HIPAA Compliant",
  "headline": {
    "regular": "Transform Patient Care with",
    "gradient": "Intelligent Healthcare"
  },
  "subtitle": "Seamless scheduling, secure messaging, and comprehensive medical records—all in one platform designed for modern healthcare.",
  "cta": {
    "primary": "Start Free Trial",
    "secondary": "Watch Demo"
  },
  "stats": [
    { "number": "50K+", "label": "Active Users" },
    { "number": "99.9%", "label": "Uptime" },
    { "number": "24/7", "label": "Support" }
  ]
}
```

### Feature Example

```json
{
  "title": "Smart Scheduling",
  "description": "Book appointments in under 60 seconds with real-time availability across all your devices. Automated reminders reduce no-shows by up to 40%.",
  "tags": ["Real-time sync", "SMS/Email alerts"],
  "icon": "Calendar"
}
```

## Plugin Structure

```
medicare-copywriter/
├── .claude-plugin/
│   └── plugin.json              # Plugin metadata
├── commands/
│   ├── generate-hero.md         # Hero section generator
│   ├── generate-features.md     # Feature descriptions
│   ├── generate-cta.md          # Call-to-action copy
│   ├── generate-persona.md      # Persona-specific content
│   ├── translate-copy.md        # Translation service
│   └── refine-medical-tone.md   # Copy refinement
└── README.md                    # This file
```

## Contributing

To add new commands or improve existing ones:

1. Create a new markdown file in `commands/`
2. Add YAML frontmatter with description
3. Write detailed instructions for Claude
4. Test with sample inputs
5. Update this README

## Version History

### 1.0.0 (Current)
- Initial release
- 6 core copywriting commands
- Support for 3 personas
- Support for 3 languages
- Medical Futurism tone guidelines

## Support

For issues or questions about this plugin:
1. Check command descriptions with `/help`
2. Review examples in this README
3. Test with simple inputs first
4. Verify persona and language settings

## License

Proprietary - MediCare Team

---

**Made with Medical Futurism** ⚕️
