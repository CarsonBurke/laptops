import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LayoutBody } from "./layoutBody";

import "./styles/index.scss";
import "./styles/layout.scss";
import "./styles/spacing.scss";
import "./styles/buttons.scss";
import "./styles/sizings.scss";
import "./styles/color.scss";
import "./styles/text.scss";
import { LayoutHead } from "./layoutHead";
import { TRPCProviders } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Laptop Deals",
    default: "Laptop Deals - Find your next device",
  },
  description: "Laptop deals finds the best deals on new laptops for students, gaming, programmers, office work, video editing and more.",
  keywords:
    "Laptops, Macbooks, Computers, PCs, Personal, Best computer, cheap computer, cheap laptop, budget laptop, best laptop, student laptop, gaming laptop, programming laptop, office laptop, video editing laptop, intel, amd, nvidia",
};

const root = async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <LayoutHead />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCProviders>
          <LayoutBody children={children} />
        </TRPCProviders>
      </body>
    </html>
  );
};

export default root; /* trpc.withTRPC(root) */
