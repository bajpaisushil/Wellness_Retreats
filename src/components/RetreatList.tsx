import React, { useState, useEffect } from "react";
import RetreatCard from "./RetreatCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

interface Retreat {
  id: string;
  title: string;
  description: string;
  date: number;
  location: string;
  price: number;
  image: string;
}

const RetreatList: React.FC = () => {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [filters, setFilters] = useState({ type: "", date: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [debouncedSearch, setDebouncedSearch]=useState(search);

  useEffect(()=>{
    const timeoutId=setTimeout(()=>{
      setDebouncedSearch(search);
    }, 500);
    return ()=>{
      clearTimeout(timeoutId);
    }
  })

  useEffect(() => {
    const fetchRetreats = async () => {
      let url = `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=3`;

      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      if (filters.type) {
        url += `&filter=${encodeURIComponent(filters.type)}`;
      }

      if (filters.date) {
        const unixTimestamp = new Date(filters.date).getTime() / 1000;
        console.log("unixTimestamp=", unixTimestamp);
        url += `&date=${unixTimestamp}`;
      }

      try {
        const totalCountResponse = await fetchTotalCount();
        const calculatedTotalPages = Math.ceil(totalCountResponse / 3);
        setTotalPages(calculatedTotalPages);

        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          setRetreats(data);
          setError(null);
        } else {
          setError("No retreats found for the selected filters!");
          setRetreats([]);
        }
      } catch (error) {
        console.error("Error fetching retreats:", error);
        setError("An error occurred while fetching retreats.");
        setRetreats([]);
      }
    };

    const fetchTotalCount = async (): Promise<number> => {
      try {
        const response = await fetch(
          `https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?limit=1`
        );
        const data = await response.json();
        return data.length;
      } catch (error) {
        console.error("Error fetching total count:", error);
        return 0;
      }
    };

    fetchRetreats();
  }, [filters, debouncedSearch, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <Filters
        onFilterChange={(filter) => setFilters(filter)}
        onSearchChange={(search) => setSearch(search)}
      />
      {error ? (
        <div className="flex flex-col items-center justify-center p-2 text-center mt-4">
          <p className="text-[1.4rem] font-semibold">{error}</p>
          <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExb21ieDgxaXFiNWg0NGJncmFpM2tmMmd4cnZ4dDdsdTFzOHBvOXUzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4EoZ1rJtDfypcna8/giphy.gif"
            className="lg:w-[25rem] rounded-full mt-4"
          />
        </div>
      ) : retreats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {retreats.map((retreat) => (
            <RetreatCard key={retreat.id} retreat={retreat} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-4">
          <p>No retreats found.</p>
        </div>
      )}
      {retreats.length > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RetreatList;
