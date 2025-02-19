export interface Laptop {
  id: string;
  name: string;
  price: number;
  saleOf: number;
  macos: boolean;
  windows: boolean;
  linux: boolean;
  size: number;
  resolution: number;
  ram: number;
  storage: number;
  cores: number;
  topFrequency: number;
  titleImageId: string;
  forStudents: boolean;
  forGaming: boolean;
  forProgrammers: boolean;
  forOfficeWork: boolean;
  forVideoEditing: boolean;
  studentScore: number;
  gamingScore: number;
  programmingScore: number;
  officeWorkScore: number;
  videoEditingScore: number;
  cpuName: string;
  gpuName: string;
  affiliate: string;
  vram: number;
  hasDedicatedGpu: boolean;
  storageName: string,
  displayName: string,
  priceHistory: number[];
}

export enum LaptopsOrder {
  BestDeal = "Best deal",
  PriceHighToLow = "Best price",
  // By Score
  StudentScore = "School work",
  GamingScore = "Gaming",
  ProgrammingScore = "Programming",
  OfficeWorkScore = "Office work",
  VideoEditingScore = "Video editing",
  WeightedScore = "Weighted score",
  // Advanced
  ByMemory = "Memory",
  ByStorage = "Storage",
  ByCores = "Cpu cores",
  ByCpuFrequency = "Cpu speed",
}

export enum LaptopUseCase {
  Students = "Students",
  Gaming = "Gaming",
  Work = "Office Work",
  Programmers = "Programmers",
}

export interface UseCaseQuery {
  forStudents: boolean;
  forGaming: boolean;
  forProgrammers: boolean;
  forOfficeWork: boolean;
  forVideoEditing: boolean;
}

export interface OperatingSystemQuery {
  macos: boolean;
  windows: boolean;
  linux: boolean;
}