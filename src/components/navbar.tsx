"use client";

import "./navbar.scss";
import { Dropdown } from "./Dropdown";
import Link from "next/link";
import Button from "./button";
import Image from "next/image";
import logo from "../app/public/logo.svg";
import CycleText from "./cycleText";

export function Navbar() {
  return (
    <>
      <nav className="navbarTop row spaceBetween centerColumn">
        <div className="navbarTopChild row spaceBetween centerColumn">
          <div className="row gapMedium">
            <Link href="/">
              <header className="row centerColumn gapSmall navbarHeader defaultTransition">

                <Image src={logo} alt="icon" className="navbarIcon" />
              </header>
            </Link>
          </div>

          <div className="row gapMedium centerColumn navbarTopCenter desktop">
            <Link
              href="laptops"
              className="headerSmall paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
            >
              <span className="material-symbols-outlined">star</span>
              Best Deals
            </Link>

            <Dropdown
              header={
                <div className="row gapSmall centerColumn">
                  <h3 className="textSmall headerSmall">For</h3>
                  <CycleText
                    cycles={["Students", "Programmers", "Gaming", "Work"]}
                  >
                    Students
                  </CycleText>

                  <span className="material-symbols-outlined">
                    keyboard_arrow_down
                  </span>
                </div>
              }
            >
              <Link
                href="/"
                className="paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
              >
                <span className="material-symbols-outlined">school</span>
                Students
              </Link>

              <Link
                href="/"
                className="paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
              >
                <span className="material-symbols-outlined">laptop_mac</span>
                Programmers
              </Link>

              <Link
                href="/"
                className="paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
              >
                <span className="material-symbols-outlined">
                  sports_esports
                </span>
                Gaming
              </Link>

              <Link
                href="/"
                className="paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
              >
                <span className="material-symbols-outlined">work</span>
                Work
              </Link>
            </Dropdown>

            <Link
              href="/articles"
              className="paddingMedium navbarLink button textGlowButton textSmall gapSmall row"
            >
              <span className="material-symbols-outlined">article</span>
              Articles
            </Link>
          </div>

          {/* <div className="row centerRow centerColumn background1 borderBg4 defaultBorderRadius desktop">
            <label htmlFor="searchInput" className="button buttonSecondary headerSmall textSmall paddingSmall">
              <span className="material-symbols-outlined">search</span>
            </label>
            <input id="searchInput"
              className="input background1 textSmall"
              placeholder="Search"
            />
          </div> */}

          <div className="row gapSmall">
            <Link
              href="/recipes"
              className="navbarTopMobileSearchButton button buttonBg3 headerSmall textSmall"
            >
              <span className="material-symbols-outlined">search</span>
            </Link>
            <Button
              id="navbarTopSidebarButton"
              className="textLarge button buttonBg3 navbarTopSidebarButton mobile"
              onClick={() => openCloseSidebar()}
            >
              <span
                id="navbarTopSidebarButtonIcon"
                className="material-symbols-outlined"
              >
                menu
              </span>
            </Button>
          </div>

          {/* <Button linkTo="unset" classNames="buttonPrimary textSmall headerSmall">
            Newsletter
          </Button> */}
        </div>
      </nav>
      <div
        className="navbarSidebar background1 mobile invisible"
        id="navbarSidebar"
      >
        <div className="navbarSidebarChild column gapSmall background2 defaultBorderRadius" onClick={() => openCloseSidebar()}>
          <Button
            linkTo="/laptops"
            className="headerSmall paddingMedium navSidebarLink textGlowButton textSmall width100"
          >
            Featured
          </Button>
          <Link
            href="/recipes"
            className="headerSmall paddingMedium navSidebarLink textGlowButton textSmall"
          >
            Meals
          </Link>
          <Link
            href="/recipes"
            className="headerSmall paddingMedium navSidebarLink textGlowButton textSmall"
          >
            Diets
          </Link>
          <Link
            href="/recipes"
            className="headerSmall paddingMedium navSidebarLink textGlowButton textSmall"
          >
            Cousines
          </Link>
        </div>
      </div>
    </>
  );
}

function openCloseSidebar() {
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

  navbarSidebar.classList.toggle("invisible");
}
