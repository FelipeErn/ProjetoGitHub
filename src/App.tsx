import { useState, useEffect } from "react";
import { useStore } from "./store";
import Profile from "./components/Profile";
import Repositories from "./components/Repositories";
import Header from "./components/Header";
import Starred from "./components/Starred";

export default function App() {
  const [selectedTab, setSelectedTab] = useState<"repositories" | "starred">("repositories");
  const { repositoriesCount, starredCount, fetchRepositoriesCount, fetchStarredCount } = useStore();

  useEffect(() => {
    fetchRepositoriesCount();
    fetchStarredCount();
  }, [fetchRepositoriesCount, fetchStarredCount]);

  return (
    <div className="flex align-center flex-col h-screen gap-10">
      <div className="mb-18">
        <Header />
      </div>

      <div className="flex flex-row justify-evenly items-start">
        <Profile />
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-4 w-full">
            <button
              className={`px-4 py-2 rounded ${selectedTab === "repositories" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              onClick={() => setSelectedTab("repositories")}
            >
              Repositórios: {repositoriesCount}
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedTab === "starred" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
              onClick={() => setSelectedTab("starred")}
            >
              Favoritos: {starredCount}
            </button>
          </div>

          {selectedTab === "repositories" ? <Repositories /> : <Starred />}
        </div>
      </div>
    </div>
  );
}
