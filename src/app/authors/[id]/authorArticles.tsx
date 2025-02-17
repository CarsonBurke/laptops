import ArticlePreview from "@/components/articlePreview";
import { trpc } from "@/lib/trpc";

export default function AuthorArticles({ authorId }: { authorId: string }) {
  const { isLoading, data } = trpc.getAuthorArticles.useQuery({
    offset: 0,
    limit: 12,
    authorId,
  });

  return (
    <div className="row flexWrap gapSmall">
      {isLoading ? (
        <></>
      ) : (
        data?.map((article) => (
          <ArticlePreview
            key={article.id}
            args={{ data: article as any, color: "background3" }}
          />
        ))
      )}
    </div>
  );
}
