import Script from "next/script";

export function LayoutHead() {
  return (
    <head lang="en">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js"  />
    </head>
  );
}
