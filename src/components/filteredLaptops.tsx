"use client"
import LaptopPreview, { generateLaptopPreviews } from "./laptopPreview";
import { trpc } from "@/lib/trpc";
import { Laptop, LaptopsOrder } from "@/types/db";
import { generateFakeLaptopPreviews } from "./fakeLaptopPreview";

interface FilteredLaptopsArgs {
  maxLaptops: number;
  background: string;
  order: LaptopsOrder;
  forStudents?: boolean;
  forGaming?: boolean;
  forProgrammers?: boolean;
  forWork?: boolean;
}

export default function FilteredLaptops({
  args,
}: {
  args: FilteredLaptopsArgs;
}) {

  const { data, isLoading } = trpc.getLaptops.useQuery({
    order: args.order,
    minPrice: 0,
    maxPrice: Number.MAX_SAFE_INTEGER,
    macos: true,
    windows: true,
    linux: true,
    forStudents: args.forStudents == undefined ? true : args.forStudents,
    forGaming: args.forGaming == undefined ? true : args.forGaming,
    forProgrammers: args.forProgrammers == undefined ? true : args.forProgrammers,
    forWork: args.forWork == undefined ? true : args.forWork,
    minSize: 0,
    maxSize: Number.MAX_SAFE_INTEGER,
    minResolution: 0,
    maxResolution: Number.MAX_SAFE_INTEGER,
    minMemory: 0,
    maxMemory: Number.MAX_SAFE_INTEGER,
    minStorage: 0,
    maxStorage: Number.MAX_SAFE_INTEGER,
    minCores: 0,
    maxCores: Number.MAX_SAFE_INTEGER,
    minCpuFrequency: 0,
    maxCpuFrequency: Number.MAX_SAFE_INTEGER,
    offset: 0,
    limit: args.maxLaptops,
  });

  if (isLoading) {
    return generateFakeLaptopPreviews(args.maxLaptops, args.background);
  }

  let previews = [];

  for (let i = 0; i < (data as any).length; i++) {
    previews.push(<LaptopPreview key={i} args={{data: (data as any)[i], color: args.background}} />);
  }

  return previews;
}
