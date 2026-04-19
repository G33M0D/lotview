# LotView Platform — Project Proposal

**Prepared by:** GM Agreda
**Date:** 2026-04-19
**Live Demo:** https://lotview.xmodx.com

---

## 1. Executive Summary

LotView is a modern land listing platform purpose-built for Panay (Iloilo, Aklan, Capiz, Antique, Guimaras) with polygon-overlayed satellite maps, OFW-friendly features, and admin-only listing management. The MVP is already live and running on free-tier infrastructure.

This document outlines the completed work, future feature roadmap, hosting costs as traffic grows, and payment terms for both the initial build and post-launch support.

---

## 2. What's Already Built (MVP — Delivered)

### Buyer Experience
- Interactive satellite map with lot polygons drawn to real-world scale
- Cascading location filter: Province → Municipality → Barangay (3,389 official PSGC barangays)
- Side-by-side lot comparison (up to 3 lots)
- Currency converter for OFW buyers (USD, AED, SGD, EUR, GBP, JPY, KRW, HKD, SAR)
- Document availability checklist (Title, Tax Dec, Lot Plan, Survey, Deed)
- Share via link, QR code, Web Share API
- Inquiry form saved directly to database
- Save favorite lots (requires registration)
- Responsive on laptop, tablet, and mobile

### Seller/Admin Experience
- 3-step listing creation wizard (Location → Lot Size → Details)
- Google Places address search with auto-zoom to location
- Pin + Dimensions mode (enter frontage × depth, rectangle auto-draws)
- Draw Custom Shape mode for irregular lots
- Admin dashboard: listings CRUD, inquiries, registered users
- Admin-only listing management (only you can publish)

### Security & Trust
- Google SSO + email/password registration
- Watermarked maps: "PROPERTY OF AGREDA CONTACT 09182624068 • [user email]"
- Polygon details hidden for anonymous users (requires sign-in to see exact boundaries)
- Cloudflare DDoS protection
- HTTPS/SSL via Cloudflare edge
- Custom domain: lotview.xmodx.com

### Infrastructure
- Frontend: Next.js 16 on Vercel
- Database: Supabase Postgres
- Maps: Google Maps JavaScript API
- CDN + Security: Cloudflare
- All running on free tiers

---

## 3. Future Features Roadmap

### Phase 2 — Critical (First Priority Post-Launch)

| Feature | Description | Effort |
|---------|-------------|--------|
| Email notifications | Admin gets instant email when a buyer submits an inquiry | 1 day |
| Photo upload gallery | Upload lot photos to Supabase Storage, show on listing detail | 2-4 days |
| PDF brochure export | Generate printable one-page brochure per lot | 1-3 days |
| Sketch map upload | Upload scanned lot plan, overlay on map | 1 day |
| SEO optimization | Meta tags, sitemap, Open Graph, structured data for Google ranking | 1-2 days |
| Analytics | Google Analytics / Vercel Analytics integration | 1 day |

### Phase 3 — Nice-to-Have

| Feature | Description | Effort |
|---------|-------------|--------|
| Saved searches + alerts | Buyers save filters, get email when new matching lots are listed | 2-4 days |
| Lead pipeline | Track inquiries through: New → Contacted → Negotiating → Reserved → Closed | 2-4 days |
| Bulk CSV import/export | Upload multiple listings at once, export leads | 1-2 days |
| Multi-seller support | Allow other brokers/sellers to list (with admin approval) | 5-8 days |

### Phase 4 — Advanced

| Feature | Description | Effort |
|---------|-------------|--------|
| Reservation payments | PayMongo/Xendit integration for online deposits | 1-2 weeks |
| Native mobile app | iOS + Android app (or PWA as a lighter alternative) | PWA: 2-4 days / Native: 3-6 weeks |
| Map story mode | Animated zoom from Panay → municipality → barangay → lot | 1-2 days |
| Family review mode | Share private link where family members can comment | 2 days |
| Hazard flags | Flood/landslide warnings from HazardHunterPH | 2 days |

---

## 4. Hosting Costs — Free Tier & Beyond

### Free Tier Coverage (What You Get for Free)

| Service | Free Tier Limit | What That Means |
|---------|-----------------|-----------------|
| **Vercel** | 100 GB bandwidth/month | ~40,000 page loads/month or ~430 visits/day |
| **Supabase** | 500 MB database, 1 GB storage, 50K monthly active users | ~3,000–5,000 listings OR ~400 listings with photos |
| **Google Maps** | 10,000 map loads/month | ~333 map loads/day or ~220 unique users/day |
| **Cloudflare** | Unlimited bandwidth + DDoS | No practical limit |

### Realistic Cost as Traffic Grows

Assumptions: 3 page views per visitor, 2.5 MB per page, 1.5 map loads per visitor.

| Daily Visitors | Monthly Cost | Notes |
|---------------|--------------|-------|
| **0–100** | **FREE** (₱0) | All services stay within free tiers |
| **100–500** | **$100–$140/mo** (~₱5,700–₱8,000) | Mostly Google Maps fees kick in |
| **500–2,000** | **$270–$600/mo** (~₱15,500–₱34,400) | Vercel Pro + Supabase Pro + Maps |
| **2,000+** | **$600–$1,400/mo** (~₱34,400–₱80,400) | Scale tier on all services |

### What Drives the Cost
1. **Google Maps is the biggest cost driver** — $7 per 1,000 loads after free tier
2. **Vercel Pro ($20/mo)** needed once bandwidth exceeds 100 GB/month
3. **Supabase Pro ($25/mo)** needed once you store more than 400 listings with photos
4. **Cloudflare stays free** regardless of traffic

### Traffic Growth Expectations (Realistic for Panay Market)

| Scenario | Timeframe | Visitors/Day | Inquiries/Month | Monthly Cost |
|----------|-----------|--------------|-----------------|--------------|
| **Conservative** | 6–12 months after launch | 50–200 | 5–30 | FREE |
| **Moderate** | 12–18 months with SEO + FB marketing | 500–1,000 | 20–100 | $100–$300/mo |
| **Aggressive** | 18+ months regional coverage + paid ads | 2,000+ | 75–250+ | $600+/mo |

**Bottom line:** For the first 6–12 months, hosting is $0. You only start paying when the platform is generating real business.

---

## 5. Payment Structure — Initial Development

### Total Project Investment: ₱380,000 – ₱500,000

The MVP has already been built at no cost to you. This figure covers the remaining roadmap items (Phase 2 features) plus final polish, testing, and handoff.

### Milestone Breakdown

| Milestone | Deliverables | Payment | Timeline |
|-----------|--------------|---------|----------|
| **Upfront / Project Start** | Secures development slot, deposits tools (Claude Code Pro subscription setup) | **25%** — ₱95,000 | Week 0 |
| **Milestone 1: Refinement + Email Notifications** | Bug fixes from client feedback on MVP, email notifications for inquiries, staging environment | **20%** — ₱76,000 | Week 1–2 |
| **Milestone 2: Photos + PDF Brochure** | Photo upload to cloud storage, gallery on listing detail, PDF brochure export | **25%** — ₱95,000 | Week 3–4 |
| **Milestone 3: SEO + Analytics + Sketch Upload** | SEO for Google ranking, analytics dashboard, sketch map upload feature | **15%** — ₱57,000 | Week 5–6 |
| **Milestone 4: Testing + Final Deployment + Docs** | Full QA, production deployment, user guide documentation, handoff | **15%** — ₱57,000 | Week 7–8 |

**Total: ₱380,000** (base estimate — higher end of ₱500,000 if scope expands)

Payment due within 7 business days of each milestone acceptance.

---

## 6. Post-Launch Support & Maintenance

Once the platform is live, you have 3 options for ongoing work:

### Option A: Monthly Retainer (Recommended for Active Growth)

| Tier | Hours/Month | Monthly Cost | Best For |
|------|-------------|--------------|----------|
| **Part-time retainer** | ~80 hours | ₱100,000 – ₱140,000 | Active development + feature additions |
| **Full-time retainer** | ~160 hours | ₱200,000 – ₱280,000 | Aggressive growth phase, weekly features |

**What's included:**
- All bug fixes (unlimited)
- Minor UI tweaks and copy edits
- Small feature additions within monthly hours
- Priority response (within 24 hours)
- Monthly performance review

### Option B: Pay-Per-Task (Recommended for Stable Platform)

| Task | Rate |
|------|------|
| Bug fix (standard) | ₱3,600 per bug (minimum) |
| Bug fix (critical/emergency) | ₱2,500/hour (2-hour minimum) |
| Minor tweak (copy edit, color change, UI adjustment) | ₱1,800/hour |
| New feature | Quoted separately (fixed price per feature) |

### Option C: Bug-Fix-Only Retainer (Minimal Ongoing)

For a stable platform where you just want protection against bugs:

- **₱15,000/month** — Covers up to 5 bug fixes per month, 48-hour response time
- Any additional work billed at pay-per-task rates above

### Response Time Commitments

| Severity | Retainer | Pay-Per-Task |
|----------|----------|--------------|
| Critical (site down) | 2 hours | 4 hours |
| High (feature broken) | 24 hours | 48 hours |
| Medium (UI issue) | 48 hours | Next business week |
| Low (enhancement) | Within 2 weeks | Quoted individually |

---

## 7. Claude Code Pro Subscription

Claude Code (Anthropic's AI development assistant) powers the rapid development of this project. It's essential for both initial build and ongoing maintenance.

### Cost

| Plan | Monthly Cost | Usage |
|------|--------------|-------|
| **Claude Pro** | $20/mo (~₱1,150) | Light use — small fixes, simple features |
| **Claude Max 5x** | $100/mo (~₱5,750) | Moderate use — active feature development |
| **Claude Max 20x** | $200/mo (~₱11,500) | Heavy use — multiple large features per month |

### Proposed Arrangement

**During active development (milestone phases):** Client pays **Claude Max 5x ($100/mo)** — this enables fast iteration and high-quality output.

**During maintenance phase:** Client pays **Claude Pro ($20/mo)** — sufficient for bug fixes and small tweaks.

**Payment method options:**
1. Client sets up own subscription under their credit card, shares API access (simplest)
2. GM pays and bills the client as a line item each month (reimbursed)

---

## 8. Summary: What You're Paying For

### Year 1 Total Cost Estimate

**Best case (Conservative growth):**
- Initial development: ₱380,000 (one-time)
- Claude Code Pro during build (2 months Max, then Pro): ~$240 = ₱13,800
- Hosting (FREE for first 6–12 months)
- Post-launch Bug-Fix-Only retainer (6 months): ₱90,000
- **Year 1 total: ~₱483,800**

**Moderate case (Healthy growth):**
- Initial development: ₱380,000
- Claude Max during build + 6 months Pro: ~$320 = ₱18,400
- Hosting (6 months free + 6 months paid at ~$150/mo avg): ~₱51,750
- Part-time retainer (6 months): ₱600,000
- **Year 1 total: ~₱1,050,150**

**Aggressive case (High-growth):**
- Initial development: ₱500,000
- Claude Max full year: ~$1,200 = ₱69,000
- Hosting (full year scaling up): ~₱287,500
- Full-time retainer (full year): ₱2,400,000
- **Year 1 total: ~₱3,256,500**

---

## 9. Why This Makes Business Sense

1. **Low risk start:** MVP is already built and working. You pay for features you actually want.
2. **Pay only when growing:** Hosting costs scale with traffic, not upfront. First 6–12 months likely free.
3. **Flexible engagement:** Pick retainer, pay-per-task, or bug-fix-only based on your actual needs.
4. **Clear milestones:** Every payment is tied to visible, testable deliverables.
5. **No vendor lock-in:** Code is on your GitHub, database is yours, you can always bring in another developer.

---

## 10. Next Steps

1. Review this proposal, mark up any questions or changes
2. Agree on initial milestones and retainer preference
3. Sign service agreement
4. 25% upfront payment releases the first milestone work
5. Kick-off meeting to prioritize Phase 2 features

---

**Questions? Contact GM Agreda at gm.agreda@gmail.com / 09182624068**
