import { generateArticlePreviews } from "../../components/fakeArticlePreview";
import "./page.scss";
import image from "../../../public/heroBg.jpg";
import Image from "next/image";

export default function Article() {
  return (
    <main className="main">
      <section className="sectionPadded rowCollapsible gapLarge centerRow">
        <div className="column paddingMedium background2 defaultBorderRadius gapLarge article">
          <article className="column gapMedium">
            <h1 className="textLarge headerLarge textCenter">
              This is the title of the article
            </h1>

            <div className="paddingMediumSides">
              <h2 className="textSmall headerSmall">By Carson Burke</h2>
              <p className="textSmall textSlightTransparent">4 minutes ago</p>
            </div>

            <Image src={image} alt="article image" className="articleImage defaultBorderRadius" />
            <p className="textSmall paddingMediumSides">Content of the article</p>
            {generateArticlePreviews(1, "background3")}
            <p className="textSmall paddingMediumSides">More content of the article</p>
          </article>
        </div>
        <div className="column gapMedium">
          {generateArticlePreviews(12, "background2")}
        </div>
      </section>
    </main>
  );
}
