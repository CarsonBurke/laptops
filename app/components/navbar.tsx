"use client";

import "./navbar.scss";
import { Dropdown } from "./Dropdown";
import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { Media } from "../media";

export function Navbar() {
  return (
    <>
      <nav className="navbarTop row spaceBetween centerColumn">
        <div className="navbarTopChild row spaceBetween centerColumn">
          <div className="row gapMedium">
            <Link href="/">
              <header className="row centerColumn gapSmall navbarHeader defaultTransition">
                {/* <img src="./assets/lettuce.svg" className="navbarIcon" /> */}
                <Image src={logo} alt="icon" className="navbarIcon" />
              </header>
            </Link>
          </div>

          <div className="row centerColumn navbarTopCenter">
            <Link
              href="/"
              className="smallHeader paddingMedium navbarLink button textGlowButton textSmall md:hidden gapSmall row desktop"
            >
              <span className="material-symbols-outlined">star</span>
              Top Picks
            </Link>

            <Link
              href="/"
              className="smallHeader paddingMedium navbarLink button textGlowButton textSmall md:hidden gapSmall row desktop"
            >
              <span className="material-symbols-outlined">school</span>
              For Students
            </Link>

            <Link
              href="/"
              className="smallHeader paddingMedium navbarLink button textGlowButton textSmall md:hidden gapSmall row desktop"
            >
              <span className="material-symbols-outlined">laptop_mac</span>
              For Programmers
            </Link>

            <Link
              href="/"
              className="smallHeader paddingMedium navbarLink button textGlowButton textSmall md:hidden gapSmall row desktop"
            >
              <span className="material-symbols-outlined">work</span>
              For Work
            </Link>
          </div>

          <div className="row centerRow centerColumn background1 borderBg4 defaultBorderRadius">
            <button className="button buttonPrimary smallHeader textSmall navbarTopSearchButton desktop">
              <span className="material-symbols-outlined">search</span>
            </button>
            <input
              className="input background1 textXSmall navbarTopSearchInput desktop"
              placeholder="Search recipe or item"
            />
            <Link
              href="/recipes"
              className="navbarTopMobileSearchButton button buttonPrimary smallHeader textSmall mobile"
            >
              <span className="material-symbols-outlined">search</span>
            </Link>
          </div>

          <Button
            id="navbarTopSidebarButton"
            classNames="textLarge button buttonBg3 navbarTopSidebarButton mobile"
            onClick={(event) => openCloseSidebar(event.target)}
          >
            <span
              id="navbarTopSidebarButtonIcon"
              className="material-symbols-outlined"
            >
              menu
            </span>
          </Button>

          {/* <Button linkTo="unset" classNames="md:hidden buttonPrimary textSmall smallHeader">
            Newsletter
          </Button> */}
        </div>
      </nav>
      <div
        className="navbarSidebar background1 mobile hidden"
        id="navbarSidebar"
      >
        <div className="navbarSidebarChild column gapSmall background2 defaultBorderRadius">
          <Link
            href="/"
            className="smallHeader paddingMedium navSidebarLink button textGlowButton textSmall"
          >
            Featured
          </Link>
          <Link
            href="/recipes"
            className="smallHeader paddingMedium navSidebarLink button textGlowButton textSmall"
          >
            Meals
          </Link>
          <Link
            href="/recipes"
            className="smallHeader paddingMedium navSidebarLink button textGlowButton textSmall"
          >
            Diets
          </Link>
          <Link
            href="/recipes"
            className="smallHeader paddingMedium navSidebarLink button textGlowButton textSmall"
          >
            Cousines
          </Link>
        </div>
      </div>
    </>
  );
}

function openCloseSidebar(target: EventTarget) {
  let button = document.getElementById("navbarTopSidebarButton");
  if (!button) {
    throw new Error("button not found");
  }

  let icon = document.getElementById("navbarTopSidebarButtonIcon");
  if (!icon) {
    throw new Error("icon not found");
  }

  if (icon.innerHTML === "menu") {
    icon.innerHTML = "close";
    button.classList.add("navbarTopSidebarButtonActive");
  } else {
    icon.innerHTML = "menu";
    button.classList.remove("navbarTopSidebarButtonActive");
  }

  let navbarSidebar = document.getElementById("navbarSidebar");
  if (!navbarSidebar) {
    throw new Error("navbarSidebar not found");
  }

  navbarSidebar.classList.toggle("hidden");
}
