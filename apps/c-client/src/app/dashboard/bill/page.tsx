import OrdersFeed from "./_components/OrderFeeds";
import SearchBar from "./_components/SearchBar";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { keyword = "", range = "" } = await searchParams;

  return (
    <div>
      <SearchBar />
      <div className="px-4 py-6 pt-20 space-y-4">
        <OrdersFeed keyword={keyword} range={range} />
      </div>
    </div>
  );
}
