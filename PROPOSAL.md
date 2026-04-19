# Panay Land — Project Proposal

**Prepared for:** Flord Nicson J. Calawag
**Prepared by:** GM Agreda
**Date:** 2026-04-19

---

## Hi Nicson

Following up on your interest after seeing LotView (my own platform), this proposal is for **Panay Land** — a brand-new, dedicated platform built specifically for your land listings. It will be your own product with your own branding, hosting, and data.

This proposal keeps things lean and transparent. No upfront fees. No hidden costs. You pay for features only when you want them.

---

## 1. What You Get — Your Own Panay Land Platform

A fresh build (not a shared demo — your own instance) with:

- Interactive satellite map with lot polygons drawn to scale
- Search by Province → Municipality → Barangay (all 3,389 official PSGC barangays — including Tibiao, Culasi, and the rest of Antique)
- Currency converter for overseas buyers (USD, AED, SGD, EUR, and more — important for OFW family buying back home)
- Lot comparison (up to 3 lots side-by-side)
- Share via link or QR code
- Document checklist (Title, Tax Dec, Lot Plan, etc.)
- Admin panel where only you can post listings
- Google/email sign-in for buyers to save favorites
- **Watermarked maps with YOUR branding** — e.g., "PANAY LAND • NICSON CALAWAG • 0917-XXX-XXXX" plus the viewer's email, to stop competitors from stealing your listings
- Hidden exact boundaries for anonymous visitors — they must sign in to see the real polygon
- Cloudflare DDoS protection
- Runs on your own domain (see domain section below)

**Timeline to build and deploy: 1–2 weeks after kickoff.**

---

## 2. Hosting & Infrastructure — Full Transparency

### Right Now: ₱0/Month

Every service runs on free tiers. As long as traffic stays low (typical for year 1), it stays **free forever**.

Complete stack powering your platform:

| Service | Purpose | Plan | Monthly Cost |
|---------|---------|------|--------------|
| **Vercel** | Hosting (Next.js app) | Hobby (free) | ₱0 |
| **Supabase** | Database + Auth + Storage | Free tier | ₱0 |
| **Google Maps Platform** | Maps, satellite, search | Free tier (10K loads/mo) | ₱0 |
| **Google Cloud OAuth** | Google sign-in | Free | ₱0 |
| **Cloudflare** | DDoS protection, CDN, DNS | Free | ₱0 |
| **GitHub** | Code repository | Free | ₱0 |
| **TOTAL** | | | **₱0/mo** |

### Domain Purchase (One-Time Decision)

You'll need a domain for your platform. Actual prices depend on which TLD is still available and the current registrar rates at purchase time.

| Typical Option | Budget Cap (PHP, annual) | Notes |
|----------------|--------------------------|-------|
| **panayland.com** or .net | up to **₱1,500/year** | Standard choice, easy to remember |
| **panayland.ph** | up to **₱3,500/year** | More "Philippines" feel |
| **panayland.com.ph** | up to **₱3,500/year** | Traditional PH business TLD |
| **Budget alternative** (.site, .online, .xyz) | up to **₱1,000/year** | If premium TLDs are taken or pricing spikes |

### Budget Cap & Process

- **Maximum annual domain budget: ₱3,500**
- Once we start, I'll check available TLD options in real-time
- I'll **consult you before purchase** — you approve the exact domain and price
- If .com is available at typical rates, expect around ₱800
- If we go .ph, expect around ₱2,500
- Premium names (single short words) can spike to ₱1,500–₱3,500 — we'd discuss before buying

**For safety, keep at least ₱3,500 loaded on the card for the domain line item.** Any unused balance stays on your card for other services.

I recommend **.com** if available — best balance of cost, trust, and memorability. Registered through Cloudflare (cheapest source for most TLDs).

### When Costs Start (Exact Thresholds)

Once your platform grows, certain services start charging. Here's exactly when:

#### Under 100 visitors/day (~3,000/month)
- **Everything stays FREE**
- Typical first 6–12 months
- **Your monthly cost: ₱0**

#### 100–250 visitors/day (~3,000–7,500/month)
- Google Maps past 10K loads triggers charges
- **Your monthly cost: ₱1,000–₱2,500**

#### 250–500 visitors/day (~7,500–15,000/month)
- Google Maps: ~₱5,000/mo
- Vercel Pro recommended: ₱1,500/mo
- **Your monthly cost: ₱5,000–₱7,000**

#### 500–1,000 visitors/day (~15,000–30,000/month)
- Google Maps: ~₱10,000/mo
- Vercel Pro: ₱1,500/mo
- Supabase Pro (if 400+ listings with photos): ₱1,800/mo
- **Your monthly cost: ₱12,000–₱14,500**

#### 1,000–2,000 visitors/day (~30,000–60,000/month)
- Google Maps: ~₱21,000/mo
- Vercel Pro: ₱1,500/mo
- Supabase Pro: ₱1,800/mo
- **Your monthly cost: ₱22,000–₱25,000**

**Note:** All PHP prices rounded up from USD for safety against exchange rate changes.

**Google Maps is the biggest cost driver.** If you hit that tier, I can implement optimizations (static thumbnails, lazy-loaded maps) to cut that cost by **60–70%**.

### Bottom Line

Even at 250 visitors/day, you'd likely be getting **5–15 qualified inquiries per month**. The cost (~₱2,000/mo) pays for itself with **ONE closed deal**.

---

## 3. What I Need From You At Signup (Prepaid Card)

To set up services in **your name** (so everything is yours and you own the accounts), I'll need a **reloadable business card** from you **before we start**.

### Why I Need It At Signup

- **Google Cloud Billing** requires a card to activate the Maps API
- **Vercel, Supabase** require a card to verify the account (even on free tier, many services lock pro-tier features behind card setup)
- **Claude Code Pro** (my dev tool) — billed to the card during active feature work
- **Domain purchase** — one-time charge of ~₱800 for panayland.com

### Card Options (Any Works)

| Option | How to Get |
|--------|-----------|
| **GCash virtual card** | Free within GCash app, Mastercard |
| **Maya virtual card** | Free within Maya app, Mastercard |
| **UnionBank EON** | In-branch or app, prepaid |
| **BPI/BDO prepaid debit** | In-branch, ~₱200 card fee |
| **Business credit card** | If you have one from your bank |

### How It Works

1. **You give me the card** (I can help register each service under your name)
2. **You control the balance** — load only what's needed
3. **No auto-charges without your approval** — I'll always ask before any upgrade
4. **You see every transaction** — full transparency

### Initial Load Needed

- Domain purchase (budget cap): **₱3,500** (one-time — actual may be less, refund stays on card)
- Google Cloud billing verification: **₱50** (Google temporarily holds, refunded)
- Claude Code Pro (first month during active dev): **₱1,500**
- Buffer for small unexpected charges: **₱500**

**Total first load: ₱5,500**

This covers the domain even if we have to buy a .ph (which is the most expensive option). Any unused balance stays on your card for later services.

Everything else adds up only when traffic grows or you approve a feature upgrade.

---

## 4. Optional Features (Menu)

Pick only what helps your business. Each is separate:

| Feature | Why You'd Want It | Cost | Timeline |
|---------|-------------------|------|----------|
| **Email notifications** | Get an email the moment someone inquires — reply faster, win more deals | ₱5,000 | 1–2 days |
| **Photo upload** | Upload real photos per lot. Huge for OFW buyers who can't visit | ₱12,000 | 3 days |
| **PDF brochure export** | One-click printable flyer per lot — for walk-in clients or FB posts | ₱8,000 | 2 days |
| **Sketch map upload** | Upload tax dec sketch, overlay on real map | ₱6,000 | 1 day |
| **SEO for Google** | Rank when people Google "lot for sale Tibiao" or "Antique land" | ₱10,000 | 2 days |
| **Google Analytics** | See who visits, where they're from, which lots get interest | ₱4,000 | 1 day |
| **"Near Tourist Spots" badge** | Tag "Near Tibiao Falls" / "Near Seco Island" — your eco-tourism edge | ₱5,000 | 1 day |
| **Facebook Messenger button** | Direct chat from listing to your FB Messenger | ₱4,000 | 1 day |
| **WhatsApp/Viber button** | Same but for OFW buyers abroad | ₱4,000 | 1 day |

**Pick any combination. No minimum.**

### My Starter Pack Recommendation For You

Based on your eco-tourism/Tibiao focus:

1. **Photo upload** (₱12,000) — must-have for rural land sales
2. **Email notifications** (₱5,000) — don't lose inquiries
3. **Facebook Messenger button** (₱4,000) — your clients already use FB
4. **"Near Tourist Spots" badge** (₱5,000) — your competitive edge

**Starter Pack Total: ₱26,000** — one-time, 1-week turnaround.

---

## 5. Ongoing Maintenance — Your Choice

Pick one:

### Option A: Pay Only When Something Breaks
No monthly fee:
- **Bug fix:** ₱2,500 per bug
- **Small tweak:** ₱800/hour
- **New feature:** From menu above

Best for stable operation.

### Option B: Peace-of-Mind Retainer — ₱8,000/month
- All bug fixes covered (unlimited)
- Up to 4 hours/month of small tweaks
- 48-hour response time
- Monthly analytics review

Best for hands-off owners.

### Option C: Active Growth Retainer — ₱25,000/month
- Everything in Option B
- 12 hours/month for new features
- 24-hour response time
- Weekly priority list

Best during active growth.

### Emergency Support
- **₱1,500/hour** (2-hour min)
- Response within 2 hours, any day

---

## 6. Claude Code Pro Subscription

I use Claude Code to build this quickly and well. Cost: **~₱1,500/month** during active development.

- **During active feature work:** You cover ₱1,500/mo (bills to your prepaid card)
- **During maintenance:** Not needed, skip it

Optional. If you'd rather I absorb it, I can — my rates would adjust slightly.

---

## 7. Realistic Year 1 Budget Scenarios

### Scenario A: "Let me try it first"
- Platform setup (free build, your branding): included
- Domain (up to ₱3,500 — actual confirmed at purchase): ₱800–₱3,500
- Email Notifications: ₱5,000
- No retainer — pay ₱2,500 only if a bug comes up
- Hosting stays free (< 100 visitors/day)
- **Year 1 total: ₱6,000 – ₱25,000**

### Scenario B: "I'm serious about this"
- Platform setup: included
- Domain: up to ₱3,500
- Starter Pack features: ₱26,000
- Option B retainer: ₱8,000 × 12 = ₱96,000
- Claude Code Pro for 2 months: ₱3,000
- Hosting (free 6mo, ~₱2,000/mo next 6mo): ₱12,000
- **Year 1 total: ~₱140,000**

### Scenario C: "I want to dominate Panay"
- Platform setup: included
- Domain: up to ₱3,500
- All Phase 2 features: ~₱58,000
- Option C retainer: ₱25,000 × 12 = ₱300,000
- Claude Code Pro all year: ₱18,000
- Hosting at growth traffic: ~₱80,000
- **Year 1 total: ~₱460,000**

---

## 8. How I Protect Your Interest

- **Code is yours.** On your GitHub account from day 1.
- **Data is yours.** Your Supabase account, full export anytime.
- **Domain is yours.** Registered in your name on your Cloudflare account.
- **Card balance is yours.** You control the prepaid card. No auto-charges without approval.
- **No lock-in.** Cancel retainer anytime, no penalty. Bring in another developer if you want.
- **Transparent pricing.** You always see the menu before you pay.

---

## 9. Complete Stack Summary

| Layer | Service | Why |
|-------|---------|-----|
| **Hosting** | Vercel | Fast, globally distributed, auto-scales |
| **Framework** | Next.js 16 | Industry standard, SEO-friendly |
| **Database** | Supabase (PostgreSQL) | Reliable, scales, cheap |
| **Auth** | Supabase + Google OAuth | Google sign-in works seamlessly |
| **File storage** | Supabase Storage | For lot photos, PDF uploads |
| **Maps** | Google Maps Platform | Best satellite imagery for Philippines |
| **Search** | Google Places API | Finds every PH barangay |
| **CDN + Security** | Cloudflare | Free DDoS protection, worldwide |
| **Domain + DNS** | Cloudflare Registrar | Cheapest available, ~₱800/yr for .com |
| **SSL certificate** | Cloudflare + Vercel | Auto HTTPS |
| **Email (future)** | Resend | Free 3K emails/month, then cheap |
| **Code hosting** | GitHub | Your code, your repo |
| **AI dev assistant** | Claude Code | How I build this quickly |

---

## 10. Next Steps

1. **Prepare the prepaid card** (GCash/Maya virtual card is simplest) with **₱5,500 initial load**
2. **Approve the domain options + budget cap** — I'll check availability and consult you before purchase (max ₱3,500)
3. **Approve your watermark text** — suggested: "PANAY LAND • NICSON CALAWAG • [your contact number]"
4. **Pick which features** from Section 4 (start with Starter Pack recommended, or pick 1–2 to try)
5. **Pick a maintenance option** (A, B, or C) — or none for now
6. **Sign & we start** — no upfront fees, build begins

**Timeline: 1–2 weeks from card setup to live platform with your branding.**

---

## Summary Card

| | Cost (PHP) |
|--|-----------|
| **Platform build with your branding** | FREE |
| **Domain (budget cap — actual confirmed before purchase)** | up to ₱3,500/year |
| **Hosting months 1–6 (typical traffic)** | FREE |
| **Hosting months 7–12 (moderate growth)** | ~₱2,000/mo |
| **Initial card load** | ₱5,500 |
| **Starter Pack features (recommended)** | ₱26,000 one-time |
| **Basic retainer (optional)** | ₱8,000/mo |
| **Claude Code Pro (during feature work)** | ~₱1,500/mo |
| **Bug fixes without retainer** | ₱2,500 each |

**Minimum to start: ₱5,500** (initial card load including domain budget cap).
**Recommended full package: ~₱40,000** (card load + Starter Pack + 1 month retainer).

---

Contact me anytime: **gm.agreda@gmail.com / 0918 262 4068**

Salamat, Nicson. Excited to build this for you.

— GM
