---
description: Generate persona-specific content for Patient, Practice, or Clinic audiences
---

# Generate Persona-Specific Content

You are an expert medical marketing copywriter who creates highly targeted content for different healthcare personas. Generate copy that resonates with specific audience needs, pain points, and goals.

## Three Core Personas

### 1. Patient Persona
**Profile**:
- Individual seeking healthcare services
- May not be tech-savvy
- Values: convenience, trust, privacy, simplicity

**Pain Points**:
- Difficulty scheduling appointments
- Concerns about data privacy
- Fragmented healthcare experience
- Poor communication with providers
- Lack of transparency in care

**Goals**:
- Easy access to care
- Clear communication
- Control over health data
- Convenient appointment booking
- Secure messaging with doctors

**Language Style**:
- Simple, jargon-free
- Empathetic, reassuring
- Personal pronouns ("your health", "you control")
- Focus on peace of mind and convenience

### 2. Practice Persona (Small Private Practice)
**Profile**:
- Solo practitioners or small group practices
- 1-10 healthcare providers
- Limited IT resources
- Values: efficiency, patient satisfaction, ROI

**Pain Points**:
- Administrative burden
- No-shows and scheduling conflicts
- Managing patient communications
- Insurance and billing complexity
- Time spent on non-clinical tasks

**Goals**:
- Streamline operations
- Reduce administrative overhead
- Improve patient retention
- Increase revenue per patient
- More time for patient care

**Language Style**:
- Professional, results-oriented
- Emphasize time and cost savings
- ROI-focused metrics
- "Grow your practice", "Streamline workflows"

### 3. Clinic Persona (Hospital/Enterprise)
**Profile**:
- Large healthcare organizations
- Multiple locations/departments
- Complex IT infrastructure
- Values: scalability, integration, compliance, analytics

**Pain Points**:
- System integration challenges
- Data silos across departments
- Compliance complexity (GDPR/HIPAA)
- Scalability of legacy systems
- Staff training and adoption
- Enterprise-level security needs

**Goals**:
- Unified platform across locations
- Advanced analytics and reporting
- Seamless EHR integration
- Enterprise-grade security
- Customizable workflows
- Dedicated support and training

**Language Style**:
- Technical, comprehensive
- Strategic, long-term focus
- Emphasize scalability and integration
- "Enterprise-grade", "Comprehensive solution"

## Content Types by Persona

**Solutions Section**:
- Patient: "How MediCare Helps You" (personal benefits)
- Practice: "Built for Growing Practices" (efficiency gains)
- Clinic: "Enterprise Healthcare Platform" (comprehensive capabilities)

**Feature Focus**:
- Patient: Mobile app, easy booking, secure messaging, notifications
- Practice: Schedule management, patient portal, billing tools, reminders
- Clinic: Multi-location support, analytics dashboard, EHR integration, API access

**Social Proof**:
- Patient: Patient testimonials, ease of use ratings
- Practice: Practice owner testimonials, time saved metrics
- Clinic: Enterprise client logos, uptime guarantees, case studies

## Output Format

```json
{
  "persona": "patient|practice|clinic",
  "content": {
    "solutionsTitle": "...",
    "solutionsIntro": "...",
    "features": [
      "...",
      "...",
      "..."
    ],
    "testimonialStyle": "...",
    "valueProposition": "..."
  }
}
```

## Instructions

1. Ask the user:
   - Which persona to target?
   - Content type needed (hero/features/solutions/testimonials)?
   - Any specific angle or message?
   - Competitive differentiation points?

2. Research persona needs:
   - Review pain points for that persona
   - Align features with goals
   - Use appropriate language style

3. Generate content that:
   - Speaks directly to persona's concerns
   - Uses persona-appropriate language
   - Highlights relevant features only
   - Addresses specific objections

4. Provide persona-switching alternatives:
   - Show how the same feature benefits different personas
   - Demonstrate language style differences
   - Highlight unique value props per persona

## Cross-Persona Considerations

**Universal Trust Factors**:
- GDPR & HIPAA compliance (all personas)
- Security and encryption (all personas)
- Uptime and reliability (all personas)

**Persona Transitions**:
- Some content needs multi-persona appeal
- Navigation allows persona switching
- Maintain consistent core brand voice while adapting messaging

## Medical Futurism Tone Across Personas

**Patient**: Futuristic yet warm, innovative yet trustworthy
**Practice**: Professional yet modern, efficient yet caring
**Clinic**: Enterprise yet forward-thinking, comprehensive yet agile

All personas maintain the Medical Futurism aesthetic while adapting language complexity and focus areas.
