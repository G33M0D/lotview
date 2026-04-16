"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, X, LayoutDashboard, GitCompare, LogIn, ChevronDown, Heart, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, isAdmin, isLoading, signOut } = useAuth();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Browse", icon: MapPin, show: true },
    { href: "/seller/dashboard", label: "Sell", icon: LayoutDashboard, show: isAdmin },
    { href: "/compare", label: "Compare", icon: GitCompare, show: true },
  ];

  const visibleLinks = navLinks.filter((link) => link.show);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white shadow-sm group-hover:bg-primary-dark transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Lot<span className="text-primary">View</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {visibleLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href === "/seller/dashboard" ? "/seller" : link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side: CTA + Auth + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* List Your Lot - admin only */}
            {isAdmin && (
              <Link
                href="/seller/create"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                List Your Lot
              </Link>
            )}

            {/* Auth section */}
            {!isLoading && (
              <>
                {user ? (
                  /* User dropdown */
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                        {avatarLetter}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-foreground max-w-[120px] truncate">
                        {displayName}
                      </span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                        <div className="px-4 py-3 border-b border-border">
                          <p className="text-sm font-medium text-foreground truncate">{displayName}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        {isAdmin ? (
                          <Link
                            href="/admin"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <Shield className="w-4 h-4 text-muted-foreground" />
                            Admin Panel
                          </Link>
                        ) : (
                          <Link
                            href="/favorites"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors"
                          >
                            <Heart className="w-4 h-4 text-muted-foreground" />
                            My Favorites
                          </Link>
                        )}
                        <button
                          onClick={async () => {
                            setDropdownOpen(false);
                            await signOut();
                          }}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-foreground hover:bg-muted transition-colors border-t border-border"
                        >
                          <LogOut className="w-4 h-4 text-muted-foreground" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Sign In button */
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Link>
                )}
              </>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 space-y-1">
            {visibleLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href === "/seller/dashboard" ? "/seller" : link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile auth items */}
            {!isLoading && user && (
              <>
                {isAdmin ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Shield className="w-5 h-5" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    href="/favorites"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    My Favorites
                  </Link>
                )}
              </>
            )}

            <div className="pt-2 pb-1">
              {!isLoading && (
                <>
                  {isAdmin && (
                    <Link
                      href="/seller/create"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      List Your Lot
                    </Link>
                  )}
                  {user ? (
                    <button
                      onClick={async () => {
                        setMobileOpen(false);
                        await signOut();
                      }}
                      className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                  )}
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
