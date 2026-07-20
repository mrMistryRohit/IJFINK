import AcceptedArticlesPage from "@/components/publication-dashboard/AcceptedArticlesPage";
import type { PublicationArticle } from "@/lib/publicationApi";

type Props = {
  articles: PublicationArticle[];
  isLoading: boolean;
  error: string;
  onRefresh: () => Promise<void>;
};

const InQueueArticlesPage = (props: Props) => (
  <AcceptedArticlesPage
    {...props}
    eyebrow="Publication workflow"
    heading="Articles In-Queue"
    emptyMessage="No articles are currently in the publication queue."
    loadingMessage="Loading queued articles…"
    backLabel="Back to articles in queue"
    dateLabel="Updated"
  />
);

export default InQueueArticlesPage;
