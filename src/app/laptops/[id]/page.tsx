"use client";

import { trpc } from "@/lib/trpc";
import LaptopView from "./laptop";
import * as React from "react";
import "./page.scss";
import { LaptopsOrder } from "@/types/laptop";
import FilteredLaptops from "@/components/filteredLaptops";
import { underscoresToSpaces } from "@/utils/units";
import Loading from "@/components/loadingSpinner";

export default function Laptop({ params }: { params: Promise<any> }) {
  const { id } = React.use(params as any) as { id: string };
  
  let { data, isLoading } = trpc.getLaptopByName.useQuery({
    id: id,
  });

  return (
    <main className="main">
      <section className="sectionPadded">
          {isLoading ? (
            <Loading color={2} />
          ) : (
            <LaptopView data={data as any} />
          )}
      </section>
      <section className="section">
        <div className="column defaultBorderRadius">
          <h1 className="textLarge headerLarge paddingMedium textCenter">
            Similar Laptops
          </h1>

          <div className="row flexWrap gapMedium centerRow width100">
            <FilteredLaptops
              args={{
                maxLaptops: 12,
                background: "background3",
                order: LaptopsOrder.BestDeal,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
