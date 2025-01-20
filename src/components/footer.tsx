import Image from "next/image";
import logo from "../app/public/logo.svg";
import Button from "./button";
import "./footer.scss";
import linuxIcon from "../app/public/OSIcons/linux.svg";
import macIcon from "../app/public/OSIcons/mac.svg";
import windowsIcon from "../app/public/OSIcons/windows.svg";

export default function Footer() {
  return (
    <footer className="sectionPadded rowCollapsible centerRow spaceBetween gapLarge bg1To2">

      <div className="column gapSmall centerColumn">
      <header className="row gapSmall centerColumn">
        <Image src={logo} alt="icon" className="footerLogo" />
        <h1 className="textMedium headerSmall">Laptop Deals</h1>
      </header>
      <h3 className="textSmall textSlightTransparent">From Marvin Media Group</h3>
      </div>

      <div className="row flexWrap gapLarge centerRow">
        <div className="column gapSmall">
          <h2 className="textMedium headerSmall">Categories</h2>
          <Button linkTo="discover" className="textGlowButton">
            <h3 className="textSmall">Top Picks</h3>
          </Button>
          <Button linkTo="discover" className="textGlowButton">
            <h3 className="textSmall">For Students</h3>
          </Button>
          <Button linkTo="discover" className="textGlowButton">
            <h3 className="textSmall">For Programmers</h3>
          </Button>
          <Button linkTo="discover" className="textGlowButton">
            <h3 className="textSmall">For Work</h3>
          </Button>
        </div>
        <div className="column gapSmall">
          <h2 className="textMedium headerSmall">Operating Systems</h2>
          <Button linkTo="discover" className="textGlowButton">

            <Image src={macIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">macos</h3>
          </Button>
          <Button linkTo="discover" className="textGlowButton">
          <Image src={windowsIcon} alt="windows" className="osIcon" />
            <h3 className="textSmall">Windows</h3>
          </Button>
          <Button linkTo="discover" className="textGlowButton">
          <Image src={linuxIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">Linux</h3>
          </Button>
        </div>
      </div>
    </footer>
  );
}
