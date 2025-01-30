export interface Laptop {
    name: string
    price: number
    saleOf: number
    macos: boolean
    windows: boolean
    linux: boolean
    size: number
    resolution: number
    ram: number
    storage: number
    cores: number
    topFrequency: number
    titleImage: Uint8Array
    forStudents: boolean
    forGaming: boolean
    forProgrammers: boolean
    forOfficeWork: boolean
    studentScore: number
    gamingScore: number
    programmingScore: number
    officeWorkScore: number
    videoEditingScore: number
    cpuName: string
    gpuName: string
    affiliate: string
    vram: number
    hasDedicatedGpu: boolean
    priceHistory: number[]
}

export enum LaptopsOrder {
  BestDeal = "Best deal",
  PriceLowToHigh = "By price asc.",
  PriceHighToLow = "By price desc.",
  // By Score
  StudentScore = "Student score desc.",
  GamingScore = "Gaming score desc.",
  ProgrammingScore = "Programming score desc.",
  OfficeWorkScore = "Office work score desc.",
  VideoEditingScore = "Video editing score desc.",
  // Advanced
  ByMemory = "By memory desc.",
  ByStorage = "By storage desc.",
  ByCores = "By cpu cores desc.",
  ByCpuFrequency = "By cpu speed desc.",
}

export enum LaptopUseCase {
  Students = "Students",
  Gaming = "Gaming",
  Work = "Work",
  Programmers = "Programmers",
}