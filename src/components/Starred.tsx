import { useEffect, useState } from "react";
import Search from "./Search";
import Filters from "./Filters";
import { GitBranch } from "@phosphor-icons/react";

interface Starred {
  name: string;
  language: string | null;
  forks_count: number;
  description: string | null;
  archived: boolean;
  mirror_url: string | null;
  html_url: string;
}

const Starred = () => {
  const [starred, setStarred] = useState<Starred[]>([]);
  const [filteredStarred, setFilteredStarred] = useState<Starred[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<{
    type: string[];
    language: string[];
  }>({
    type: ["All"],
    language: [],
  });

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/gabrielscordeiro/starred"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data: Starred[] = await response.json();
        setStarred(data);
        setFilteredStarred(data);
      } catch (err) {
        console.error("Error fetching Starreds:", err);
      }
    };

    fetchStarred();
  }, []);

  useEffect(() => {
    let filtered = starred;

    if (filters.type.length && !filters.type.includes("All")) {
      filtered = filtered.filter((repo) =>
        (filters.type.includes("Forks") && repo.forks_count > 0) ||
        (filters.type.includes("Archived") && repo.archived) ||
        (filters.type.includes("Mirrors") && repo.mirror_url !== null)
      );
    }

    if (filters.language.length && !filters.language.includes("All")) {
      filtered = filtered.filter((repo) =>
        filters.language.includes(repo.language || "Desconhecida")
      );
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStarred(filtered);
  }, [filters, searchQuery, starred]);

  const handleRepositoryClick = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full md:flex-col-reverse md:gap-4 lg:flex-row">
        <div className="w-full flex-row gap-4 items-center hidden md:flex">
          <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
        <Filters onApplyFilters={setFilters} />
      </div>

      <ul className="space-y-2 w-full">
        {filteredStarred.length > 0 ? (
          filteredStarred.map((repo) => (
            <li
              key={repo.name}
              className="flex flex-col gap-3 border-b border-gray-100 py-8 m-0 lg:border-transparent lg:gap-2 lg:py-6 cursor-pointer"
              onClick={() => handleRepositoryClick(repo.html_url)}
            >
              <span className="text-xl font-light">{repo.name}</span>
              <span className="text-sm text-gray-500 font-light">{repo.description || "Sem descrição"}</span>
              <div className="flex flex-row justify-start gap-12">
                <span className="flex items-center leading-none gap-2">{repo.language}</span>
                <span className="flex items-center leading-none gap-2"><GitBranch size={20} weight="fill" /> {repo.forks_count}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Nenhum repositório encontrado.</p>
        )}
      </ul>
    </div>
  );
};

export default Starred;
