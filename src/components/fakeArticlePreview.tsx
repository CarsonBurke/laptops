import "./articlePreview.scss"

export default function FakeArticlePreview({ color, }: { color?: string }) {
    return (
        <div className="articlePreview defaultBorderRadius column gapMedium paddingMedium" style={{ borderColor: `var(--${color})`}}>
            <div className={color + " articlePreviewImage animatePlaceholder defaultBorderRadius"}></div>
            <div className="column gapSmall width100">
                <div className={color + " fakeArticlePreviewTitle animatePlaceholder defaultBorderRadius"}></div>
            </div>
        </div>
    )
}

export function generateFakeArticlePreviews(count: number, color: string) {
    const articlePreviews = []
    for (let i = 0; i < count; i++) {
        articlePreviews.push(<FakeArticlePreview key={i} color={color} />)
    }
    return articlePreviews
}