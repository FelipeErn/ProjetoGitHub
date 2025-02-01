import { useEffect, useState } from "react";
import Search from "./Search";
import Filters from "./FIlters";

interface Starred {
  name: string;
  language: string | null;
  forks_count: number;
  description: string | null;
  archived: boolean;
  mirror_url: string | null;
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

  return (
    <div className="flex flex-col items-center gap-4">

      <Search searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Filters onApplyFilters={setFilters} />

      <ul className="mt-4 space-y-2">
        {filteredStarred.length > 0 ? (
          filteredStarred.map((repo) => (
            <li key={repo.name} className="border p-2 rounded">
              <strong>Nome:</strong> {repo.name} <br />
              <strong>Linguagem:</strong> {repo.language || "Desconhecida"}{" "}
              <br />
              <strong>Forks:</strong> {repo.forks_count} <br />
              <strong>Descrição:</strong> {repo.description || "Sem descrição"}{" "}
              <br />
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
