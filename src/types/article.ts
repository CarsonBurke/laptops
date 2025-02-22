export interface Article {
    title: string,
    id: string,
    summary: string;
    content: string,
    titleImageId: string,
    contentImageIds: string[],
    authorId: string,
    published: Date,
}