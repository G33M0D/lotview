# LotView

Interactive land listing platform for Panay, Philippines. Buyers can browse lots on a satellite map with polygon overlays, compare properties side by side, and send inquiries. Sellers can create listings with drawn lot boundaries and manage their portfolio.

**Live Demo:** https://lotview-rho.vercel.app

## Features

- Google Maps satellite view with lot polygon overlays
- Filter by municipality, price, area, and status
- Side-by-side lot comparison (up to 3 lots)
- Currency converter for OFW buyers (USD, AED, SGD, EUR, etc.)
- QR code and link sharing
- Seller dashboard with inquiry management
- 5-step listing creation wizard with polygon drawing
- Responsive design for laptop, tablet, and mobile

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Maps:** Google Maps JavaScript API
- **Geometry:** Turf.js
- **Hosting:** Vercel (free tier)

---

## How to Use — Seller Guide

### Step 1: Go to the Seller Dashboard

Click **"Sell"** in the navigation bar or go to `/seller/dashboard`.

You'll see an overview of your listings, total inquiries, and recent buyer messages.

### Step 2: Create a New Listing

Click **"Create New Listing"** to start the 5-step wizard.

#### Step 1 of 5 — Location

- The map opens in satellite view centered on Panay
- Use the **drawing tool** to draw your lot boundary on the map
- Click points to form the polygon shape of your lot
- The area (in sqm) is calculated automatically
- Use the **"Locate"** button to center the map on your current location
- Use **"Clear"** to redraw if needed

#### Step 2 of 5 — Details

Fill in the lot information:
- **Title** — a short name for the listing (e.g., "Prime Residential Lot in Jaro")
- **Description** — detailed description to attract buyers
- **Municipality** — select from the dropdown
- **Barangay** — type the barangay name
- **Price (PHP)** — the asking price in Philippine Pesos
- **Title Type** — select TCT, OCT, or Tax Declaration
- **Zoning** — e.g., Residential, Agricultural, Commercial
- **Road Access** — describe the nearest road
- **Utilities** — check which are available (Electricity, Water, Internet, Sewage)
- **Boundary Confidence** — select "Approximate" if drawn from a sketch, or "Survey-based" if from a licensed surveyor

#### Step 3 of 5 — Documents

Check which documents you have available:
- Land Title (TCT/OCT)
- Tax Declaration
- Lot Plan
- Survey Plan
- Deed of Sale

Buyers will see which documents are available before inquiring.

#### Step 4 of 5 — Photos

Upload photos of the property:
- Click or drag to upload
- Multiple photos supported
- Photos with GPS data will be checked against the lot location

#### Step 5 of 5 — Review

Review all your listing details:
- Map preview showing your drawn polygon
- All details, documents, and photos summarized
- Click **"Publish Listing"** to make it live

### Step 3: Manage Inquiries

Back on the dashboard, you'll see:
- Inquiry count per listing
- Recent inquiries with buyer name, message, and date
- Status tracking (New / Responded / Closed)

---

## How to Use — Buyer Guide

### Step 1: Browse Lots

Go to the **home page** (click "Browse" in the nav).

You'll see:
- **Left side:** Filters and listing cards
- **Right side:** Satellite map with lot polygons

#### Using Filters

- **Municipality** — filter by location (Iloilo City, Oton, Pavia, etc.)
- **Price Range** — set min/max in PHP
- **Lot Area** — set min/max in sqm
- **Status** — show Available, Reserved, and/or Sold lots

The map and listing cards update as you filter.

#### Using the Map

- Lots appear as **colored polygons** on the satellite map:
  - **Green** = Available
  - **Amber** = Reserved
  - **Red** = Sold
- Click a polygon to see a popup with the lot name, area, price, and a link to view details
- Switch between Map and Satellite views

### Step 2: View Lot Details

Click a listing card or the "View Details" link on the map popup.

The detail page shows:
- **Satellite map** with the lot polygon drawn to scale
- **Lot metrics:** area in sqm, hectares, and "basketball courts" for easy visualization
- **Price** with currency converter (USD, AED, SGD, EUR, etc.)
- **Property details:** title type, zoning, road access, utilities
- **Hazard flags:** flood or landslide warnings (if any)
- **Document checklist:** see which documents the seller has ready
- **Photos** of the property

### Step 3: Compare Lots

Click **"Compare"** in the nav to compare up to 3 lots side by side.

The comparison table highlights the best value in each row:
- Cheapest price (highlighted in green)
- Largest area
- Lowest price per sqm

### Step 4: Send an Inquiry

On any lot detail page, scroll to the **inquiry form**:
1. Enter your name, phone number, and email
2. Write a message to the seller
3. Click **Submit Inquiry**

The seller will receive your message and can respond.

### Step 5: Share with Family

Use the **Share** section on any lot detail page:
- **Copy Link** — copy the listing URL to share via chat or email
- **QR Code** — scan or save to share
- **Share with Family** — send via your device's share menu (WhatsApp, Viber, Messenger, etc.)

---

## Development

### Prerequisites

- Node.js 18+
- Google Maps API key

### Setup

```bash
git clone https://github.com/G33M0D/lotview.git
cd lotview
npm install
```

Create `.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Run

```bash
npm run dev
```

Open http://localhost:3000

### Deploy

The app is deployed on Vercel. Push to `main` to auto-deploy, or:

```bash
vercel --prod
```
