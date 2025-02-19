"use client";

import LabelledInput from "@/components/labelledInput";
import LabelledTextarea from "@/components/labelledTextarea";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import LaptopView from "@/app/laptops/[id]/laptop";
import Checkbox from "@/components/checkbox";
import Image from "next/image";
import linuxIcon from "../../../../public/OSIcons/linux.svg";
import macIcon from "../../../../public/OSIcons/mac.svg";
import windowsIcon from "../../../../public/OSIcons/windows.svg";
import AdminLock from "../admin";

export default function LaptopUpload() {
  let [laptopName, setLaptopName] = useState("Laptop Name");

  // Scores

  // Categories

  let [titleImageFile, setTitleImageFile] = useState<File | null>(null);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [linux, setLinux] = useState(false);
  let [macos, setMac] = useState(false);
  let [windows, setWindows] = useState(false);

  // Specs

  // cpu - top freq, name, cores

  let [topFrequency, setTopFrequency] = useState(0);
  let [cpuName, setCpuName] = useState("Unknown");
  let [cores, setCores] = useState(0);

  // gpu - dedicated t/f, vram num

  let [gpuName, setGpuName] = useState("Unknown");
  let [hasDedicatedGpu, setHasDedicatedGpu] = useState(false);
  let [vram, setVram] = useState(0);

  // storage, ram

  let [storage, setStorage] = useState(0);
  let [storageName, setStorageName] = useState("Unknown");
  let [ram, setRam] = useState(0);

  // Screen - resolution, size

  let [displayName, setDisplayName] = useState("Unknown");
  let [size, setSize] = useState(0);
  let [resolution, setResolution] = useState(0);

  // categories that fit - student, gaming, programming, office work, video editing

  let [forStudents, setForStudents] = useState(false);
  let [forGaming, setForGaming] = useState(false);
  let [forProgrammers, setForProgrammers] = useState(false);
  let [forOfficeWork, setForOfficeWork] = useState(false);
  let [forVideoEditing, setForVideoEditing] = useState(false);

  // price

  let [price, setPrice] = useState(0);
  let [saleOf, setSaleOf] = useState(0);

  // general

  let [affiliate, setAffiliate] = useState("https://example.com");

  //

  let [submitted, setSubmitted] = useState(false);

  const createLaptop = trpc.insertLaptop.useMutation();

  async function submit() {
    // if (submitted) return;

    // Title image

    const titleImageBuffer = await titleImageFile?.arrayBuffer();
    const titleImageArray = new Uint8Array(titleImageBuffer as any);

    const result = createLaptop.mutate({
      username,
      password,
      name: laptopName,
      titleImage: titleImageArray,
      price,
      saleOf,
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
      cpuName,
      gpuName,
      affiliate,
      vram,
      hasDedicatedGpu,
      storageName,
      displayName,
      priceHistory: [0, 0, 0, 0, 0],
    });

    setSubmitted(true);
  }

  return (
    <main className="main">
      <section className="sectionPadded column gapMedium">
        <AdminLock />
        <div className="rowCollapsible gapMedium">
          <div className="column gapMedium">
            <div className="column gapLarge centerColumn background2 borderBg3 paddingMedium">
              <div className="column gapMedium centerColumn">
                <h1 className="textLarge headerLarge textCenter">
                  Upload Laptop
                </h1>

                <div className="column gapSmall">
                  <LabelledInput
                    args={{
                      name: "name",
                      label: "Name",
                      placeholder: "Name",
                      type: "text",
                      value: laptopName,
                      color: 3,
                      onChange: (value) => {
                        setLaptopName(value as string);
                      },
                    }}
                  />

                  <LabelledInput
                    args={{
                      name: "price",
                      label: "Price",
                      placeholder: "0",
                      type: "number",
                      value: price,
                      color: 3,
                      onChange: (value) => {
                        setPrice(parseInt(value as string));
                      },
                    }}
                  />

                  <LabelledInput
                    args={{
                      name: "saleOf",
                      label: "Sale of",
                      placeholder: "0",
                      type: "number",
                      value: saleOf,
                      color: 3,
                      onChange: (value) => {
                        setSaleOf(parseInt(value as string));
                      },
                    }}
                  />
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">Use cases</h2>

                  <Checkbox
                    id="students"
                    checked={forStudents}
                    onChange={(checked) => {
                      setForStudents(checked);
                    }}
                  >
                    <h3 className="textXSmall">Students</h3>
                  </Checkbox>

                  <Checkbox
                    id="gaming"
                    checked={forGaming}
                    onChange={(checked) => {
                      setForGaming(checked);
                    }}
                  >
                    <h3 className="textXSmall">Gaming</h3>
                  </Checkbox>

                  <Checkbox
                    id="programmers"
                    checked={forProgrammers}
                    onChange={(checked) => {
                      setForProgrammers(checked);
                    }}
                  >
                    <h3 className="textXSmall">Programmers</h3>
                  </Checkbox>

                  <Checkbox
                    id="officeWork"
                    checked={forOfficeWork}
                    onChange={(checked) => {
                      setForOfficeWork(checked);
                    }}
                  >
                    <h3 className="textXSmall">Office Work</h3>
                  </Checkbox>

                  <Checkbox
                    id="videoEditing"
                    checked={forVideoEditing}
                    onChange={(checked) => {
                      setForVideoEditing(checked);
                    }}
                  >
                    <h3 className="textXSmall">Video Editing</h3>
                  </Checkbox>
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">Screen</h2>
                  <LabelledInput
                    args={{
                      name: "Screen name",
                      label: "Screen name",
                      placeholder: "Unknown",
                      type: "text",
                      value: displayName,
                      color: 3,
                      onChange: (value) => {
                        setDisplayName(value as string);
                      },
                    }}
                  />

                  <LabelledInput
                    args={{
                      name: "Screen size",
                      label: "Screen size",
                      placeholder: "0",
                      type: "number",
                      value: size,
                      color: 3,
                      onChange: (value) => {
                        setSize(parseFloat(value as string));
                      },
                    }}
                  />

                  <LabelledInput
                    args={{
                      name: "Screen resolution",
                      label: "Screen resolution",
                      placeholder: "0",
                      type: "number",
                      value: resolution,
                      color: 3,
                      onChange: (value) => {
                        setResolution(parseFloat(value as string));
                      },
                    }}
                  />
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">CPU</h2>

                  <div className="column gapSmall">
                    <LabelledInput
                      args={{
                        name: "CPU Name",
                        label: "CPU Name",
                        placeholder: "Unknown",
                        type: "text",
                        value: cpuName,
                        color: 3,
                        onChange: (value) => {
                          setCpuName(value as string);
                        },
                      }}
                    />

                    <LabelledInput
                      args={{
                        name: "Threads",
                        label: "Threads",
                        placeholder: "0",
                        type: "number",
                        value: cores,
                        color: 3,
                        onChange: (value) => {
                          setCores(parseInt(value as string));
                        },
                      }}
                    />

                    <LabelledInput
                      args={{
                        name: "Top Frequency",
                        label: "Top Frequency",
                        placeholder: "0",
                        type: "number",
                        value: topFrequency,
                        color: 3,
                        onChange: (value) => {
                          setTopFrequency(parseFloat(value as string));
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">Storage and Memory</h2>
                  <div className="column gapSmall">
                    <LabelledInput
                      args={{
                        name: "Storage Name",
                        label: "Storage Name",
                        placeholder: "Unknown",
                        type: "text",
                        value: storageName,
                        color: 3,
                        onChange: (value) => {
                          setStorageName(value as string);
                        },
                      }}
                    />

                    <LabelledInput
                      args={{
                        name: "Storage",
                        label: "Storage (GB)",
                        placeholder: "0",
                        type: "number",
                        value: storage,
                        color: 3,
                        onChange: (value) => {
                          setStorage(parseFloat(value as string));
                        },
                      }}
                    />

                    <LabelledInput
                      args={{
                        name: "RAM",
                        label: "RAM (GB)",
                        placeholder: "0",
                        type: "number",
                        value: ram,
                        color: 3,
                        onChange: (value) => {
                          setRam(parseFloat(value as string));
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">GPU</h2>
                  <div className="column gapSmall">
                    <LabelledInput
                      args={{
                        name: "GPU Name",
                        label: "GPU Name",
                        placeholder: "",
                        type: "text",
                        value: gpuName,
                        color: 3,
                        onChange: (value) => {
                          setGpuName(value as string);
                        },
                      }}
                    />

                    <Checkbox
                      id="hasDedicatedGPU"
                      checked={hasDedicatedGpu}
                      onChange={(checked) => setHasDedicatedGpu(checked)}
                    >
                      Has dedicated GPU
                    </Checkbox>

                    <LabelledInput
                      args={{
                        name: "VRAM",
                        label: "VRAM",
                        placeholder: "0",
                        type: "number",
                        value: vram,
                        color: 3,
                        onChange: (value) => {
                          setVram(parseFloat(value as string));
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="column gapSmall">
                  <h2 className="textMedium headerSmall">Operating systems</h2>
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
                      <Image src={macIcon} alt="mac" className="osIcon" />
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
                </div>

                <div className="column centerColumn gapMedium">
                  {titleImageFile && (
                    <img
                      style={{ maxWidth: "180px" }}
                      src={URL.createObjectURL(titleImageFile)}
                      alt="Title image"
                    />
                  )}
                  <div className="column gapSmall">
                    <h3 className="textSmall">Upload an image</h3>
                    <input
                      className="button buttonBg3"
                      type="file"
                      accept="image/webp"
                      alt="Image upload"
                      onChange={(e) => {
                        "use client";
                        const files = e.target.files;
                        if (files == null) return;

                        const file = files[0];
                        setTitleImageFile(file);
                      }}
                    />
                  </div>
                </div>

                <LabelledInput
                  args={{
                    name: "affiliate",
                    label: "Affiliate link",
                    placeholder: "Affiliate link",
                    type: "text",
                    value: affiliate,
                    color: 3,
                    onChange: (value) => {
                      setAffiliate(value as string);
                    },
                  }}
                />
              </div>
              <div className="column gapMedium centerColumn">
                <h3 className="textMedium headerSmall">Authentication</h3>
                <LabelledInput
                  args={{
                    name: "username",
                    label: "Username",
                    placeholder: "Username",
                    type: "text",
                    value: username,
                    color: 3,
                    onChange: (value) => {
                      setUsername(value as string);
                    },
                  }}
                />

                <LabelledInput
                  args={{
                    name: "password",
                    label: "Password",
                    placeholder: "Password",
                    type: "password",
                    value: password,
                    color: 3,
                    onChange: (value) => {
                      setPassword(value as string);
                    },
                  }}
                />

                <button
                  onClick={submit}
                  disabled={submitted}
                  className="button buttonPrimary row gapSmall"
                >
                  {submitted ? (
                    <>
                      Submitted
                      <span className="material-symbols-outlined">check</span>
                    </>
                  ) : (
                    <>
                      Submit
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>

               
              </div>
            </div>
          </div>
          <div className="column centerColumn stickyDesktopTop">
            <LaptopView
              data={{
                id: "fakeId",
                titleImageId: "default",
                name: laptopName,
                forStudents,
                forGaming,
                forProgrammers,
                forOfficeWork,
                forVideoEditing,
                studentScore: 0,
                gamingScore: 0,
                programmingScore: 0,
                officeWorkScore: 0,
                videoEditingScore: 0,
                cpuName,
                gpuName,
                vram,
                cores,
                topFrequency,
                ram,
                windows,
                macos,
                linux,
                storage,
                storageName,
                displayName,
                size,
                resolution,
                hasDedicatedGpu,
                price,
                saleOf,
                priceHistory: [0, 0, 0, 0, 0, 0],
                affiliate,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
