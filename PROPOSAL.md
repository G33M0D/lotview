# Panay Land — Project Proposal

**Prepared for:** Flord Nicson J. Calawag
**Prepared by:** GM Agreda
**Date:** 2026-04-19
**Live Demo:** https://lotview.xmodx.com (will rebrand to Panay Land on approval)

---

## Hi Nicson

I built a working demo of Panay Land specifically for your Panay/Antique land listings. It's already live at **https://lotview.xmodx.com** — take a few minutes to click around: browse the map, search by barangay, open a listing.

This proposal keeps things lean and transparent. I built the MVP at no cost to you. What follows covers only what you'd pay going forward — and only the features you actually want.

---

## 1. What's Already Built (Yours to Use, Free)

The working demo already has:

- Interactive satellite map with lot polygons drawn to scale
- Search by Province → Municipality → Barangay (all 3,389 official PSGC barangays — including Tibiao, Culasi, and the rest of Antique)
- Currency converter for overseas buyers (USD, AED, SGD, EUR, and more — important for OFW family buying back home)
- Lot comparison (up to 3 lots side-by-side)
- Share via link or QR code
- Document checklist (Title, Tax Dec, Lot Plan, etc.)
- Admin panel where only you can post listings
- Google/email sign-in for buyers to save favorites
- Watermarked maps that say **"PROPERTY OF AGREDA CONTACT 09182624068"** with the viewer's email — stops competitors from stealing your listings
- Hidden exact boundaries for anonymous visitors — they have to sign in to see the real polygon
- Cloudflare DDoS protection
- Runs on your own domain: lotview.xmodx.com (can move to panayland.xmodx.com or any domain you choose)

All the infrastructure is **free-tier right now**. You can start using this today with **zero monthly cost**.

---

## 2. Hosting & Infrastructure — Full Transparency

### I Need You To Know Up Front

**Right now, you pay ₱0/month for all of this.** Everything runs on free tiers. As long as traffic stays low (most of year 1), that stays ₱0.

Here's every service running your platform:

| Service | Purpose | Current Plan | Monthly Cost Now |
|---------|---------|--------------|------------------|
| **Vercel** | Hosting (Next.js app) | Hobby (free) | ₱0 |
| **Supabase** | Database + Auth + Storage | Free tier | ₱0 |
| **Google Maps Platform** | Interactive maps, satellite view, search | Free tier (10K loads/mo) | ₱0 |
| **Google Cloud** | OAuth (Google sign-in) | Free (part of GCP) | ₱0 |
| **Cloudflare** | DDoS protection, CDN, DNS | Free plan | ₱0 |
| **xmodx.com domain** | Custom URL | Already owned | ₱0 |
| **GitHub** | Code repository | Free | ₱0 |
| **Anthropic (Claude)** | AI developer tool I use to build | My subscription during build | ₱0 (for now) |
| **TOTAL** | | | **₱0/mo** |

### When Costs Start (Transparent Thresholds)

Once traffic grows, certain services start charging. Here's exactly when and how much:

#### At 100 visitors/day (~3,000/month)
- Everything stays **FREE**
- No changes needed
- **Your cost: ₱0/month**

#### At 250 visitors/day (~7,500/month)
- Google Maps starts charging past 10K map loads
- Rough cost: **$20–40/mo (~₱1,150–₱2,300)**
- Vercel & Supabase still free
- **Your cost: ~₱2,000/month**

#### At 500 visitors/day (~15,000/month)
- Google Maps: **~$80/mo (~₱4,600)**
- Vercel Pro recommended: **$20/mo (~₱1,150)**
- Supabase still free (unless many listings)
- **Your cost: ~₱5,800/month**

#### At 1,000 visitors/day (~30,000/month)
- Google Maps: **~$170/mo (~₱9,800)**
- Vercel Pro: **$20/mo (~₱1,150)**
- Supabase Pro (if 400+ listings with photos): **$25/mo (~₱1,450)**
- **Your cost: ~₱12,400/month**

#### At 2,000 visitors/day (~60,000/month)
- Google Maps: **~$350/mo (~₱20,100)**
- Vercel Pro: **$20/mo**
- Supabase Pro: **$25/mo**
- **Your cost: ~₱22,700/month**

**Google Maps is the biggest cost driver.** If you hit that tier, I can implement optimizations (static thumbnails, lazy-loaded maps) to cut that cost by 60–70%.

### You Don't Pay Until You're Getting Value

Even at 250 visitors/day, you'd likely be getting **5–15 qualified inquiries per month**. The cost (~₱2,000/mo) pays for itself with ONE closed deal.

---

## 3. What I'll Need From You Later (Prepaid Card)

To register for the paid tiers when the time comes, you'll need a **reloadable business card** that I can use to set up:

- **Google Cloud Billing** (for Maps API overages)
- **Vercel Pro** (when we upgrade)
- **Supabase Pro** (when we upgrade)
- **Resend** (for email notifications — free tier covers 3,000 emails/month)
- **Claude Code Pro** (my dev tool during active feature work)

### What You'd Use

Any of these work:
- **GCash/Maya virtual card** — simplest, reload as needed
- **UnionBank EON prepaid card** — widely accepted
- **BPI/BDO prepaid debit card** — traditional option
- **Bank issued virtual/credit card** from your business account

**You only load it when we need it** (i.e., when you approve an upgrade). No auto-charges without your approval.

**Why a card vs. bank transfer?** Vercel, Supabase, and Google require a card to enable billing — no bank-only payment. But you control the balance.

---

## 4. Optional Features (Menu of Enhancements)

Pick only what helps your business. Each is a separate menu item.

| Feature | Why You'd Want It | Cost | Timeline |
|---------|-------------------|------|----------|
| **Email notifications** | Get an email the moment someone inquires about a lot — you reply faster, win more deals | ₱5,000 | 1–2 days |
| **Photo upload** | Upload real photos per lot (right now it shows satellite only). Huge for OFW buyers who can't visit | ₱12,000 | 3 days |
| **PDF brochure export** | One-click printable flyer per lot — for walk-in clients or Facebook posts | ₱8,000 | 2 days |
| **Sketch map upload** | Upload the tax dec sketch or lot plan, overlay it on the real map so buyers see exactly what you're selling | ₱6,000 | 1 day |
| **SEO for Google** | Get your listings to show up when people Google "lot for sale Tibiao" or "Antique land" | ₱10,000 | 2 days |
| **Google Analytics** | See how many people view each lot, where they're from, which ones get inquiries | ₱4,000 | 1 day |
| **"Near Tourist Spots" badge** | Tag listings as "Near Tibiao Falls" / "Near Seco Island" / "Eco-friendly lot" — plays to your tourism angle | ₱5,000 | 1 day |
| **Facebook Messenger button** | Direct chat from the listing to your FB Messenger (your clients are already there) | ₱4,000 | 1 day |
| **WhatsApp/Viber button** | Same idea, but for OFW buyers | ₱4,000 | 1 day |

**Pick any combination. No minimum.**

### My Starter Pack Recommendation (for your use case specifically)

Based on your eco-tourism/Tibiao focus, I'd prioritize:

1. **Photo upload** (₱12,000) — must-have for rural land sales
2. **Email notifications** (₱5,000) — don't lose inquiries
3. **Facebook Messenger button** (₱4,000) — your clients already use FB
4. **"Near Tourist Spots" badge** (₱5,000) — your competitive edge

**Starter Pack Total: ₱26,000** — one-time, 1-week turnaround.

---

## 5. Ongoing Maintenance — Your Choice

Pick one:

### Option A: Pay Only When Something Breaks

No monthly fee. If a bug appears or you want a small change:
- **Bug fix:** ₱2,500 per bug
- **Small tweak** (wording, color, small UI): ₱800/hour (usually 1 hour)
- **New feature:** Quoted from the menu above

Best if the platform runs smoothly and you're not adding features often.

### Option B: Budget Peace-of-Mind Retainer — ₱8,000/month

- All bug fixes covered (unlimited)
- Small tweaks covered (up to 4 hours/month)
- 48-hour response time
- Monthly check-in call to review analytics

Best if you want things just to work without worrying about invoices.

### Option C: Active Growth Retainer — ₱25,000/month

- Everything in Option B
- Plus 12 hours/month for new features/improvements
- 24-hour response time
- Weekly priority list

Best when you're actively growing and want new features monthly.

### Emergency Support (Any Plan)

If the site is down or there's a critical problem:
- **₱1,500 per hour** (2-hour minimum)
- Response within 2 hours, any day

---

## 6. Claude Code Pro Subscription

I use Claude Code (an AI development tool) to build this fast and well. It costs **$20/month (~₱1,150)** during active development.

### How We'll Handle It

- **During active development** (when you're paying for features): You cover **$20/month (~₱1,150)** — bills to the same prepaid card
- **During maintenance phase**: Not needed — I'll only use it if you're actively adding features

This is optional. If you'd rather I absorb it, I can — it'll just reflect slightly in my rates.

---

## 7. Realistic Year 1 Budget Scenarios

Based on how you use the platform:

### Scenario A: "Let me try it first"
- Start with just the platform as-is (free)
- Add **Email Notifications** (₱5,000) so you don't miss inquiries
- No retainer — pay ₱2,500 only if a bug comes up
- Claude Code Pro not needed
- Hosting stays free (< 100 visitors/day)
- **Year 1 total: ₱5,000 – ₱15,000 max**

### Scenario B: "I'm serious about using this"
- Starter Pack features (₱26,000)
- Option B retainer (₱8,000/mo × 12 = ₱96,000)
- Claude Code Pro for 2 months of active dev (₱2,300)
- Hosting: free first 6 months, ~₱2,000/mo next 6 months if moderate growth = ₱12,000
- **Year 1 total: ~₱136,300**

### Scenario C: "I want to scale this across Panay"
- All Phase 2 features (~₱58,000)
- Option C retainer (₱25,000/mo × 12 = ₱300,000)
- Claude Code Pro all year (₱13,800)
- Hosting at moderate traffic: ~₱70,000 for the year
- **Year 1 total: ~₱441,800**

---

## 8. How I Protect Your Interest

- **Code is yours.** It's on your GitHub account. Bring in another developer anytime.
- **Data is yours.** Supabase account is yours. Export anytime.
- **Domain is yours.** panayland.xmodx.com (or whatever domain you choose) is yours.
- **Card balance is yours.** You control the prepaid card. No auto-charges without approval.
- **No lock-in.** Cancel the retainer anytime, no penalty.
- **Transparent pricing.** You always see the menu before you pay.

---

## 9. Complete Stack Summary

For full transparency, here's every piece of technology powering Panay Land:

| Layer | Service | Why |
|-------|---------|-----|
| **Hosting** | Vercel | Fast, globally distributed, auto-scales |
| **Frontend framework** | Next.js 16 | Industry standard, SEO-friendly |
| **Database** | Supabase (PostgreSQL) | Reliable, scales well, Filipino-friendly pricing |
| **Authentication** | Supabase Auth + Google OAuth | Google sign-in works seamlessly |
| **File storage** | Supabase Storage | For lot photos, PDF uploads |
| **Maps** | Google Maps Platform | Best satellite imagery for Philippines |
| **Search** | Google Places API | Finds every PH barangay |
| **CDN + Security** | Cloudflare | Free DDoS protection, worldwide |
| **Domain + DNS** | Cloudflare DNS (xmodx.com) | Already yours |
| **SSL certificate** | Cloudflare + Vercel | Auto HTTPS, no config needed |
| **Email (future)** | Resend | Free 3K emails/month, then cheap |
| **Code hosting** | GitHub (G33M0D) | Your code, your repo |
| **AI dev assistant** | Claude Code (Anthropic) | How I build this quickly |

---

## 10. Next Steps — No Pressure

1. **Use the demo** for a week or two at https://lotview.xmodx.com. Post a sample lot. Send the link to a few OFW friends and see what they say.
2. **Reply with which features you want** (from Section 4). No need to pick everything — even just 1–2 features is fine.
3. **Pick a maintenance option** (A, B, or C) — or skip and just pay per-fix.
4. **Prepare a GCash/Maya virtual card** so we can upgrade services when traffic grows.
5. **Rebrand to Panay Land** — we'll update the logo, domain, and watermark once you approve.

**Nothing else for now.** No upfront signing fees, no contracts. You commit when you're ready.

---

## Summary Card

| | Cost |
|--|------|
| **The working platform (yours to use now)** | FREE |
| **Hosting months 1–6 (realistic traffic)** | FREE |
| **Hosting months 7–12 (if moderate growth)** | ~₱2,000/mo |
| **Starter Pack features (recommended)** | ₱26,000 one-time |
| **Basic retainer** | ₱8,000/mo (optional) |
| **Claude Code Pro** | ~₱1,150/mo during active dev (optional) |
| **Bug fixes without retainer** | ₱2,500 each |

**Minimum to start: ₱0. You can use the platform today.**
**Recommended budget: ₱26,000 one-time + ₱8,000/mo if you want peace of mind.**

---

Contact me anytime: **gm.agreda@gmail.com / 0918 262 4068**

Salamat, Nicson. Looking forward to helping you move lots in Tibiao.

— GM
