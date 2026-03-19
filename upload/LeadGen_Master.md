# 🚀 MASTER PROMPT: Lead Generation Site Builder
## Automated EMD + Hyperlocal SEO Lead Gen Website Generator

---

> **HOW TO USE THIS PROMPT:**
> Replace `[YOUR_KEYWORD]` with your main focus keyword (e.g. `road traffic accident claims`)
> Replace `[YOUR_DOMAIN]` with your full domain (e.g. `road-traffic-accident-claims.co.uk`)
> Replace `[YOUR_SERVICE_TYPE]` with what the business does (e.g. `No Win No Fee Solicitors`)
> Replace `[YOUR_PHONE]` with the contact number
> Replace `[YOUR_EMAIL]` with the contact email
> Then paste the entire prompt into any capable LLM (GPT-4o, Claude Sonnet/Opus, Gemini Ultra etc.)

---

## THE PROMPT (copy everything below this line)

---

You are an expert SEO developer and full-stack web developer. Your task is to build a complete, production-ready lead generation website in a single HTML5 file (with all CSS and JavaScript embedded inline). This site must be fully SEO-optimised, conversion-focused, and structured for programmatic hyperlocal content generation.

## PROJECT INPUTS

- **Primary Focus Keyword:** [YOUR_KEYWORD]
- **Domain:** [YOUR_DOMAIN]
- **Service Type / Business Name:** [YOUR_SERVICE_TYPE]
- **Phone Number:** [YOUR_PHONE]
- **Email Address:** [YOUR_EMAIL]
- **Target Country/Region:** United Kingdom (adapt if different)

---

## SECTION 1 — WEBSITE ARCHITECTURE

Build the following page structure, all contained within a single HTML5 file using JavaScript-based client-side routing (hash-based or History API). No server required — this must work as a standalone file.

### Pages to Generate:

1. **Homepage** (`/` or `#home`)
   - Targets the national keyword `[YOUR_KEYWORD]`
   - Full hero section, FAQ content, trust signals, CTAs, areas covered hub

2. **County Pages** (`#near-me/[county-slug]`) — Generate ALL of the following UK counties:
   Greater London, Greater Manchester, West Yorkshire, West Midlands, Merseyside, South Yorkshire, Tyne and Wear, Kent, Essex, Hampshire, Lancashire, Surrey, Hertfordshire, Nottinghamshire, Derbyshire, Leicestershire, Staffordshire, Somerset, Norfolk, Suffolk, Northamptonshire, Cambridgeshire, Oxfordshire, Berkshire, Bristol, Devon, Cornwall, Cheshire, Durham, Northumberland, Cumbria, Lincolnshire, Worcestershire, Warwickshire, Buckinghamshire, East Sussex, West Sussex, Gloucestershire, Shropshire, Herefordshire, Isle of Wight

3. **Town/City Pages** (`#near-me/[county-slug]-[town-slug]`) — For each county above, generate at least 5 town-level pages using real, well-known towns/cities within that county.

4. **Static Pages:**
   - About Us (`#about`)
   - Contact Us (`#contact`) — include working form UI
   - Privacy Policy (`#privacy`)
   - Cookie Policy (`#cookies`)

---

## SECTION 2 — DOMAIN & EMD STRATEGY

- The domain `[YOUR_DOMAIN]` is an Exact Match Domain for `[YOUR_KEYWORD]`
- Reflect this in all title tags, meta descriptions, and H1s
- Use `.co.uk` geographic signals in all structured data
- The brand name should be derived from the domain (e.g. `road-traffic-accident-claims.co.uk` → brand = "Road Traffic Accident Claims")

---

## SECTION 3 — URL & SLUG STRUCTURE

Implement the following three-tier URL hierarchy using JavaScript routing:

| Level     | Pattern                                  | Example                                      |
|-----------|------------------------------------------|----------------------------------------------|
| Homepage  | `/`                                      | `[YOUR_DOMAIN]/`                             |
| County    | `#near-me/[county-slug]/`                | `#near-me/greater-london/`                   |
| Town      | `#near-me/[county-slug]-[town-slug]/`    | `#near-me/greater-london-woolwich/`          |

**Slug rules:**
- All lowercase, hyphens only (no underscores or spaces)
- Include `near-me` prefix for all location pages
- Keep slugs under 75 characters
- Town slugs must be prefixed with their parent county slug

---

## SECTION 4 — FULL CONTENT GENERATION

### 4.1 Homepage Content

Generate complete, unique, human-quality content for the homepage. Include ALL of the following H2 sections (inject `[YOUR_KEYWORD]` naturally):

1. Who Can Make A [YOUR_KEYWORD]?
2. How Much Compensation Can I Claim For [YOUR_KEYWORD]?
3. What Are The Most Common Causes Of [YOUR_KEYWORD]?
4. How Do I Start A [YOUR_KEYWORD] Claim?
5. How Long Do I Have To Make A [YOUR_KEYWORD] Claim?
6. What Evidence Is Required For A [YOUR_KEYWORD] Claim?
7. How Long Does A [YOUR_KEYWORD] Claim Take To Settle?
8. Claims Involving Uninsured Or Unknown Parties
9. What Damages Can Be Claimed?
10. No Win No Fee Explained
11. Why Choose Us For Your [YOUR_KEYWORD] Claim?
12. Areas We Cover

Each H2 section must have at least 3 substantial paragraphs of unique content. Write in a professional but accessible UK English tone.

### 4.2 Location Page Content Template

For EVERY county and town page, generate fully unique content using this dynamic template. The `[LOCATION]` variable must be injected into every H2 and throughout body content:

**H2 Headings for Location Pages:**
1. Who Can Make A [YOUR_KEYWORD] Claim in [LOCATION]?
2. How Much Compensation Can I Claim For [YOUR_KEYWORD] in [LOCATION]?
3. What Are The Most Common Causes Of [YOUR_KEYWORD] in [LOCATION]?
4. How Do I Start A [YOUR_KEYWORD] Claim in [LOCATION]?
5. How Long Do I Have To Make A [YOUR_KEYWORD] Claim in [LOCATION]?
6. Evidence Required For A [YOUR_KEYWORD] Claim in [LOCATION]
7. How Long Does A [YOUR_KEYWORD] Claim Take To Settle in [LOCATION]?
8. Local Support For [YOUR_KEYWORD] Claims in [LOCATION]
9. Why Choose Our [LOCATION] [YOUR_KEYWORD] Specialists?
10. Other Areas We Cover Near [LOCATION]

**Content variation rules:**
- Vary sentence structure and paragraph openers between pages
- Include location-specific references (landmarks, local courts, hospitals where relevant)
- Each town page should reference the parent county
- Include approximate postcode district in town page titles (research or infer common postcode)

### 4.3 Keyword Density Targets

| Keyword                         | Target Occurrences Per Page |
|---------------------------------|-----------------------------|
| `[YOUR_KEYWORD]`                | 40–55                       |
| `claim` / `claims`              | 90–110                      |
| `compensation`                  | 15–20                       |
| Location name (location pages)  | 20–30                       |

Achieve this density naturally through FAQ-style content, not forced repetition.

---

## SECTION 5 — ON-PAGE SEO IMPLEMENTATION

For EVERY page, implement the following in the `<head>`:

```html
<title>[Page-Specific Title] | [YOUR_SERVICE_TYPE]</title>
<meta name="description" content="[150-160 char unique meta description with keyword + location + CTA]">
<meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">
<link rel="canonical" href="https://[YOUR_DOMAIN]/[page-url]">
<meta property="og:title" content="[Page Title]">
<meta property="og:description" content="[Meta Description]">
<meta property="og:type" content="website">
<meta property="og:url" content="https://[YOUR_DOMAIN]/[page-url]">
<meta name="twitter:card" content="summary_large_image">
```

**Title Tag Formulas:**
- Homepage: `[YOUR_KEYWORD] - [YOUR_SERVICE_TYPE]`
- County: `[YOUR_KEYWORD] in [County Name] - Claim Compensation Today`
- Town: `[YOUR_KEYWORD] in [Town Name] - Claim Compensation After an Incident [Postcode]`

---

## SECTION 6 — SCHEMA MARKUP (JSON-LD)

Inject all schema as `<script type="application/ld+json">` blocks. Generate the following for each page type:

### 6.1 Homepage Schema (inject all of these):

**Organization Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[YOUR_SERVICE_TYPE]",
  "url": "https://[YOUR_DOMAIN]",
  "telephone": "[YOUR_PHONE]",
  "email": "[YOUR_EMAIL]",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB"
  },
  "sameAs": []
}
```

**LegalService Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "[YOUR_SERVICE_TYPE]",
  "description": "[YOUR_KEYWORD] specialists offering no win no fee compensation claims across the UK",
  "url": "https://[YOUR_DOMAIN]",
  "telephone": "[YOUR_PHONE]",
  "priceRange": "No Win No Fee",
  "areaServed": {
    "@type": "Country",
    "name": "United Kingdom"
  }
}
```

**WebSite Schema with Sitelinks Searchbox:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://[YOUR_DOMAIN]/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://[YOUR_DOMAIN]/#search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**FAQ Schema (Homepage):** Generate full FAQ schema for all H2 Q&A blocks on the homepage.

**BreadcrumbList Schema (Homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[YOUR_DOMAIN]/"}]
}
```

### 6.2 County Page Schema:

**LocalBusiness + LegalService Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": ["LegalService", "LocalBusiness"],
  "name": "[YOUR_SERVICE_TYPE] - [County Name]",
  "description": "[YOUR_KEYWORD] in [County Name]. No win no fee specialists.",
  "url": "https://[YOUR_DOMAIN]/#near-me/[county-slug]/",
  "telephone": "[YOUR_PHONE]",
  "areaServed": {
    "@type": "AdministrativeArea",
    "name": "[County Name]",
    "addressCountry": "GB"
  }
}
```

**FAQ Schema:** Generate from county page H2 Q&A content.

**BreadcrumbList Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://[YOUR_DOMAIN]/"},
    {"@type": "ListItem", "position": 2, "name": "[County Name]", "item": "https://[YOUR_DOMAIN]/#near-me/[county-slug]/"}
  ]
}
```

### 6.3 Town Page Schema:

Same as county schema but add:
- `"@type": ["LegalService", "LocalBusiness"]`
- Include postcode in `areaServed`
- Three-level BreadcrumbList (Home > County > Town)
- Full FAQ schema from town page H2s

---

## SECTION 7 — INTERNAL LINKING ARCHITECTURE

### 7.1 Homepage Internal Links
- Navigation menu with: Home, About, Contact, Areas Covered
- "Areas We Cover" section: Grid/list of ALL county pages (40+ links)
- Footer: All county links + key town links

### 7.2 County Page Internal Links
- Breadcrumb: Home > [County]
- List of ALL towns within that county (5+ town page links)
- "Other Counties" section: links to 10 neighbouring/related counties
- "Related Areas" sidebar/section with 10+ nearby county links
- Footer mirrors homepage footer

### 7.3 Town Page Internal Links
- Breadcrumb: Home > [County] > [Town]
- Link back to parent county page
- "Other Areas Near [Town]" section: 8–10 links to nearby towns in same county
- "Other Counties" section: 5 links to neighbouring county pages
- "Areas We Cover" section: 20+ total location links

### 7.4 Link Equity Rules
- Every location page must have a minimum of 100 internal links (location pages)
- All location pages link back to homepage
- Anchor text must use keyword + location combinations naturally
- No orphan pages — every page reachable from at least 3 others

---

## SECTION 8 — CONVERSION OPTIMISATION

### 8.1 CTAs — Implement ALL of the following:

| CTA Text                                          | Placement                          |
|---------------------------------------------------|------------------------------------|
| "Get a Free Case Assessment"                      | Hero section (primary CTA button)  |
| "Enquire Today – No Obligation"                   | After H1, sticky mobile bar        |
| "Request Your Free Assessment"                    | After every 2nd H2 section         |
| "Contact Our [Location] Team Today"               | Location page hero                 |
| "Call Us Free: [YOUR_PHONE]"                      | Header, footer, sticky bar         |
| "Start Your Claim Now"                            | Final section before footer        |

### 8.2 Lead Capture Form
Include a multi-step form with:
- Step 1: "What type of incident was it?" (dropdown with common options)
- Step 2: "When did this happen?" (date selector + "More than 3 years ago" option)
- Step 3: Name, Phone, Email fields
- Step 4: Success message with confirmation text

### 8.3 Trust Signals
Include ALL of the following:
- ✅ No Win No Fee badge (prominent, above the fold)
- ✅ "Free, No-Obligation Assessment" badge
- ✅ Star rating display (e.g. 4.9/5 based on 200+ reviews — use placeholder)
- ✅ "Regulated by the SRA" badge
- ✅ "100% Confidential" badge
- ✅ Average claim value highlight (e.g. "Average compensation: £X,XXX")
- ✅ Urgency notice: "3-year limitation period applies — don't delay"
- ✅ Testimonials section with 3 fake-but-realistic UK client quotes

### 8.4 Sticky Header & Mobile Bar
- Desktop: Sticky top bar with phone number and "Get Free Assessment" CTA
- Mobile: Sticky bottom bar with Click-to-Call button + "Start Claim" button

---

## SECTION 9 — TECHNICAL SEO & PERFORMANCE

### 9.1 HTML5 Semantic Structure
Use correct semantic elements:
```html
<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>
<h1> — one per page (injected dynamically via JS)
<h2> through <h4> — correct hierarchy
```

### 9.2 Mobile Optimisation
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
- All touch targets minimum 44px
- Hamburger menu for mobile navigation
- Responsive grid/flexbox layout
- Font sizes minimum 16px body text

### 9.3 Page Speed
- All CSS inline in `<style>` tags
- All JS at bottom of `<body>` or deferred
- No external dependencies except Google Fonts (use preconnect)
- SVG icons inline (no icon libraries)
- Lazy load any images via `loading="lazy"`

### 9.4 XML Sitemap Generation
Include a JavaScript function `generateSitemap()` that outputs a complete XML sitemap string covering all pages. Add a `#sitemap` route that displays this.

### 9.5 Robots.txt Display
Include a `#robots` route that displays:
```
User-agent: *
Allow: /
Sitemap: https://[YOUR_DOMAIN]/sitemap.xml
```

---

## SECTION 10 — DESIGN & UI REQUIREMENTS

### 10.1 Visual Style
- **Professional legal/compensation niche aesthetic**
- Primary colour: Deep navy blue (`#1a2744`) or dark professional tone
- Accent colour: Bright gold/amber (`#f59e0b`) or strong green (`#16a34a`) for CTAs
- Clean white backgrounds for content areas
- High contrast for accessibility (WCAG AA minimum)
- Custom Google Font pairing: one strong serif/slab for headings, clean sans-serif for body

### 10.2 Layout Components Required:
- [ ] Sticky header with logo + nav + CTA
- [ ] Hero section with H1, subheading, trust badges, primary CTA form
- [ ] Stats bar (e.g. "10,000+ Claims", "£2M+ Recovered", "98% Success Rate")
- [ ] Content sections with alternating layout
- [ ] FAQ accordion (click to expand/collapse)
- [ ] Location grid (county cards with links)
- [ ] Testimonials carousel/grid
- [ ] "How It Works" 3-step process section
- [ ] Footer with full sitemap links, contact info, legal disclaimers

### 10.3 Animations (CSS only)
- Smooth page transitions on route change
- Scroll-triggered fade-in for content sections (IntersectionObserver)
- CTA button pulse animation to draw attention
- FAQ accordion slide animation

---

## SECTION 11 — JAVASCRIPT ROUTING ENGINE

Build a complete SPA-style routing system:

```javascript
// Required functions:
router.init()           // Initialise routing on page load
router.navigate(path)   // Navigate to a path
router.renderPage(path) // Render correct page content
router.updateHead(path) // Update <title>, <meta>, <link canonical>, schema
router.updateBreadcrumb(path) // Update breadcrumb display
```

The router must:
- Handle hash-based routing (`#near-me/greater-london/`)
- Dynamically generate page content from location data arrays
- Update ALL meta tags, title, canonical, and schema on every navigation
- Handle 404 — show a helpful "Page Not Found" with links back to homepage and areas covered
- Support browser back/forward navigation
- Scroll to top on page change

---

## SECTION 12 — LOCATION DATA ARRAY

Include a comprehensive JavaScript data array with ALL UK counties and their towns. Structure:

```javascript
const locationData = [
  {
    county: "Greater London",
    slug: "greater-london",
    towns: [
      { name: "Woolwich", slug: "woolwich", postcode: "SE18" },
      { name: "Croydon", slug: "croydon", postcode: "CR0" },
      { name: "Hackney", slug: "hackney", postcode: "E8" },
      { name: "Brixton", slug: "brixton", postcode: "SW2" },
      { name: "Lewisham", slug: "lewisham", postcode: "SE13" },
      // minimum 5 towns per county
    ]
  },
  // ... all 40 counties
];
```

---

## SECTION 13 — ADDITIONAL FEATURES

### 13.1 Compensation Calculator
Include an interactive JavaScript compensation calculator widget:
- Input: Type of incident (dropdown)
- Input: Severity (mild/moderate/severe/very severe)
- Input: Time off work (weeks)
- Output: Estimated compensation range in GBP
- CTA below result: "Get an accurate assessment — contact us now"

### 13.2 Search Functionality
Basic location search box in the hero section and "Areas Covered" section:
- User types a town or county
- JavaScript filters the location data array in real time
- Shows matching location pages as clickable links

### 13.3 Cookie Consent Banner
GDPR-compliant cookie consent banner:
- Accept / Decline buttons
- Stores preference in localStorage
- Links to Cookie Policy page

---

## SECTION 14 — FOOTER REQUIREMENTS

Footer must include:
- Logo / Brand name
- Short tagline with keyword
- Full county link grid (all 40 counties, 3–4 column layout)
- Quick links: About, Contact, Privacy Policy, Cookie Policy, Sitemap
- Contact details: phone, email
- Legal disclaimer: "This website is for informational purposes. We are regulated by [body]. No Win No Fee arrangements are subject to eligibility."
- Copyright line: `© [YEAR] [YOUR_DOMAIN]. All rights reserved.`

---

## DELIVERABLE REQUIREMENTS

Produce a **single, complete HTML5 file** that:

1. ✅ Contains ALL pages (homepage + 40+ county pages + 200+ town pages) rendered client-side via JavaScript
2. ✅ Has ALL CSS embedded in `<style>` tags
3. ✅ Has ALL JavaScript embedded before `</body>`
4. ✅ Requires NO server, NO build tools, NO external dependencies (except Google Fonts CDN)
5. ✅ Is fully functional when opened directly in a browser
6. ✅ Passes W3C HTML5 validation
7. ✅ Passes Google's Mobile-Friendly Test criteria
8. ✅ Includes all schema markup (JSON-LD) injected dynamically per page
9. ✅ Has unique, full-length content on every page (no placeholder lorem ipsum)
10. ✅ Has all internal links working correctly via JavaScript router
11. ✅ Has a complete, professional design suitable for live deployment

**Output the file in full. Do not truncate. Do not summarise. Output the entire HTML file from `<!DOCTYPE html>` to the closing `</html>` tag.**

---

## END OF PROMPT
