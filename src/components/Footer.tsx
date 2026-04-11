import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Lot<span className="text-primary">View</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Find your perfect lot in Panay, Philippines. Browse listings
              across Iloilo, Aklan, Capiz, and Antique.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Lots
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  For Sellers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Panay Island, Western Visayas
              <br />
              Philippines
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} LotView. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
