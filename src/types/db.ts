export interface Laptop {
    name: string
    price: number
    saleOf: number
    macos: boolean
    windows: boolean
    linux: boolean
    ram: number
    storage: number
    cores: number
    topFrequency: number
    titleImage: Uint8Array
}

export enum LaptopsOrder {
  BestDeal = "Best deal",
  PriceLowToHigh = "By price asc.",
  PriceHighToLow = "By price desc.",
  ByMemory = "By memory desc.",
  ByStorage = "By storage desc.",
  ByCores = "By cpu cores desc.",
  ByCpuFrequency = "By cpu speed desc.",
}