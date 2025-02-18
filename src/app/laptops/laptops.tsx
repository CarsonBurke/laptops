"use client";

import { generateFakeLaptopPreviews } from "../../components/fakeLaptopPreview";
import linuxIcon from "../../../public/OSIcons/linux.svg";
import macIcon from "../../../public/OSIcons/mac.svg";
import windowsIcon from "../../../public/OSIcons/windows.svg";
import Image from "next/image";
import Accordian from "../../components/accordian";
import Checkbox from "../../components/checkbox";
import RadioGroup from "../../components/radioGroup";
import Select from "../../components/select";
import DoubleSlider from "../../components/doubleSlider";
import { Suspense, useEffect, useState, useTransition } from "react";
import {
  redirect,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import e from "../../../dbschema/edgeql-js";
import { edgeClient } from "../../scripts/db";
/* import { trpc } from "../utils/trpc"; */
import { trpc } from "../../lib/trpc";
import LaptopPreview from "@/components/laptopPreview";
import Display from "./display";
import { Laptop, LaptopsOrder } from "@/types/laptop";
import { Router } from "next/router";
import Link from "next/link";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";

/* import e from '@/dbschema/edgeql-js'; */

const laptopsPerPage = 20;
const laptopsLoadGroupSize = 10;

enum QueryKey {
  Order = "order",
  MinPrice = "minPrice",
  MaxPrice = "maxPrice",
  ForStudents = "forStudents",
  ForGaming = "forGaming",
  ForProgrammers = "forProgrammers",
  ForOfficeWork = "forOfficeWork",
  ForVideoEditing = "forVideoEditing",
  MinDisplaySize = "minDisplaySize",
  MaxDisplaySize = "maxDisplaySize",
  MinDisplayResolution = "minDisplayResolution",
  MaxDisplayResolution = "maxDisplayResolution",
  MinMemory = "minMemory",
  MaxMemory = "maxMemory",
  MinStorage = "minStorage",
  MaxStorage = "maxStorage",
  MinCores = "minCores",
  MaxCores = "maxCores",
  MinCpuFrequency = "minCpuFrequency",
  MaxCpuFrequency = "maxCpuFrequency",
  DedicatedGPU = "dedicatedGPU",
  MinVram = "minVram",
  MaxVram = "maxVram",
  Windows = "windows",
  Linux = "linux",
  Macos = "macos",
  PageOffset = "pageOffset",
}

export default function Laptops() {
  const rawSearchParams = useSearchParams();
  const [queryDefaults, setQueryDefaults] = useState(
    new URLSearchParams(rawSearchParams)
  );

  function updateSearchParams() {
    console.log("search params updated");
    const newQuery = new URLSearchParams(rawSearchParams);
    setQueryDefaults(newQuery);

    // Update order

    setOrder(
      (newQuery.get(QueryKey.Order) as LaptopsOrder) || LaptopsOrder.BestDeal
    );

    // Update price

    const defaultPrice = [
      parseInt(queryDefaults.get(QueryKey.MinPrice) || "0"),
      parseInt(queryDefaults.get(QueryKey.MaxPrice) || "5000"),
    ];
    setPrice(defaultPrice);

    // Update use case

    setforStudents(newQuery.get(QueryKey.ForStudents) != "false");
    setforGaming(newQuery.get(QueryKey.ForGaming) != "false");
    setforProgrammers(newQuery.get(QueryKey.ForProgrammers) != "false");
    setforOfficeWork(newQuery.get(QueryKey.ForOfficeWork) != "false");
    setforVideoEditing(newQuery.get(QueryKey.ForVideoEditing) != "false");

    // Update operating system

    setWindows(newQuery.get(QueryKey.Windows) != "false");
    setLinux(newQuery.get(QueryKey.Linux) != "false");
    setMac(newQuery.get(QueryKey.Macos) != "false");

    //

    //

    setPageOffset(parseInt(newQuery.get(QueryKey.PageOffset) || "0"));
  }

  useEffect(() => {
    updateSearchParams();
  }, [rawSearchParams]);

  const router = useRouter();
  /* const [queryDefaults, setQueryDefaults] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    setQueryDefaults(new URLSearchParams(window.location.search));

    const updateParams = () =>
      setQueryDefaults(new URLSearchParams(window.location.search));

    console.log("effected", window.location.search);
    console.log("next query", new URLSearchParams(window.location.search));

    setforStudents(
      queryDefaults.get("forStudents") != "false"
    );

    window.addEventListener("popstate", updateParams);
    window.addEventListener("pushstate", updateParams);
    window.addEventListener("replacestate", updateParams);

    return () => {
      window.removeEventListener("popstate", updateParams);
      window.removeEventListener("pushstate", updateParams);
      window.removeEventListener("replacestate", updateParams);
    };
  }, [window.location.search]); */

  /* const router = useRouter()
  const [queryDefaults, setQueryDefaults] = useState(
    new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    setQueryDefaults(new URLSearchParams(window.location.search))
    console.log("update route")
  }, [router]);

  console.log("queryDefaults", queryDefaults);

  console.log(
    "for Students",
    queryDefaults.get("forStudents"),
    typeof queryDefaults.get("forStudents")
  ); */

  /* useEffect(() => {
    console.log("HI UPDATED")
    setQueryDefaults(searchParams)

    setforStudents(
      queryDefaults.get("forStudents") != "false")
  }, [searchParams]) */

  /* const [queryDefaults, setQueryDefaults] = useState(
    new URLSearchParams(
      typeof window !== "undefined" ? window.location.search : ""
    )
  );

  useEffect(() => {
    console.log("update window location");

    const newQuery = new URLSearchParams(window.location.search);
    setQueryDefaults(newQuery);

    // Don't need to update other stuff, they will be refreshed by this state change it seems
    setOrder((newQuery.get("order") as LaptopsOrder) || LaptopsOrder.BestDeal);
  }, []); */

  // Filter states

  const defaultPrice = [
    parseInt(queryDefaults.get(QueryKey.MinPrice) || "0"),
    parseInt(queryDefaults.get(QueryKey.MaxPrice) || "5000"),
  ];

  let [price, setPrice] = useState(defaultPrice);

  const orderDefault = (queryDefaults.get(QueryKey.Order) ||
    LaptopsOrder.BestDeal) as LaptopsOrder;
  let [order, setOrder] = useState(orderDefault);

  // Use cases

  const studentsDefault = queryDefaults.get(QueryKey.ForStudents) != "false";
  let [forStudents, setforStudents] = useState(studentsDefault);

  const gamingDefault = queryDefaults.get(QueryKey.ForGaming) != "false";
  let [forGaming, setforGaming] = useState(gamingDefault);

  const programmersDefault =
    queryDefaults.get(QueryKey.ForProgrammers) != "false";
  let [forProgrammers, setforProgrammers] = useState(programmersDefault);

  const officeWorkDefault =
    queryDefaults.get(QueryKey.ForOfficeWork) != "false";
  let [forOfficeWork, setforOfficeWork] = useState(officeWorkDefault);

  const videoEditingDefault =
    queryDefaults.get(QueryKey.ForVideoEditing) != "false";
  let [forVideoEditing, setforVideoEditing] = useState(videoEditingDefault);

  const hasDedicatedGpuDefault =
    queryDefaults.get(QueryKey.DedicatedGPU) == "true";
  let [hasDedicatedGpu, setHasDedicatedGpu] = useState(hasDedicatedGpuDefault);
  const vramDefault = [
    parseInt(queryDefaults.get(QueryKey.MinVram) || "4"),
    parseInt(queryDefaults.get(QueryKey.MaxVram) || "64"),
  ];
  let [vram, setVram] = useState(vramDefault);

  const linuxDefault = queryDefaults.get(QueryKey.Linux) != "false";
  let [linux, setLinux] = useState(linuxDefault);
  const macosDefault = queryDefaults.get(QueryKey.Macos) != "false";
  let [macos, setMac] = useState(macosDefault);
  const windowsDefault = queryDefaults.get(QueryKey.Windows) != "false";
  let [windows, setWindows] = useState(windowsDefault);

  const sizeDefault = [
    parseInt(queryDefaults.get(QueryKey.MinDisplaySize) || "13"),
    parseInt(queryDefaults.get(QueryKey.MaxDisplaySize) || "18"),
  ];
  let [size, setSize] = useState(sizeDefault);

  const resolutionDefault = [
    parseInt(queryDefaults.get(QueryKey.MinDisplayResolution) || "1080"),
    parseInt(queryDefaults.get(QueryKey.MaxDisplayResolution) || "3060"),
  ];
  let [resolution, setResolution] = useState(resolutionDefault);

  const memoryDefault = [
    parseInt(queryDefaults.get(QueryKey.MinMemory) || "8"),
    parseInt(queryDefaults.get(QueryKey.MaxMemory) || "256"),
  ];
  let [ram, setRam] = useState(memoryDefault);

  const storageDefault = [
    parseInt(queryDefaults.get(QueryKey.MinStorage) || "512"),
    parseInt(queryDefaults.get(QueryKey.MaxStorage) || "8192"),
  ];
  let [storage, setStorage] = useState(storageDefault);

  const cpuFrequencyDefault = [
    parseInt(queryDefaults.get(QueryKey.MinCpuFrequency) || "1"),
    parseInt(queryDefaults.get(QueryKey.MaxCpuFrequency) || "6"),
  ];
  let [topFrequency, setTopFrequency] = useState(cpuFrequencyDefault);

  const coresDefault = [
    parseInt(queryDefaults.get(QueryKey.MinCores) || "2"),
    parseInt(queryDefaults.get(QueryKey.MaxCores) || "256"),
  ];
  let [cores, setCores] = useState(coresDefault);

  let [data, setData] = useState([] as any);

  const pageOffsetDefault = parseInt(
    queryDefaults.get(QueryKey.PageOffset) || "0"
  );

  let [pageOffset, setPageOffset] = useState(pageOffsetDefault);
  let [offset, setOffset] = useState(0);

  /* if (!isLoading) {
    console.log("getting new laptops")
    
    setData(data.concat(result.data));
    setIsLoading(result.isLoading);
  } */

  let [isFetching, setIsFetching] = useState(true);

  const result = trpc.getLaptops.useQuery({
    order,
    minPrice: price[0],
    maxPrice: price[1],
    macos: macos,
    windows: windows,
    linux: linux,
    minSize: size[0],
    maxSize: size[1],
    minResolution: resolution[0],
    maxResolution: resolution[1],
    minMemory: ram[0],
    maxMemory: ram[1],
    minStorage: storage[0],
    maxStorage: storage[1],
    minCores: cores[0],
    maxCores: cores[1],
    minCpuFrequency: topFrequency[0],
    maxCpuFrequency: topFrequency[1],
    forStudents,
    forGaming,
    forProgrammers,
    forOfficeWork,
    forVideoEditing,
    hasDedicatedGpu,
    minVram: vram[0],
    maxVram: vram[1],
    studentScoreWeight: parseInt(
      queryDefaults.get("studentScoreWeight") || "0"
    ),
    gamingScoreWeight: parseInt(queryDefaults.get("gamingScoreWeight") || "0"),
    programmingScoreWeight: parseInt(
      queryDefaults.get("programmingScoreWeight") || "0"
    ),
    officeWorkScoreWeight: parseInt(
      queryDefaults.get("officeWorkScoreWeight") || "0"
    ),
    videoEditingScoreWeight: parseInt(
      queryDefaults.get("videoEditingScoreWeight") || "0"
    ),
    limit: laptopsLoadGroupSize,
    offset: offset + pageOffset * laptopsPerPage,
  });

  function changeQuery() {
    setData([]);
    setOffset(0);
    setIsFetching(true);
    setPageOffset(0);
  }

  // useEffect(() => {
  //   setData([]);
  //   setOffset(0);
  //   setIsFetching(true);

  //   // Ignore the first page load (which will inact the useEffect call) so that query params are utilized
  //   if (pageOffsetStatus === PageOffsetStatus.QueryDefault) {
  //     setPageOffsetStatus(PageOffsetStatus.Custom);
  //   } else {
  //     setPageOffset(0);
  //   }
  // }, [
  //   order,
  //   price,
  //   macos,
  //   windows,
  //   linux,
  //   size,
  //   resolution,
  //   ram,
  //   storage,
  //   cores,
  //   topFrequency,
  //   forStudents,
  //   forGaming,
  //   forProgrammers,
  //   forOfficeWork,
  //   forVideoEditing,
  //   hasDedicatedGpu,
  //   vram,
  // ]);

  function ChangePageOffset() {
    setData([]);
    setOffset(0);
    setIsFetching(true);
  }

  useEffect(() => {
    if (result.isLoading) {
      return;
    }
    if (!isFetching) {
      return;
    }

    setData((prev: any) => prev.concat(result.data));

    if (offset + laptopsLoadGroupSize >= laptopsPerPage) {
      setIsFetching(false);
    }

    setOffset((prev) => prev + laptopsLoadGroupSize);
  }, [result]);

  // EdgeDB qeury

  /* const getLaptops = await e.select(e.Laptop, (laptop) => ({
    id: true,
    name: true,
    // titleImage: true,
    price: true,
    saleOf: true,
    linux: true,
    macos: true,
    windows: true,
    size: true,
    ram: true,
    cores: true,
    storage: true,
    topFrequency: true,
    order_by: {
      expression: laptop.saleOf,
      direction: e.DESC,
    },
    filter: e.set(
      e.op(laptop.price, ">=", price[0]),
      e.op(laptop.price, "<=", price[1]),
      e.op(forStudentss, "=", forStudentss),
      e.op(forGaming, "=", forGaming),
      e.op(forProgrammers, "=", forProgrammers),
      e.op(forWork, "=", forWork),
      e.op(dedicatedGPU, "=", dedicatedGPU),
      e.op(linux, "=", linux),
      e.op(mac, "=", mac),
      e.op(windows, "=", windows),
    )
  })).run(client);

  console.log("cores", getLaptops); */

  return (
    <Suspense>
      <main className="main">
        <section className="sectionPadded rowCollapsible centerRow gapMedium">
          <div className="columnCollapsibleScroll gapMedium">
            <div className="column gapMedium">
              <h3 className="textMedium headerSmall">Filter</h3>

              <div className="columnCollapsible gapMedium">
                <Select
                  optionNames={{
                    Basic: [LaptopsOrder.BestDeal, LaptopsOrder.PriceHighToLow],
                    Advanced: [
                      LaptopsOrder.ByMemory,
                      LaptopsOrder.ByStorage,
                      LaptopsOrder.ByCores,
                      LaptopsOrder.ByCpuFrequency,
                    ],
                    Score: [
                      LaptopsOrder.StudentScore,
                      LaptopsOrder.GamingScore,
                      LaptopsOrder.OfficeWorkScore,
                      LaptopsOrder.ProgrammingScore,
                      LaptopsOrder.VideoEditingScore,
                    ],
                  }}
                  value={order}
                  groupName="sort"
                  className="borderBg3"
                  onInput={(value) => {
                    "use client";
                    setOrder(value as LaptopsOrder);

                    queryDefaults.set(QueryKey.Order, value.toString());
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                  }}
                />

                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Price</h3>}
                  steps={Array.from(
                    { length: 25 },
                    (_, i) =>
                      Math.floor(
                        Math.pow(i * 100, 1.09432)
                      ) /* (i + 1) * 100 - 100 */
                  )}
                  labelLeft={["$", ""]}
                  labelRight={["$", ""]}
                  leftValue={price[0]}
                  rightValue={price[1]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);

                    queryDefaults.set(QueryKey.MinPrice, left.toString());
                    queryDefaults.set(QueryKey.MaxPrice, right.toString());
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />

                {/* <Accordian
                open={true}
                header={<h3 className="textSmall headerSmall">Price</h3>}
                className="borderBg3"
              >
                <div className="column gapSmall">
                  <div className="column gapXSmall">
                    <label htmlFor="minPrice" className="textXSmall">
                      Min
                    </label>
                    <input
                      className="textInput background2"
                      id="minPrice"
                      placeholder="Min"
                      type="number"
                      defaultValue={300}
                    />
                  </div>
                  <div className="column gapXSmall">
                    <label htmlFor="maxPrice" className="textXSmall">
                      Max
                    </label>
                    <input
                      className="textInput background2"
                      id="maxPrice"
                      placeholder="Max"
                      type="number"
                      defaultValue={2000}
                    />
                  </div>
                </div>
              </Accordian> */}
                <Accordian
                  header={<h3 className="textSmall headerSmall">Use Case</h3>}
                  open={true}
                  className="borderBg3"
                >
                  <div className="column">
                    <Checkbox
                      id="forStudents"
                      checked={forStudents}
                      onChange={(checked) => {
                        setforStudents(checked);

                        queryDefaults.set(
                          QueryKey.ForStudents,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Students</h3>
                    </Checkbox>
                    <Checkbox
                      id="forGaming"
                      checked={forGaming}
                      onChange={(checked) => {
                        setforGaming(checked);

                        queryDefaults.set(
                          QueryKey.ForGaming,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Gaming</h3>
                    </Checkbox>
                    <Checkbox
                      id="forProgrammers"
                      checked={forProgrammers}
                      onChange={(checked) => {
                        setforProgrammers(checked);

                        queryDefaults.set(
                          QueryKey.ForProgrammers,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Programming</h3>
                    </Checkbox>
                    <Checkbox
                      id="forOfficeWork"
                      checked={forOfficeWork}
                      onChange={(checked) => {
                        setforOfficeWork(checked);

                        queryDefaults.set(
                          QueryKey.ForOfficeWork,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Office work</h3>
                    </Checkbox>
                    <Checkbox
                      id="forVideoEditing"
                      checked={forVideoEditing}
                      onChange={(checked) => {
                        setforVideoEditing(checked);

                        queryDefaults.set(
                          QueryKey.ForVideoEditing,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`);
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Video editing</h3>
                    </Checkbox>
                  </div>
                </Accordian>
              </div>
            </div>

            <div className="column gapMedium">
              <h2 className="textMedium headerSmall">Specifications</h2>

              <div className="columnCollapsible gapMedium">
                <DoubleSlider
                  header={
                    <h3 className="textSmall headerSmall">Display Size</h3>
                  }
                  leftValue={size[0]}
                  rightValue={size[1]}
                  steps={Array.from({ length: 6 }, (_, i) =>
                    Math.floor(i + 13)
                  )}
                  labelLeft={["", " inches"]}
                  labelRight={["", " inches"]}
                  emit={(left, right) => {
                    "use client";
                    setSize([left, right]);

                    queryDefaults.set(QueryKey.MinDisplaySize, left.toString());
                    queryDefaults.set(
                      QueryKey.MaxDisplaySize,
                      right.toString()
                    );
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />

                <DoubleSlider
                  header={
                    <h3 className="textSmall headerSmall">
                      Display Resolution
                    </h3>
                  }
                  steps={Array.from({ length: /* 41 */ 12 }, (_, i) =>
                    Math.floor(9 * (100 + (i + 1) * 20))
                  )}
                  leftValue={resolution[0]}
                  rightValue={resolution[1]}
                  labelLeft={["", "p"]}
                  labelRight={["", "p"]}
                  emit={(left, right) => {
                    "use client";
                    setResolution([left, right]);

                    queryDefaults.set(
                      QueryKey.MinDisplayResolution,
                      left.toString()
                    );
                    queryDefaults.set(
                      QueryKey.MaxDisplayResolution,
                      right.toString()
                    );
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Memory</h3>}
                  steps={Array.from({ length: 6 }, (_, i) =>
                    Math.floor(Math.pow(2, i + 3))
                  )}
                  labelLeft={["", " GB"]}
                  labelRight={["", " GB"]}
                  leftValue={ram[0]}
                  rightValue={ram[1]}
                  emit={(left, right) => {
                    "use client";
                    setRam([left, right]);

                    queryDefaults.set(QueryKey.MinMemory, left.toString());
                    queryDefaults.set(QueryKey.MaxMemory, right.toString());
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Storage</h3>}
                  steps={Array.from({ length: 5 }, (_, i) =>
                    Math.floor(Math.pow(2, i + 9))
                  )}
                  labelLeft={["", " GB"]}
                  labelRight={["", " GB"]}
                  leftValue={storage[0]}
                  rightValue={storage[1]}
                  emit={(left, right) => {
                    "use client";
                    setStorage([left, right]);

                    queryDefaults.set(QueryKey.MinStorage, left.toString());
                    queryDefaults.set(QueryKey.MaxStorage, right.toString());
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">CPU Cores</h3>}
                  steps={Array.from({ length: 8 }, (_, i) =>
                    Math.floor(Math.pow(2, i + 1))
                  )}
                  leftValue={cores[0]}
                  rightValue={cores[1]}
                  emit={(left, right) => {
                    "use client";
                    setCores([left, right]);

                    queryDefaults.set(QueryKey.MinCores, left.toString());
                    queryDefaults.set(QueryKey.MaxCores, right.toString());
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />
                <DoubleSlider
                  header={
                    <h3 className="textSmall headerSmall">Max Frequency</h3>
                  }
                  steps={Array.from({ length: 6 }, (_, i) => Math.floor(i + 1))}
                  labelLeft={["", " GHz"]}
                  labelRight={["", " GHz"]}
                  leftValue={topFrequency[0]}
                  rightValue={topFrequency[1]}
                  emit={(left, right) => {
                    "use client";
                    setTopFrequency([left, right]);

                    queryDefaults.set(
                      QueryKey.MinCpuFrequency,
                      left.toString()
                    );
                    queryDefaults.set(
                      QueryKey.MaxCpuFrequency,
                      right.toString()
                    );
                    router.replace(`?${queryDefaults.toString()}`, {
                      scroll: false,
                    });
                    changeQuery();
                  }}
                />

                <Accordian
                  header={<h3 className="textSmall headerSmall">GPU</h3>}
                  className="borderBg3"
                >
                  <div className="column gapMedium">
                    <Checkbox
                      id="dedicatedGPU"
                      checked={hasDedicatedGpu}
                      onChange={(checked) => {
                        setHasDedicatedGpu(checked);

                        queryDefaults.set(
                          QueryKey.DedicatedGPU,
                          checked.toString()
                        );
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <h3 className="textXSmall">Only Dedicated</h3>
                    </Checkbox>
                    <DoubleSlider
                      header={<h3 className="textSmall headerSmall">VRAM</h3>}
                      steps={Array.from({ length: 5 }, (_, i) =>
                        Math.floor(Math.pow(2, i * 1 + 2))
                      )}
                      labelLeft={["", " GB"]}
                      labelRight={["", " GB"]}
                      leftValue={vram[0]}
                      rightValue={vram[1]}
                      emit={(left, right) => {
                        "use client";
                        setVram([left, right]);

                        queryDefaults.set(QueryKey.MinVram, left.toString());
                        queryDefaults.set(QueryKey.MaxVram, right.toString());
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    />
                  </div>
                </Accordian>
                <Accordian
                  header={
                    <h3 className="textSmall headerSmall">Operating System</h3>
                  }
                  className="borderBg3"
                >
                  <div className="column">
                    <Checkbox
                      id="windowsCheck"
                      checked={windows}
                      onChange={(checked) => {
                        setWindows(checked);

                        queryDefaults.set(QueryKey.Windows, checked.toString());
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <Image
                        src={windowsIcon}
                        alt="windows"
                        className="osIcon"
                      />
                      <h3 className="textXSmall">Windows</h3>
                    </Checkbox>
                    <Checkbox
                      id="macCheck"
                      checked={macos}
                      onChange={(checked) => {
                        setMac(checked);

                        queryDefaults.set(QueryKey.Macos, checked.toString());
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <Image src={macIcon} alt="macos" className="osIcon" />
                      <h3 className="textXSmall">macOS</h3>
                    </Checkbox>
                    <Checkbox
                      id="linuxCheck"
                      checked={linux}
                      onChange={(checked) => {
                        setLinux(checked);

                        queryDefaults.set(QueryKey.Linux, checked.toString());
                        router.replace(`?${queryDefaults.toString()}`, {
                          scroll: false,
                        });
                        changeQuery();
                      }}
                    >
                      <Image src={linuxIcon} alt="linux" className="osIcon" />
                      <h3 className="textXSmall">Linux</h3>
                    </Checkbox>
                  </div>
                </Accordian>
              </div>
            </div>

            {/* <div className="column centerColumn">
              <button
                onClick={() => {
                  router.replace("/laptops");
                  
                  changeQuery();
                  updateSearchParams()
                  router.refresh()
                }}
                className="button buttonPrimary"
              >
                <span className="material-symbols-outlined">refresh</span>Reset
              </button>
            </div> */}
          </div>
          <div className="column gapLarge width100 centerRow centerColumn">
            <h1 className="textLarge headerLarge textCenter">Laptops</h1>
            {!isFetching && data.length == 0 && pageOffset == 0 ? (
              <div className="column centerColumn gapMedium">
                <div className="column centerColumn">
                  <h1 className="textMedium headerSmall">No laptops found</h1>
                  <h4 className="textSmall textSlightTransparent">
                    Please loosen your search parameters
                  </h4>
                </div>
              </div>
            ) : (
              <>
                <Display
                  data={data as any}
                  isFetching={isFetching}
                  maxPreviews={laptopsPerPage}
                />
                <div className="row gapMedium centerRow centerColumn">
                  <button
                    disabled={pageOffset === 0}
                    onClick={() => {
                      queryDefaults.set("pageOffset", (0).toString());
                      router.replace(`?${queryDefaults.toString()}`);

                      setPageOffset(0);
                      ChangePageOffset();
                    }}
                    className={"button buttonBg3"}
                  >
                    <span className="material-symbols-outlined">
                      first_page
                    </span>
                  </button>
                  <button
                    disabled={pageOffset === 0}
                    onClick={() => {
                      queryDefaults.set(
                        "pageOffset",
                        (pageOffset - 1).toString()
                      );
                      router.replace(`?${queryDefaults.toString()}`);

                      setPageOffset(pageOffset - 1);
                      ChangePageOffset();
                    }}
                    className={"button buttonBg3"}
                  >
                    <span className="material-symbols-outlined">
                      chevron_left
                    </span>
                  </button>
                  <h3 className="textSmall headerSmall">{pageOffset}</h3>
                  <button
                    disabled={data.length < laptopsPerPage}
                    onClick={() => {
                      queryDefaults.set(
                        "pageOffset",
                        (pageOffset + 1).toString()
                      );
                      router.replace(`?${queryDefaults.toString()}`);

                      setPageOffset(pageOffset + 1);
                      ChangePageOffset();
                    }}
                    className="button buttonBg3"
                  >
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </Suspense>
  );
}
