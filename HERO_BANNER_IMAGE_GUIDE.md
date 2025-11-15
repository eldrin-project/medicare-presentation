# Hero Banner Image Guide

This guide provides technical specifications and visual guidelines for selecting hero banner images for each persona page in the MediCare presentation website.

---

## Current Image Technical Specifications

**File:** `public/hero-banner-image.jpg`
**Usage:** Patient page (currently used on all pages)

- **Dimensions:** 1920 × 800 pixels
- **Aspect Ratio:** 2.4:1 (ultra-wide banner)
- **Resolution:** 72 DPI (web standard)
- **Format:** JPEG
- **File Size:** ~120KB (optimized for web)
- **Color Space:** sRGB (RGB)

**Visual Description:**
- Doctor-patient consultation scene
- Mature male doctor with stethoscope and tablet
- Female patient in professional attire (yellow blazer)
- Modern office setting with teal/turquoise background
- Bright, welcoming, collaborative atmosphere
- Natural lighting from window

---

## Technical Requirements (All Persona Pages)

### Standard Resolution (Minimum)
- **Dimensions:** 1920 × 800 pixels
- **Aspect Ratio:** 2.4:1 (ultra-wide banner)
- **Resolution:** 72 DPI
- **Format:** JPEG or WebP
- **File Size:** 100-200KB (optimized)
- **Color Space:** sRGB

### Retina/High-DPI (Recommended)
- **Dimensions:** 2560 × 1067 pixels (or 3840 × 1600 pixels)
- **Aspect Ratio:** 2.4:1 (maintain consistency)
- **File Size:** Keep under 300KB with compression
- **Format:** WebP (better compression) or JPEG

### Image Optimization
```bash
# Resize to exact dimensions using sips (macOS)
sips -z 800 1920 input.jpg --out output.jpg

# For retina displays
sips -z 1067 2560 input.jpg --out output@2x.jpg

# Convert to WebP (if installed)
cwebp -q 80 input.jpg -o output.webp
```

---

## Brand Color Palette (Medical Futurism)

Images should complement or feature these colors:

- **Deep Teal:** #0A4D4E (primary brand color)
- **Medium Teal:** #0D6A6C
- **Electric Cyan:** #00D9FF (accent, tech elements)
- **Cyan Light:** #5EEEFF
- **Coral:** #FF6B6B (warm accent)
- **Coral Light:** #FF8A8A
- **Navy:** #0F1419 (dark backgrounds)
- **Light:** #FAFAF9 (backgrounds)
- **Gray:** #8B95A5 (text)

---

## Small Private Practice Page

### File Naming
- **Standard:** `public/practice-hero-banner.jpg`
- **Retina:** `public/practice-hero-banner@2x.jpg`

### Visual Concept

**Primary Subject Matter:**

1. **Doctor-Centric Scenes**
   - Solo practitioner in their office/clinic
   - Doctor reviewing patient charts/records on computer
   - Physician in consultation room preparing for appointments
   - Doctor with stethoscope in professional attire

2. **Practice Management Focus**
   - Doctor using practice management software
   - Small team meeting (doctor + 1-2 staff members)
   - Organized, efficient workspace
   - Modern medical office interior

3. **Technology & Efficiency**
   - Doctor using tablet/laptop for patient records
   - Digital scheduling systems visible
   - Clean, organized desk with modern equipment
   - Telemedicine setup visible

### Color Palette Preferences
- **Primary:** Deep teal (#0A4D4E) - clinic/office walls or accents
- **Secondary:** Electric cyan (#00D9FF) - tech screens, digital displays
- **Accent:** Warm tones (amber/coral #FF6B6B) - clothing, human touch
- **Background:** Clean whites, light grays, abundant natural light

### Mood & Atmosphere
- **Professional** but approachable (not sterile/cold)
- **Modern** and tech-forward
- **Organized** and efficient
- **Confident** practitioner demeanor
- **Warm lighting** (natural light from windows preferred)
- **Aspirational** (shows success, growth potential)
- **Focused** on practice efficiency

### Composition Guidelines
- **Subject placement:** Left or center (allows text overlay on right side)
- **Depth of field:** Slight background blur (focus on subject)
- **Orientation:** Horizontal ultra-wide
- **Negative space:** Plenty of room for text overlays
- **Action:** Dynamic pose (working, not just standing)
- **Perspective:** Eye-level or slightly lower (empowering angle)
- **Demographics:** Age 35-55, diverse, confident professional

### What to Avoid
- ❌ Hospital/large clinic settings (too enterprise-scale)
- ❌ Surgery/invasive medical procedures
- ❌ Generic stock photo poses (arms crossed, fake smile)
- ❌ Overly clinical/sterile white environments
- ❌ Multiple doctors (emphasize "small" practice)
- ❌ Patients as primary subject (doctor-focused)
- ❌ Old/outdated technology or equipment
- ❌ Cluttered, disorganized spaces

### Recommended Search Keywords

**Stock Photo Search Terms:**
```
"solo physician modern office"
"private practice doctor technology"
"family doctor laptop patient records"
"medical professional tablet consultation"
"physician practice management software"
"modern medical office teal background"
"doctor reviewing digital health records"
"healthcare professional organized workspace"
"small clinic owner doctor"
"primary care physician office technology"
"doctor confident professional portrait"
"medical practitioner digital transformation"
```

**Advanced Search Filters:**
- **Orientation:** Landscape/Panoramic
- **Aspect Ratio:** Wide (approximately 2:1 or wider)
- **Minimum Width:** 1920px
- **License:** Commercial use with modification allowed
- **People:** 1-2 people maximum
- **Setting:** Medical office, clinic, exam room

### Example Visual Concepts

**Concept 1: Technology-Focused Practice Owner**
- Mid-40s physician at modern desk with dual monitors
- Patient management dashboard visible on screen
- Warm, confident smile, business-casual under white coat
- Teal accent wall behind, natural window light from side
- Organized workspace with small plant, clean aesthetic
- Stethoscope draped naturally, not posed

**Concept 2: Patient-Ready Practitioner**
- Solo practitioner in exam room reviewing tablet
- Patient schedule or EHR visible on device
- White coat, professional but approachable demeanor
- Modern medical equipment subtly in background
- Prepared, confident, ready for patient care
- Soft lighting, warm color temperature

**Concept 3: Efficient Team Leader**
- Doctor with 1-2 staff members (receptionist/nurse)
- Small team huddle discussing daily schedule
- Shared screen or tablet visible
- Modern office setting, collaborative atmosphere
- Doctor clearly leading but approachable
- Emphasis on efficiency and teamwork

---

## Patient Page (Current)

### File Naming
- **Current:** `public/hero-banner-image.jpg`
- **Standard:** `public/patient-hero-banner.jpg`
- **Retina:** `public/patient-hero-banner@2x.jpg`

### Visual Concept
- **Focus:** Patient-doctor relationship, trust, accessibility
- **Subject:** Patient as primary or equal subject with doctor
- **Mood:** Warm, reassuring, collaborative, accessible
- **Setting:** Consultation room, welcoming environment
- **Technology:** Tablet/digital tools showing accessibility
- **Demographics:** Diverse patients, all age ranges
- **Atmosphere:** "Healthcare made easy and personal"

### Current Image Meets These Criteria ✅
The existing `hero-banner-image.jpg` is already well-suited for the patient persona page.

---

## Clinic/Hospital Page

### File Naming
- **Standard:** `public/clinic-hero-banner.jpg`
- **Retina:** `public/clinic-hero-banner@2x.jpg`

### Visual Concept

**Primary Subject Matter:**
1. **Enterprise Healthcare Setting**
   - Multi-specialty clinic or hospital interior
   - Modern medical facility with multiple departments
   - Healthcare team (3-5 professionals)
   - Large-scale operations visible

2. **Team Collaboration**
   - Diverse healthcare team (doctors, nurses, administrators)
   - Interdisciplinary collaboration
   - Team huddle or rounds
   - Professional meeting or case discussion

3. **Advanced Technology & Infrastructure**
   - State-of-the-art medical equipment
   - Enterprise health IT systems
   - Large-scale data displays/dashboards
   - Command center or central nursing station

### Color Palette Preferences
- **Primary:** Deep teal/navy (#0A4D4E, #0F1419) - professional, enterprise
- **Secondary:** Electric cyan (#00D9FF) - advanced technology
- **Accent:** Coral (#FF6B6B) sparingly - human element
- **Background:** Modern architecture, glass, metal, clean lines

### Mood & Atmosphere
- **Professional** and enterprise-grade
- **Scalable** and comprehensive
- **Advanced** technology and systems
- **Team-oriented** collaboration
- **Organized** large-scale operations
- **Trustworthy** institutional quality
- **Forward-thinking** innovation

### Composition Guidelines
- **Subject:** Multiple people (3-5) or large facility
- **Perspective:** Wide angle showing scale
- **Lighting:** Professional, modern institutional
- **Architecture:** Contemporary medical facility design
- **Technology:** Visible advanced systems
- **Team diversity:** Multiple roles, backgrounds

### What to Avoid
- ❌ Small office settings (too intimate for enterprise)
- ❌ Single practitioner (doesn't show scale)
- ❌ Dated facilities or equipment
- ❌ Emergency/trauma scenes (too intense)
- ❌ Overly corporate/cold atmosphere
- ❌ Generic office building (needs medical context)

### Recommended Search Keywords

**Stock Photo Search Terms:**
```
"hospital team collaboration modern"
"medical facility enterprise technology"
"healthcare team diverse professionals"
"modern clinic multi-specialty"
"hospital administration team meeting"
"medical facility architecture modern"
"healthcare team rounds digital"
"enterprise health IT system"
"hospital command center"
"medical team collaborative workspace"
"multi-specialty clinic interior"
"healthcare institution modern facility"
```

### Example Visual Concepts

**Concept 1: Collaborative Healthcare Team**
- 4-5 diverse healthcare professionals
- Modern hospital corridor or nursing station
- Team reviewing patient data on large display
- Mix of doctors, nurses, administrators
- Professional but warm interaction
- Advanced technology visible in background

**Concept 2: Modern Medical Facility**
- Wide shot of contemporary clinic interior
- Glass, modern architecture, clean lines
- Healthcare professionals in motion (walking, working)
- Multiple departments or areas visible
- Advanced medical equipment subtly present
- Professional yet welcoming atmosphere

**Concept 3: Enterprise Technology Focus**
- Healthcare team at central monitoring station
- Large digital displays with patient data/analytics
- Modern, tech-forward environment
- Professional collaboration around data
- Emphasis on scale and system integration
- Sleek, futuristic medical facility aesthetic

---

## Stock Photo Resources

### Free High-Quality Sources
- **Unsplash** (https://unsplash.com) - Free, high-resolution, commercial use
- **Pexels** (https://pexels.com) - Free stock photos and videos
- **Pixabay** (https://pixabay.com) - Free images and videos

### Premium Stock Photo Sites
- **Adobe Stock** (https://stock.adobe.com)
- **Shutterstock** (https://shutterstock.com)
- **iStock** (https://istockphoto.com)
- **Getty Images** (https://gettyimages.com)

### Healthcare-Specific Resources
- **Noun Project** - Medical icons and illustrations
- **MedicalStock** - Healthcare-specific photography
- **Science Photo Library** - Scientific and medical imagery

### Search Filters to Use
1. **Orientation:** Landscape/Panoramic
2. **Minimum Resolution:** 1920px width
3. **License Type:** Commercial use with modification
4. **Color:** Filter by teal/blue tones when available
5. **People:** Specify number (1-2 for practice, 3-5 for clinic)
6. **Setting:** Medical office, clinic, hospital

---

## Implementation Guide

### File Structure
```
medicare-presentation/
└── public/
    ├── hero-banner-image.jpg          # Current (patient page)
    ├── patient-hero-banner.jpg        # Patient page (rename from above)
    ├── patient-hero-banner@2x.jpg     # Patient retina
    ├── practice-hero-banner.jpg       # Practice page
    ├── practice-hero-banner@2x.jpg    # Practice retina
    ├── clinic-hero-banner.jpg         # Clinic page
    └── clinic-hero-banner@2x.jpg      # Clinic retina
```

### CSS Implementation

Currently all pages use the same image via CSS:
```css
.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

**Option 1: Page-Specific CSS Classes**
```css
.patient-page .hero-image {
  background-image: url('/patient-hero-banner.jpg');
}

.practice-page .hero-image {
  background-image: url('/practice-hero-banner.jpg');
}

.clinic-page .hero-image {
  background-image: url('/clinic-hero-banner.jpg');
}

/* Retina support */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .practice-page .hero-image {
    background-image: url('/practice-hero-banner@2x.jpg');
  }
}
```

**Option 2: Update Page Components (Recommended)**

Update each page component to use different images:

**PatientPage.tsx:**
```tsx
<img
  src="/patient-hero-banner.jpg"
  srcSet="/patient-hero-banner@2x.jpg 2x"
  alt="Patient consulting with healthcare provider"
  className="hero-image"
/>
```

**PracticePage.tsx:**
```tsx
<img
  src="/practice-hero-banner.jpg"
  srcSet="/practice-hero-banner@2x.jpg 2x"
  alt="Medical professional using practice management technology"
  className="hero-image"
/>
```

**ClinicPage.tsx:**
```tsx
<img
  src="/clinic-hero-banner.jpg"
  srcSet="/clinic-hero-banner@2x.jpg 2x"
  alt="Healthcare team collaborating in modern medical facility"
  className="hero-image"
/>
```

### Image Optimization Workflow

1. **Download** high-resolution source image (minimum 1920px wide)

2. **Crop** to 2.4:1 aspect ratio:
   ```bash
   # Using ImageMagick (if installed)
   convert input.jpg -gravity center -crop 2.4:1 +repage cropped.jpg

   # Using sips (macOS)
   # Manual crop may be needed in preview/photoshop
   ```

3. **Resize** to standard resolution:
   ```bash
   sips -z 800 1920 cropped.jpg --out standard.jpg
   ```

4. **Create retina version**:
   ```bash
   sips -z 1067 2560 cropped.jpg --out retina.jpg
   ```

5. **Optimize file size**:
   ```bash
   # Reduce quality while maintaining visual quality
   sips -s format jpeg -s formatOptions 80 standard.jpg
   ```

6. **Verify dimensions**:
   ```bash
   sips -g pixelWidth -g pixelHeight standard.jpg
   ```

7. **Check file size** (should be under 200KB for standard, 300KB for retina):
   ```bash
   ls -lh standard.jpg
   ```

---

## Checklist for New Hero Banner Images

### Before Download
- [ ] Image matches persona concept (patient/practice/clinic)
- [ ] Minimum 1920px width
- [ ] Landscape/panoramic orientation
- [ ] Commercial use license verified
- [ ] Color palette complements Medical Futurism theme
- [ ] Composition allows text overlay space
- [ ] Professional quality (not obviously stock photo)
- [ ] Diverse and inclusive representation

### After Download
- [ ] Image cropped to 2.4:1 aspect ratio
- [ ] Standard version created (1920 × 800px)
- [ ] Retina version created (2560 × 1067px)
- [ ] File size optimized (<200KB standard, <300KB retina)
- [ ] Files named correctly (persona-hero-banner.jpg)
- [ ] Saved to `/public/` directory
- [ ] Alt text written (descriptive, accessible)
- [ ] Component updated to reference new image
- [ ] Tested on both standard and retina displays
- [ ] Verified across all breakpoints (mobile, tablet, desktop)

---

## Accessibility Considerations

### Alt Text Guidelines
Write descriptive, meaningful alt text for each hero image:

**Good Examples:**
- ✅ "Healthcare provider reviewing digital patient records on tablet in modern medical office"
- ✅ "Diverse medical team collaborating around patient care dashboard in hospital setting"
- ✅ "Solo physician using practice management software in organized clinic workspace"

**Poor Examples:**
- ❌ "Doctor" (too vague)
- ❌ "Hero banner image" (not descriptive)
- ❌ "Healthcare professional in office" (too generic)

### Image Performance
- Use WebP format when possible (better compression, browser support excellent)
- Implement lazy loading for below-fold images
- Serve appropriate image size based on viewport
- Use srcset for responsive images and retina support

---

## Notes

- All hero images should maintain the same 2.4:1 aspect ratio for visual consistency
- Color palette should align with Medical Futurism brand theme
- Each persona should have distinct imagery that resonates with their specific needs
- Images must be properly licensed for commercial use
- Optimize images before deployment to maintain fast page load times
- Consider seasonal or periodic updates to keep content fresh
- Test images across different devices and screen sizes

---

**Document Version:** 1.0
**Last Updated:** 2025-11-15
**Maintained By:** Development Team
