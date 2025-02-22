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

const defaultTitle = "Laptop Deals - Find your next device for the best deal";
const defaultDescription =
  "Find the best deals on new laptops for students, gaming, programmers, office work, video editing and more. Get laptops and macbooks with windows, macos and linux for the lowest price.";

export const metadata: Metadata = {
  title: {
    template: "%s | Laptop Deals",
    default: defaultTitle,
  },
  description: defaultDescription,
  keywords:
    "Laptops, Macbooks, Computers, PCs, Personal, Best computer, cheap computer, cheap laptop, budget laptop, best laptop, student laptop, gaming laptop, programming laptop, office laptop, video editing laptop, intel, amd, nvidia",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    url: "laptops.marvinmediagroup.com",
    type: "website",
    title: defaultTitle,
    siteName: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url:
          (process.env.NEXT_PUBLIC_SITE_URL ||
            "https://www.laptops.marvinmediagroup.com") + "/logo.svg",
      },
    ],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.laptops.marvinmediagroup.com"
  ),
  alternates: {
    canonical: "/",
  },
};

import { Inter } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const root = async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LayoutHead />
      <body className={`${inter.className} antialiased`}>
        <TRPCProviders>
          <LayoutBody children={children} />
        </TRPCProviders>
      </body>
    </html>
  );
};

export default root; /* trpc.withTRPC(root) */
