import Image from "next/image";
import logo from "../../public/logo.svg";
import Button from "./button";
import "./footer.scss";
import linuxIcon from "../../public/OSIcons/linux.svg";
import macIcon from "../../public/OSIcons/mac.svg";
import windowsIcon from "../../public/OSIcons/windows.svg";

export default function Footer() {
  return (
    <footer className="sectionPadded row flexWrap centerRow spaceBetween gapLarge">

      <div className="column gapSmall">
      <header className="row gapSmall centerColumn">
        <Image src={logo} alt="icon" className="footerLogo" />
        <h1 className="textMedium smallHeader">Laptop Deals</h1>
      </header>
      <h3>From Marvin Media Group</h3>
      </div>

      <div className="row flexWrap gapLarge centerRow">
        <div className="column gapSmall">
          <h2 className="textMedium smallHeader">Categories</h2>
          <Button linkTo="discover" classNames="textGlowButton">
            <h3 className="textSmall">Top Picks</h3>
          </Button>
          <Button linkTo="discover" classNames="textGlowButton">
            <h3 className="textSmall">For Students</h3>
          </Button>
          <Button linkTo="discover" classNames="textGlowButton">
            <h3 className="textSmall">For Programmers</h3>
          </Button>
          <Button linkTo="discover" classNames="textGlowButton">
            <h3 className="textSmall">For Work</h3>
          </Button>
        </div>
        <div className="column gapSmall">
          <h2 className="textMedium smallHeader">Operating Systems</h2>
          <Button linkTo="discover" classNames="textGlowButton">

            <Image src={macIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">MacOS</h3>
          </Button>
          <Button linkTo="discover" classNames="textGlowButton">
          <Image src={windowsIcon} alt="windows" className="osIcon" />
            <h3 className="textSmall">Windows</h3>
          </Button>
          <Button linkTo="discover" classNames="textGlowButton">
          <Image src={linuxIcon} alt="linux" className="osIcon" />
            <h3 className="textSmall">Linux</h3>
          </Button>
        </div>
      </div>
    </footer>
  );
}
