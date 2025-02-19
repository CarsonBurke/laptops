import Link from "next/link";
import AdminLock from "./admin";

export default function Admin() {
  return (
    <main className="main">
      <section className="sectionPadded column gapMedium">
        <AdminLock />
        <div className="column background2 borderBg3 gapMedium paddingMedium">
          <h1 className="textLarge headerLarge textCenter">Admin Panel</h1>

          <div className="row flexWrap gapMedium centerRow">
            <Link href="/admin/laptop-upload" className="button buttonPrimary">
              <span className="material-symbols-outlined">laptop</span>
              Laptop upload
            </Link>
            <Link href="/admin/article-upload" className="button buttonPrimary">
              <span className="material-symbols-outlined">article</span>
              Article upload
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
