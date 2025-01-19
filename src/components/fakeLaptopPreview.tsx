import "./laptopPreview.scss"

export default function FakeLaptopPreview({ color, }: { color?: string }) {
    return (
        <div className="laptopPreview defaultBorderRadius row gapMedium paddingMedium" style={{ borderColor: `var(--${color})`}}>
            <div className={color + " laptopPreviewImage animatePlaceholder defaultBorderRadius"}></div>
            <div className="column gapSmall width100">
                <div className={color + " fakeLaptopPreviewTitle animatePlaceholder defaultBorderRadius"}></div>
                <div className={color + " fakeLaptopPreviewPrice animatePlaceholder defaultBorderRadius"}></div>
            </div>
        </div>
    )
}

export function generateFakeLaptopPreviews(count: number, color: string) {
    const articlePreviews = []
    for (let i = 0; i < count; i++) {
        articlePreviews.push(<FakeLaptopPreview key={i} color={color} />)
    }
    return articlePreviews
}