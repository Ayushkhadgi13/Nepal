import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "The Living Nepal — An Archival Ascent",
  description: "A continuous altitude expedition journal documented on authentic Lokta paper.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased select-none">
        {/* Procedural SVG displacement nodes for paper fibers and ink-bleeding */}
        <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="inkBleedFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}