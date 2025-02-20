"use client";

import LaptopPreview, { generateLaptopPreviews, LaptopPreviewData } from "./laptopPreview";
import { trpc } from "@/lib/trpc";
import { Laptop, LaptopsOrder } from "@/types/laptop";
import { generateFakeLaptopPreviews } from "./fakeLaptopPreview";

interface SimilarLaptopsArgs {
  blacklistId: string;
  limit: number;
  background: string;
  order: LaptopsOrder;
  macos: boolean;
  windows: boolean;
  linux: boolean;
  forStudents?: boolean;
  forGaming?: boolean;
  forProgrammers?: boolean;
  forWork?: boolean;
  forVideoEditing?: boolean;
}

export default function SimilarLaptops({ args }: { args: SimilarLaptopsArgs }) {
  const { data, isLoading } = trpc.getLaptopsWithoutId.useQuery({
    order: args.order,
    macos: args.macos,
    windows: args.windows,
    linux: args.linux,
    forStudents: args.forStudents == undefined ? true : args.forStudents,
    forGaming: args.forGaming == undefined ? true : args.forGaming,
    forProgrammers:
      args.forProgrammers == undefined ? true : args.forProgrammers,
    forOfficeWork: args.forWork == undefined ? true : args.forWork,
    forVideoEditing:
      args.forVideoEditing == undefined ? true : args.forVideoEditing,
    limit: args.limit,
    blacklistId: args.blacklistId,
  });

  if (isLoading) {
    return generateFakeLaptopPreviews(args.limit, args.background);
  }

  if (!data || data.length == 0) {
    return <h2 className="textMedium headerSmall">No similar laptops 😳</h2>;
  }

  return data.map((previewData, i) => {
    return (
      <LaptopPreview
        key={i}
        args={{ data: previewData as any as LaptopPreviewData, color: args.background }}
      />
    );
  });
}
