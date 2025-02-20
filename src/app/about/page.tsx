import Markdown from "react-markdown";

const content = `
Our focus is on providing the best, no-nonsense laptops for your needs. We provide advanced filtering tools to find laptops based on their use cases, specifications, and user recommendations
`;

export default function About() {
  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column centerColumn">
          <h1 className="textLarge headerLarge textCenter">About</h1>
          <Markdown className="textSlightTransparent column gapMedium">
            {content}
          </Markdown>
        </div>
      </section>
    </main>
  );
}
