import Button from "./button";
import "./hero.scss";
import heroBg from "../../public/heroBg.jpg";

export default function Hero() {
  return (
    <section
      className="hero column centerRow gapLarge"
    >
      <div className="column gapLarge row centerColumn">
        <div className="column gapSmall section">
          <h1 className="textXLarge headerLarge textCenter">
            Let us Find You The Perfect Laptop
          </h1>
          <h2 className="textMedium">
            We provide you the information you need to find your next device
          </h2>
        </div>
        <div className="row gapMedium">
          <Button classNames="buttonBg3 buttonBig">
            <span className="material-symbols-outlined">star</span>
            <h3 className="textMedium headerSmall">Top Picks</h3>
          </Button>
          <Button classNames="buttonPrimary buttonBig" linkTo="discover">
            <span className="material-symbols-outlined">conditions</span>
            <h3 className="textMedium headerSmall">Discover</h3>
          </Button>
        </div>
      </div>

      <img src="heroBg.jpg" className="heroBg" />
    </section>
  );
}
