import { generateFakeLaptopPreviews } from "@/components/fakeLaptopPreview";
import LaptopPreview from "@/components/laptopPreview";
import { Laptop, LaptopsOrder } from "@/types/laptop";

export default function Display({
  data,
  maxPreviews,
  isFetching,
}: {
  data: Laptop[];
  maxPreviews: number;
  isFetching: boolean;
}) {

  return (
    <>
      <div className="rowCollapsible flexWrap gapMedium centerRow">
        {data.map((previewData, i) => (
          <LaptopPreview key={i} args={{ data: data[i] }} />
        ))}
        {isFetching &&
          generateFakeLaptopPreviews(maxPreviews - data.length, "background2")}
      </div>
    </>
  );
}
