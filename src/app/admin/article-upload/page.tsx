"use client";

import ArticleView from "@/app/articles/[id]/article";
import LabelledInput from "@/components/labelledInput";
import LabelledTextarea from "@/components/labelledTextarea";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useRouter } from "next/navigation";
import AdminLock from "../admin";

export default function ArticleUpload() {
  let [articleTitle, setArticleTitle] = useState("Article Name");
  let [articleContent, setArticleContent] = useState("Article content");
  let [authorId, setAuthorId] = useState(
    "9190056e-e5e8-11ef-ab3a-779b9e2bdc5c"
  );

  let [titleImageFile, setTitleImageFile] = useState<File | null>(null);
  let [contentImageFiles, setContentImageFiles] = useState<File[] | null>(null);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let [submitted, setSubmitted] = useState(false);

  const createArticle = trpc.insertArticle.useMutation();

  async function submit() {
    if (submitted) return;

    // Title image

    const titleImageBuffer = await titleImageFile?.arrayBuffer();
    const titleImageArray = new Uint8Array(titleImageBuffer as any);

    // Content images

    const contentImageArrays = [];

    for (const file of contentImageFiles || []) {
      const contentImageBuffer = await file?.arrayBuffer();
      const contentImageArray = new Uint8Array(contentImageBuffer as any);
      contentImageArrays.push(contentImageArray);
    }
    //

    const result = createArticle.mutate({
      title: articleTitle,
      content: articleContent,
      username,
      password,
      authorId,
      titleImage: titleImageArray,
      contentImages: contentImageArrays,
    });

    setSubmitted(true);
  }

  const router = useRouter();

  return (
    <main className="main">
      <section className="sectionPadded column gapMedium">
        <AdminLock />
        <div className="rowCollapsible gapMedium">
          <div className="column gapMedium">
            <div className="column gapLarge centerColumn background2 borderBg3 paddingMedium">
              <div className="column centerColumn gapMedium">
                <h1 className="textLarge headerLarge textCenter">
                  Upload Article
                </h1>

                <div className="row gapSmall flexWrap">
                  <LabelledInput
                    args={{
                      name: "title",
                      label: "Title",
                      placeholder: "Title",
                      type: "text",
                      value: articleTitle,
                      color: 3,
                      onChange: (value) => {
                        setArticleTitle(value as string);
                      },
                    }}
                  />

                  <LabelledInput
                    args={{
                      name: "authorId",
                      label: "Author ID",
                      placeholder: "Author ID",
                      type: "text",
                      value: authorId,
                      color: 3,
                      onChange: (value) => {
                        setAuthorId(value as string);
                      },
                    }}
                  />
                </div>

                <LabelledTextarea
                  args={{
                    name: "article",
                    label: "Article",
                    placeholder: "Article",
                    value: articleContent,
                    color: 3,
                    onChange: (value) => {
                      setArticleContent(value as string);
                    },
                  }}
                />

                {/* Title image */}

                <div className="row gapMedium">
                  <div className="column gapSmall">
                    {titleImageFile && (
                      <img
                        style={{ maxWidth: "180px" }}
                        src={URL.createObjectURL(titleImageFile as any)}
                        alt="Title image"
                        className="defaultBorderRadius"
                      />
                    )}
                  </div>
                  <div className="column gapSmall">
                    <h3 className="textSmall">Title image</h3>

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

                {/* Content images */}

                <div className="row gapMedium">
                  <div className="column gapSmall">
                    {contentImageFiles &&
                      contentImageFiles.map((file, i) => {
                        return (
                          <img
                            key={i}
                            style={{ maxWidth: "180px" }}
                            src={URL.createObjectURL(file)}
                            alt="Title image"
                            className="defaultBorderRadius"
                          />
                        );
                      })}
                  </div>
                  <div className="column gapSmall">
                    <h3 className="textSmall">Content images</h3>

                    <input
                      className="button buttonBg3"
                      type="file"
                      accept="image/webp"
                      multiple
                      alt="Image upload"
                      onChange={(e) => {
                        "use client";
                        const files = e.target.files;
                        if (files == null) return;

                        const fileArray = [];

                        for (const file of files) {
                          fileArray.push(file);
                        }

                        setContentImageFiles(fileArray);
                      }}
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
          <div className="column width100 centerColumn">
            <ArticleView
              args={{
                data: {
                  id: "fakeId",
                  published: new Date(),
                  authorId: authorId,
                  titleImageId: "default",
                  contentImageIds: [],
                  title: articleTitle,
                  content: articleContent,
                },
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
