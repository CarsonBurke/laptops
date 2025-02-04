"use client";

import LabelledInput from "@/components/labelledInput";
import LabelledTextarea from "@/components/labelledTextarea";
import { trpc } from "@/lib/trpc";
import { Submitted } from "@/types/general";
import { useEffect, useState } from "react";

export default function Contact() {
  let [name, setName] = useState("");
  let [title, setTitle] = useState("");
  let [message, setMessage] = useState("");
  let [submitted, setSubmitted] = useState(false);

  const sendContact = trpc.sendContact.useMutation();

  function submit() {
    sendContact.mutate({
      name,
      title,
      content: message,
    });

    setSubmitted(true)
  }

  return (
    <main className="main">
      <section className="sectionPadded column gapMedium centerColumn">
        <div className="column">
          <h1 className="textLarge headerLarge textCenter">Contact</h1>
          <h3 className="textSmall textSlightTransparent">Send us a message</h3>
        </div>

        <div className="borderBg2 paddingMedium background2 borderBg3">
          <div className="column gapMedium centerColumn">
            <LabelledInput
              args={{
                name: "Your name",
                label: "Your name",
                placeholder: "Your name",
                type: "text",
                value: name,
                color: 3,
                onChange: (value) => {
                  setName(value as string);
                },
              }}
            />

            <LabelledInput
              args={{
                name: "title",
                label: "Title",
                placeholder: "Title",
                type: "text",
                value: title,
                color: 3,
                onChange: (value) => setTitle(value as string),
              }}
            />

            <LabelledTextarea
              args={{
                name: "message",
                label: "Message",
                placeholder: "Your message",
                value: message,
                color: 3,
                onChange: (value) => setMessage(value as string),
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
      </section>
    </main>
  );
}
