import Image from "next/image";
import logo from "../../public/logo.svg";
import Button from "./button";
import "./footer.scss";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";
import Link from "next/link";
import { LaptopsOrder } from "@/types/laptop";
import { useRouter } from "next/navigation";
import { queryOperatingSystemOnly, queryUseCaseOnly } from "@/utils/query";

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
          className="textXSmall textSlightTransparent"
        >
          From Marvin Media Group
        </Link>
      </div>

      <div className="row centerRow">
        <div className="rowCollapsible gapLarge">
          <div className="column gapSmall">
            <h2 className="textSmall headerSmall">General</h2>
            <Link href="/about" className="textXSmall button textGlowButton">
              About
            </Link>
            <Link
              href="/affiliate"
              className="textXSmall button textGlowButton"
            >
              Affiliate Disclosure
            </Link>
            <Link href="/discover" className="textXSmall button textGlowButton">
              Find me a laptop
            </Link>
            <Link href="/contact" className="textXSmall button textGlowButton">
              Contact
            </Link>
          </div>
          <div className="column gapSmall">
            <h2 className="textSmall headerSmall">By Use Case</h2>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forStudents"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Students</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forGaming"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Gaming</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forProgrammers"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Programming</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forOfficeWork"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Office Work</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryUseCaseOnly("forVideoEditing"),
              }}
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Video Editing</h3>
            </Link>
          </div>
          <div className="column gapSmall">
            <h2 className="textSmall headerSmall">Operating Systems</h2>
            <Link
              href={{
                pathname: "/laptops",
                query: queryOperatingSystemOnly("windows"),
              }}
              className="button textGlowButton"
            >
              <Image
                width={50}
                height={50}
                src={windowsIcon}
                alt="windows - footer"
                className="osIcon"
              />
              <h3 className="textXSmall">Windows</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryOperatingSystemOnly("macos"),
              }}
              className="button textGlowButton"
            >
              <Image
                width={50}
                height={50}
                src={macIcon}
                alt="macos - footer"
                className="osIcon"
              />
              <h3 className="textXSmall">macos</h3>
            </Link>
            <Link
              href={{
                pathname: "/laptops",
                query: queryOperatingSystemOnly("linux"),
              }}
              className="button textGlowButton"
            >
              <Image
                width={50}
                height={50}
                src={linuxIcon}
                alt="linux - footer"
                className="osIcon"
              />
              <h3 className="textXSmall">Linux</h3>
            </Link>
          </div>
          <div className="column gapSmall">
            <h2 className="textSmall headerSmall">Socials</h2>
            <Link
              href={{
                pathname: "https://marvinmedia.substack.com/publish/home",
              }}
              target="_blank"
              className="button textGlowButton"
            >
              <h3 className="textXSmall">Substack</h3>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
