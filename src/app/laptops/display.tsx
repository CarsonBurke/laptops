import { generateFakeLaptopPreviews } from "@/components/fakeLaptopPreview";
import LaptopPreview from "@/components/laptopPreview";
import { Laptop } from "@/types/db";

export default function Display({
  data,
  maxPreviews,
  isFetching,
}: {
  data: Laptop[];
  maxPreviews: number;
  isFetching: boolean;
}) {
  // if (!isLoading) {
  let previews = [];

  for (let i = 0; i < data.length; i++) {
    previews.push(<LaptopPreview key={i} args={data[i]} />);
  }
  /* return previews */
  // }

  /* return generateFakeLaptopPreviews(12, "background2"); */

  return (
    <>
      <div className="rowCollapsible flexWrap gapMedium centerRow centerColumn">
        {previews}
        {isFetching && generateFakeLaptopPreviews(maxPreviews - data.length, "background2")}
      </div>
    </>
  );
}
