export interface Article {
    title: string,
    id: string,
    content: string,
    titleImageId: string,
    contentImageIds: string[],
    authorId: string,
    published: Date,
}