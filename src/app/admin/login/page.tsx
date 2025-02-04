import LabelledInput from "@/components/labelledInput";

export default function Login() {
  return (
    <main className="main">
      <section className="sectionPadded">
        <div className="column background2 borderBg3 gapMedium paddingMedium">
          <h1 className="textLarge">Login</h1>

          <LabelledInput
            args={{
              name: "username",
              label: "Username",
              placeholder: "Username",
              type: "text",
              value: "",
              color: 2,
              onChange: () => {},
            }}
          />

          <LabelledInput
            args={{
              name: "password",
              label: "Password",
              placeholder: "Password",
              type: "password",
              value: "",
              color: 2,
              onChange: () => {},
            }}
          />
        </div>
      </section>
    </main>
  );
}
