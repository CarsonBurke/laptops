import { generateFakeLaptopPreviews } from "@/components/fakeLaptopPreview";
import LaptopPreview from "@/components/laptopPreview";
import { Laptop } from "@/types/db";

export default function Display({
  data,
  isLoading,
}: {
  data: Laptop[];
  isLoading: boolean;
}) {
  // if (!isLoading) {
    let previews = []

    for (let i = 0; i < data.length; i++) {
        previews.push(<LaptopPreview key={i} args={data[i]} />)
    }
    return previews
  // }

  return generateFakeLaptopPreviews(12, "background2");
}
