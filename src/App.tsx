import { useState, useEffect } from "react";
import { useStore } from "./store";
import Profile from "./components/Profile";
import Repositories from "./components/Repositories";
import Header from "./components/Header";
import Starred from "./components/Starred";
import { BookBookmark, Star } from "@phosphor-icons/react";

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
        <div className="flex flex-col items-center container">
          <div className="flex gap-16 mb-4 w-full">
            <button
              className={`flex gap-2 px-1 py-2  ${selectedTab === "repositories" ? "border-b text-black" : "text-gray-400 font-normal"}`}
              onClick={() => setSelectedTab("repositories")}
            >
             <div className="text-xl flex gap-4 items-center leading-none"><BookBookmark size={26} /> Repositories <span className="bg-gray-300 rounded-3xl border border-gray-600 text-sm px-3 py-0.5">{repositoriesCount}</span></div>
            </button>
            <button
              className={`flex gap-2 spx-4 py-2 ${selectedTab === "starred" ? "border-b text-black" : "text-gray-400 font-normal"}`}
              onClick={() => setSelectedTab("starred")}
            >
              <div className="text-xl flex gap-4 items-center leading-none"><Star size={26} /> Starred <span className="bg-gray-300 rounded-3xl border border-gray-600 text-sm px-3 py-0.5">{starredCount}</span></div>
            </button>
          </div>

          {selectedTab === "repositories" ? <Repositories /> : <Starred />}
        </div>
      </div>
    </div>
  );
}
