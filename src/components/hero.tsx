import Button from "./button";
import "./hero.scss";
import heroBg from "../../public/heroBg.webp";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="hero column centerRow gapLarge"
    >
      <div className="column gapLarge row centerColumn section">
        <div className="column gapSmall">
          <h1 className="textXLarge headerLarge slideIn">
            Let us Find You The Perfect Laptop
          </h1>
          <h2 className="textMedium slideIn">
            We provide you the information you need to find your next device
          </h2>
        </div>
        <div className="row flexWrap centerRow gapMedium">
          <Button className="buttonBg3 buttonBig slideIn" linkTo="/laptops">
            <span className="material-symbols-outlined">star</span>
            <h3 className="textMedium headerSmall">Top Picks</h3>
          </Button>
          <Button className="buttonPrimary buttonBig slideIn" linkTo="discover">
            <span className="material-symbols-outlined">conditions</span>
            <h3 className="textMedium headerSmall">Discover</h3>
          </Button>
        </div>
      </div>

      <Image alt="hero" src={heroBg} className="heroBg" priority={true} />
    </section>
  );
}
