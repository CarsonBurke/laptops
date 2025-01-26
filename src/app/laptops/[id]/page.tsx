"use client";

import { trpc } from "@/lib/trpc";
import LaptopView from "./laptop";
import * as React from "react";
import "./page.scss"
import { LaptopsOrder } from "@/types/db";
import FilteredLaptops from "@/components/FilteredLaptops";

export default function Laptop({ params }: { params: { id: string } }) {

    const { id } = React.use(params as any) as { id: string };

  let { data, isLoading } = trpc.getLaptopByName.useQuery({
    name: id.replaceAll("%20", " "),
  });

  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column background2 defaultBorderRadius">
          {isLoading ? (
            <h1 className="textLarge headerLarge paddingMedium textCenter">Loading...</h1>
          ) : (
            <LaptopView data={(data as any)[0]} />
          )}
        </div>
      </section>
      <section className="section">
          <div className="column defaultBorderRadius">
              <h1 className="textLarge headerLarge paddingMedium textCenter">Similar Laptops</h1>

          <div className="row flexWrap gapMedium centerRow width100">
            <FilteredLaptops args={{ maxLaptops: 12, background: "background3", order: LaptopsOrder.BestDeal }} />
          </div>
          </div>
      </section>
    </main>
  );
}
