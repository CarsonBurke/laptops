import "./laptopPreview.scss";

export default function FakeLaptopPreview({ color }: { color?: string }) {
  return (
    <div
      className="laptopPreview defaultBorderRadius row gapMedium paddingMedium"
      style={{ borderColor: `var(--${color})` }}
    >
      <div
        className={
          color + " laptopPreviewImage animatePlaceholder defaultBorderRadius"
        }
      ></div>
      <div className="column gapSmall width100">
        <div
          className={
            color +
            " fakeLaptopPreviewPrice animatePlaceholder defaultBorderRadius"
          }
          style={{ height: "20px"}}
        ></div>
      </div>
    </div>
  );
}

export function generateFakeLaptopPreviews(count: number, color: string) {
  const laptopPreviews = [];
  for (let i = 0; i < count; i++) {
    laptopPreviews.push(<FakeLaptopPreview key={i} color={color} />);
  }
  return laptopPreviews;
}
