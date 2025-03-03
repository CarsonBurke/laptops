"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="main">
      <section className="sectionPadded column">
        <div className="gapSmall">
          <h2 className="textLarge">Error!</h2>
          <p className="textSmall">
            This page had trouble loading. Sorry about that. Please try refreshing the page, or return home.
          </p>
          <Link href="">Return home</Link>
        </div>
      </section>
    </main>
  );
}
