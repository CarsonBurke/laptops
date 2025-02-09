import Image from "next/image";
import logo from "../../public/logo.svg";
import Button from "./button";
import "./footer.scss";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";
import Link from "next/link";
import { LaptopsOrder } from "@/types/laptop";

export default function Footer() {
  return (
    <footer className="sectionPadded rowCollapsible centerRow spaceBetween gapLarge bg1To2">
      <div className="column gapSmall centerColumn">
        <header className="row gapSmall centerColumn">
          <Image src={logo} alt="icon" className="footerLogo" />
          <h1 className="textMedium headerSmall">Laptop Deals</h1>
        </header>
        <Link
          href="https://marvinmediagroup.com"
          className="textSmall textSlightTransparent"
        >
          From Marvin Media Group
        </Link>
      </div>

      <div className="row flexWrap gapLarge centerRow">
        <div className="column gapSmall">
          <h2 className="textMedium headerSmall">General</h2>
          <Link href="/affiliate" className="textSmall button textGlowButton">
            Affiliate Disclosure
          </Link>
          <Link href="/discover" className="textSmall button textGlowButton">
            Find me a laptop
          </Link>
          <Link href="/contact" className="textSmall button textGlowButton">
            Contact
          </Link>
        </div>
        <div className="column gapSmall">
          <h2 className="textMedium headerSmall">Categories</h2>
          <Link
            href={{
              pathname: "/laptops",
              query: { order: LaptopsOrder.BestDeal },
            }}
            className="button textGlowButton"
          >
            <h3 className="textSmall">Top deals</h3>
          </Link>
          <Link
            href={{
              pathname: "/laptops",
              query: {
                forStudents: true,
                forGaming: false,
                forProgrammers: false,
                forOfficeWork: false,
                forVideoEditing: false,
              },
            }}
            className="button textGlowButton"
          >
            <h3 className="textSmall">Students</h3>
          </Link>
          <Link
            href={{
              pathname: "/laptops",
              query: {
                forProgrammers: true,
                forStudents: false,
                forGaming: false,
                forOfficeWork: false,
                forVideoEditing: false,
              },
            }}
            className="button textGlowButton"
          >
            <h3 className="textSmall">Programmers</h3>
          </Link>
          <Link
            href={{
              pathname: "/laptops",
              query: {
                forOfficeWork: true,
                forStudents: false,
                forGaming: false,
                forProgrammers: false,
                forVideoEditing: false,
              },
            }}
            className="button textGlowButton"
          >
            <h3 className="textSmall">Office work</h3>
          </Link>
          <Link
            href={{
              pathname: "/laptops",
              query: {
                forVideoEditing: true,
                forStudents: false,
                forGaming: false,
                forProgrammers: false,
                forOfficeWork: false,
              },
            }}
            className="textSmall button textGlowButton"
          >
            Video editing
          </Link>
        </div>
        <div className="column gapSmall">
          <h2 className="textMedium headerSmall">Operating Systems</h2>
          <Link href="discover" className="button textGlowButton">
            <Image src={windowsIcon} alt="windows" className="osIcon" />
            <h3 className="textSmall">Windows</h3>
          </Link>
          <Link href="discover" className="button textGlowButton">
            <Image src={macIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">macos</h3>
          </Link>
          <Link href="discover" className="button textGlowButton">
            <Image src={linuxIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">Linux</h3>
          </Link>
        </div>
      </div>
    </footer>
  );
}
