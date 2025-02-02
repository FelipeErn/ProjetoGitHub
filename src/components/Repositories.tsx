import { useEffect, useState } from "react";
import Filters from "./Filters";
import Search from "./Search";
import { GitBranch, Star } from "@phosphor-icons/react";

interface Repository {
  name: string;
  language: string | null;
  forks_count: number;
  description: string | null;
  archived: boolean;
  mirror_url: string | null;
  stargazers_count: number;
}

const Repositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filteredRepositories, setFilteredRepositories] = useState<
    Repository[]
  >([]);
  const [filters, setFilters] = useState<{
    type: string[];
    language: string[];
  }>({ type: [], language: [] });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/gabrielscordeiro/repos"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data: Repository[] = await response.json();
        setRepositories(data);
        setFilteredRepositories(data);
      } catch (err) {
        console.error("Error fetching repositories:", err);
      }
    };

    fetchRepositories();
  }, []);

  useEffect(() => {
    let filtered = repositories;

    if (filters.type.length && !filters.type.includes("All")) {
      filtered = filtered.filter(
        (repo) =>
          (filters.type.includes("Forks") && repo.forks_count > 0) ||
          (filters.type.includes("Archived") && repo.archived) ||
          (filters.type.includes("Mirrors") && repo.mirror_url !== null) ||
          (filters.type.includes("Starred") && repo.stargazers_count > 0)
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

    setFilteredRepositories(filtered);
  }, [filters, repositories, searchQuery]);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="w-full flex flex-row gap-4 items-center">
        <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Filters onApplyFilters={setFilters} />
      </div>

      <ul className="mt-4 space-y-2 w-full">
        {filteredRepositories.length > 0 ? (
          filteredRepositories.map((repo) => (
            <li key={repo.name} className="flex flex-col gap-2 p-2 rounded">
              <span className="text-xl font-light">{repo.name}</span>
              <span className="text-sm text-gray-500 font-light">{repo.description || "Sem descrição"} </span>
              <div className="flex flex-row justify-start gap-4">
                <span className="flex items-center leading-none gap-2"><Star size={20} weight="fill" /> {repo.stargazers_count}</span>
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

export default Repositories;
