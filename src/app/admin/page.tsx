import Link from "next/link";

export default function Admin() {
  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column background2 borderBg3 gapMedium paddingMedium">
          <h1 className="textLarge textCenter">Admin</h1>

          <div className="row flexWrap gapMedium centerRow">
            <Link href="/admin/laptop-upload" className="button buttonPrimary">
              Laptop upload
            </Link>
            <Link
              href={"/admin/article-upload"}
              className="button buttonPrimary"
            >
              Article upload
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
