import Button from "./button";
import "./hero.scss";
import heroBg from "../../public/testHeroBg.png";
import emptyLaptop from "../../public/emptyLaptop.webp"
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="hero column centerRow gapLarge centerColumn"
    >
      <div className="column gapLarge row centerColumn section">
        <div className="column gapSmall">
          <h1 className="textXLarge headerLarge slideIn textWhite">
            Let us Find You The Perfect Laptop
          </h1>
          <h2 className="textMedium slideIn textWhite">
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

      <Image width={1000} height={600} alt="empty laptop" src={emptyLaptop} className="heroImage" priority={true} />

      {/* <Image alt="laptop background" src={heroBg} className="heroBg" priority={true} layout="responsive" /> */}
    </section>
  );
}
