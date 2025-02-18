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

enum PageOffsetStatus {
  QueryDefault,
  Custom,
}

export default function Laptops() {
  const rawSearchParams = useSearchParams();
  const [queryDefaults, setQueryDefaults] = useState(
    new URLSearchParams(rawSearchParams)
  );

  useEffect(() => {
    console.log("search params updated");
    const newQuery = new URLSearchParams(rawSearchParams);
    setQueryDefaults(newQuery);

    // Update order

    setOrder((newQuery.get("order") as LaptopsOrder) || LaptopsOrder.BestDeal);

    // Update price

    const defaultPrice = [
      parseInt(queryDefaults.get("minPrice") || "0"),
      parseInt(queryDefaults.get("maxPrice") || "5000"),
    ];
    setPrice(defaultPrice);

    // Update use case

    setforStudents(newQuery.get("forStudents") != "false");
    setforGaming(newQuery.get("forGaming") != "false");
    setforProgrammers(newQuery.get("forProgrammers") != "false");
    setforOfficeWork(newQuery.get("forOfficeWork") != "false");
    setforVideoEditing(newQuery.get("forVideoEditing") != "false");

    // Update operating system

    setWindows(newQuery.get("windows") != "false");
    setLinux(newQuery.get("linux") != "false");
    setMac(newQuery.get("macos") != "false");
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
    parseInt(queryDefaults.get("minPrice") || "0"),
    parseInt(queryDefaults.get("maxPrice") || "5000"),
  ];
  console.log("default price", defaultPrice)
  let [price, setPrice] = useState(defaultPrice);
  console.log("price", price)

  const orderDefault = (queryDefaults.get("order") ||
    LaptopsOrder.BestDeal) as LaptopsOrder;
  let [order, setOrder] = useState(orderDefault);

  // Use cases

  const studentsDefault = queryDefaults.get("forStudents") != "false";
  let [forStudents, setforStudents] = useState(studentsDefault);

  const gamingDefault = queryDefaults.get("forGaming") != "false";
  let [forGaming, setforGaming] = useState(gamingDefault);

  const programmersDefault = queryDefaults.get("forProgrammers") != "false";
  let [forProgrammers, setforProgrammers] = useState(programmersDefault);

  const officeWorkDefault = queryDefaults.get("forOfficeWork") != "false";
  let [forOfficeWork, setforOfficeWork] = useState(officeWorkDefault);

  const videoEditingDefault = queryDefaults.get("forVideoEditing") != "false";
  let [forVideoEditing, setforVideoEditing] = useState(videoEditingDefault);

  let [hasDedicatedGpu, setHasDedicatedGpu] = useState(false);
  let [vram, setVram] = useState([4, 64]);

  let [linux, setLinux] = useState(true);
  let [macos, setMac] = useState(true);
  let [windows, setWindows] = useState(true);

  let [size, setSize] = useState([13, 18]);
  let [resolution, setResolution] = useState([1080, 3060]);
  let [ram, setRam] = useState([4, 64]);
  let [storage, setStorage] = useState([512, 8192]);

  let [topFrequency, setTopFrequency] = useState([1, 5]);
  let [cores, setCores] = useState([2, 256]);

  let [data, setData] = useState([] as any);

  const pageOffsetDefault = parseInt(queryDefaults.get("pageOffset") || "0");

  let [pageOffset, setPageOffset] = useState(pageOffsetDefault);
  let [pageOffsetStatus, setPageOffsetStatus] = useState(
    queryDefaults.get("pageOffset")
      ? PageOffsetStatus.QueryDefault
      : PageOffsetStatus.Custom
  );
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

  useEffect(() => {
    setData([]);
    setOffset(0);
    setIsFetching(true);

    // Ignore the first page load (which will inact the useEffect call) so that query params are utilized
    if (pageOffsetStatus === PageOffsetStatus.QueryDefault) {
      setPageOffsetStatus(PageOffsetStatus.Custom);
    } else {
      setPageOffset(0);
    }
  }, [
    order,
    price,
    macos,
    windows,
    linux,
    size,
    resolution,
    ram,
    storage,
    cores,
    topFrequency,
    forStudents,
    forGaming,
    forProgrammers,
    forOfficeWork,
    forVideoEditing,
    hasDedicatedGpu,
    vram,
  ]);

  useEffect(() => {
    setData([]);
    setOffset(0);
    setIsFetching(true);
  }, [pageOffset]);

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
                  groupName="sort"
                  className="borderBg3"
                  onInput={(value) => {
                    "use client";
                    setOrder(value as LaptopsOrder);

                    // switch (value) {
                    //   case LaptopsOrder.BestDeal:
                    //     setOrder(LaptopsOrder.BestDeal);
                    //     break;
                    //   case LaptopsOrder.PriceLowToHigh:
                    //     setOrder(LaptopsOrder.PriceLowToHigh);
                    //     break;
                    //   case LaptopsOrder.PriceHighToLow:
                    //     setOrder(LaptopsOrder.PriceHighToLow);
                    //     break;
                    //   case LaptopsOrder.ByMemory:
                    //     setOrder(LaptopsOrder.ByMemory);
                    //     break;
                    //   case LaptopsOrder.ByStorage:
                    //     setOrder(LaptopsOrder.ByStorage);
                    //     break;
                    //   case LaptopsOrder.ByCores:
                    //     setOrder(LaptopsOrder.ByCores);
                    //     break;
                    //   case LaptopsOrder.ByCpuFrequency:
                    //     setOrder(LaptopsOrder.ByCpuFrequency);
                    //     break;
                    // }
                  }}
                />

                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Price</h3>}
                  steps={Array.from(
                    { length: 25 },
                    (_, i) =>
                      Math.pow(i * 100, 1.09432) /* (i + 1) * 100 - 100 */
                  )}
                  labelLeft={["$", ""]}
                  labelRight={["$", ""]}
                  leftValue={price[0]}
                  rightValue={price[1]}
                  emit={(left, right) => {
                    "use client";

                    setPrice([left, right]);
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
                      id="forStudentss"
                      checked={forStudents}
                      onChange={(checked) => setforStudents(checked)}
                    >
                      <h3 className="textXSmall">Students</h3>
                    </Checkbox>
                    <Checkbox
                      id="forGaming"
                      checked={forGaming}
                      onChange={(checked) => setforGaming(checked)}
                    >
                      <h3 className="textXSmall">Gaming</h3>
                    </Checkbox>
                    <Checkbox
                      id="forProgrammers"
                      checked={forProgrammers}
                      onChange={(checked) => setforProgrammers(checked)}
                    >
                      <h3 className="textXSmall">Programming</h3>
                    </Checkbox>
                    <Checkbox
                      id="forOfficeWork"
                      checked={forOfficeWork}
                      onChange={(checked) => setforOfficeWork(checked)}
                    >
                      <h3 className="textXSmall">Office work</h3>
                    </Checkbox>
                    <Checkbox
                      id="forVideoEditing"
                      checked={forVideoEditing}
                      onChange={(checked) => setforVideoEditing(checked)}
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
                  steps={Array.from({ length: 6 }, (_, i) => i + 13)}
                  labelLeft={["", " inches"]}
                  labelRight={["", " inches"]}
                  emit={(left, right) => {
                    "use client";
                    setSize([left, right]);
                  }}
                />

                <DoubleSlider
                  header={
                    <h3 className="textSmall headerSmall">
                      Display Resolution
                    </h3>
                  }
                  steps={Array.from(
                    { length: /* 41 */ 12 },
                    (_, i) =>
                      9 *
                      (100 +
                        (i + 1) *
                          20) /* Math.pow(2, i * 9/16 + 10) */ /* Math.sqrt((i * 400 * 1080) / (16 / 9)) + 1080 */
                  )}
                  labelLeft={["", "p"]}
                  labelRight={["", "p"]}
                  emit={(left, right) => {
                    "use client";
                    setResolution([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Memory</h3>}
                  steps={Array.from({ length: 6 }, (_, i) =>
                    Math.pow(2, i + 3)
                  )}
                  labelLeft={["", " GB"]}
                  labelRight={["", " GB"]}
                  emit={(left, right) => {
                    "use client";
                    setRam([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">Storage</h3>}
                  steps={Array.from({ length: 5 }, (_, i) =>
                    Math.pow(2, i + 9)
                  )}
                  labelLeft={["", " GB"]}
                  labelRight={["", " GB"]}
                  emit={(left, right) => {
                    "use client";
                    setStorage([left, right]);
                  }}
                />
                <DoubleSlider
                  header={<h3 className="textSmall headerSmall">CPU Cores</h3>}
                  steps={Array.from({ length: 8 }, (_, i) =>
                    Math.pow(2, i + 1)
                  )}
                  emit={(left, right) => {
                    "use client";
                    setCores([left, right]);
                  }}
                />
                <DoubleSlider
                  header={
                    <h3 className="textSmall headerSmall">Max Frequency</h3>
                  }
                  steps={Array.from({ length: 6 }, (_, i) => i + 1)}
                  labelLeft={["", " GHz"]}
                  labelRight={["", " GHz"]}
                  emit={(left, right) => {
                    "use client";
                    setTopFrequency([left, right]);
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
                      onChange={(checked) => setHasDedicatedGpu(checked)}
                    >
                      <h3 className="textXSmall">Dedicated</h3>
                    </Checkbox>
                    <DoubleSlider
                      header={<h3 className="textSmall headerSmall">VRAM</h3>}
                      steps={Array.from({ length: 5 }, (_, i) =>
                        Math.pow(2, i * 1 + 2)
                      )}
                      labelLeft={["", " GB"]}
                      labelRight={["", " GB"]}
                      emit={(left, right) => {
                        "use client";
                        setVram([left, right]);
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
                      onChange={(checked) => setWindows(checked)}
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
                      onChange={(checked) => setMac(checked)}
                    >
                      <Image src={macIcon} alt="macos" className="osIcon" />
                      <h3 className="textXSmall">macOS</h3>
                    </Checkbox>
                    <Checkbox
                      id="linuxCheck"
                      checked={linux}
                      onChange={(checked) => setLinux(checked)}
                    >
                      <Image src={linuxIcon} alt="linux" className="osIcon" />
                      <h3 className="textXSmall">Linux</h3>
                    </Checkbox>
                  </div>
                </Accordian>
              </div>
            </div>
          </div>
          <div className="column gapLarge width100 centerRow centerColumn">
            <h1 className="textLarge headerLarge textCenter">Laptops</h1>
            {!isFetching && data.length == 0 ? (
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
                      queryDefaults.set(
                        "pageOffset",
                        (pageOffset - 1).toString()
                      );
                      router.replace(`?${queryDefaults.toString()}`);

                      setPageOffset(pageOffset - 1);
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
