"use client";

import ArticleView from "@/app/articles/[id]/article";
import Article from "@/articles/[id]/page";
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

export default function LaptopUpload() {
  let [laptopName, setLaptopName] = useState("Laptop Name");

  // Scores

  // Categories

  let [titleImageName, setTitleImageName] = useState("");
  let [titleImageFile, setTitleImageFile] = useState<File | null>(null);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [linux, setLinux] = useState(true);
  let [macos, setMac] = useState(true);
  let [windows, setWindows] = useState(true);

  // Score

  let [studentScore, setStudentScore] = useState(0)
  let [programmingScore, setProgrammingScore] = useState(0)
  let [gamingScore, setGamingScore] = useState(0)
  let [officeWorkScore, setOfficeWorkScore] = useState(0)
  let [videoEditingScore, setVideoEditingScore] = useState(0)

    // Specs

    // cpu - top freq, name, cores
    
    // gpu - dedicated t/f, vram num

    // storage, ram
    
    // Screen - resolution, size

    // categories that fit - student, gaming, programming, office work, video editing

    // price

    // 

    //

  let [submitted, setSubmitted] = useState(false);

  const createLaptop = trpc.insertLaptop.useMutation();

  async function submit() {
    if (submitted) return;
    console.log("providing titleImageFile", titleImageFile);

    const titleImage = await titleImageFile?.arrayBuffer();

    const result = createLaptop.mutate({
      name: laptopName,
      username,
      password,
      titleImageName,
      titleImage: titleImage as any,
    });

    setSubmitted(true);

    console.log("Submitted");
  }

  return (
    <main className="main">
      <section className="sectionPadded row gapMedium">
        <div className="column gapMedium">
          <div className="column gapLarge centerColumn background2 borderBg3 paddingMedium">
            <div className="column centerColumn gapMedium">
              <h1 className="textLarge headerLarge textCenter">
                Upload Laptop
              </h1>

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

              <div className="column">
                <Checkbox
                  id="windowsCheck"
                  checked={windows}
                  onChange={(checked) => setWindows(checked)}
                >
                  <Image src={windowsIcon} alt="windows" className="osIcon" />
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

              <LabelledInput
                args={{
                  name: "Title image name",
                  label: "Title image name",
                  placeholder: "Title image name",
                  type: "text",
                  value: titleImageName,
                  color: 3,
                  onChange: (value) => {
                    setTitleImageName(value as string);
                  },
                }}
              />

              <div className="row centerColumn gapMedium">
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
                    accept="image/png"
                    alt="Image upload"
                    onChange={(e) => {
                      "use client";
                      const file = e.target.files;
                      console.log("file", file);

                      if (file != null)
                        console.log("url", URL.createObjectURL(file[0]));

                      if (file != null)
                        console.log(
                          "name",
                          file[0].arrayBuffer().then((a) => a)
                        );

                      setTitleImageFile(file == null ? null : file[0]);
                    }}
                    onInput={(e) => console.log("input", e)}
                  />
                </div>
              </div>
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
                    Sent<span className="material-symbols-outlined">check</span>
                  </>
                ) : (
                  <>
                    Send<span className="material-symbols-outlined">send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="column width100 centerColumn">
          {/* <LaptopView
            data={{
              id: "fakeId",
              titleImageName: "Macbook_Guide_2025_01_30",
              name: laptopName,
              gamingScore,
              studentScore,
              programmingScore,
              officeWorkScore,
            }}
          /> */}
        </div>
      </section>
    </main>
  );
}
