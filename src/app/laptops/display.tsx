import { generateFakeLaptopPreviews } from "@/components/fakeLaptopPreview";
import LaptopPreview from "@/components/laptopPreview";
import { Laptop } from "@/types/db";

export default function Display({
  data,
  isFetching,
}: {
  data: Laptop[];
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
    <div className="rowCollapsible flexWrap gapMedium centerRow centerColumn">{previews}

    </div>
      
      {isFetching ? <h2 className="textMedium headerSmall textCenter">Fetching more laptops</h2> : <></>}
    </>
  );
}
