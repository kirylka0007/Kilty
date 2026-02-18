import Link from "next/link";
import Container from "./Container";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <Container>
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-bold">{siteConfig.siteName}</p>
            <p className="mt-1 text-sm text-grey-mid">
              Live social deduction events in Edinburgh &amp; Glasgow
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-sm text-grey-light transition-colors hover:text-white"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-light transition-colors hover:text-white"
                aria-label="Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href={siteConfig.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-grey-light transition-colors hover:text-white"
                aria-label="Telegram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-grey-dark pt-8 text-center">
          <p className="text-xs text-grey-mid">
            &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/" className="text-xs text-grey-mid transition-colors hover:text-white">
              Home
            </Link>
            <Link href="/signup" className="text-xs text-grey-mid transition-colors hover:text-white">
              Sign Up
            </Link>
            <Link href="/photos" className="text-xs text-grey-mid transition-colors hover:text-white">
              Photos
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
