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
    <div className="flex flex-col h-screen w-full gap-10 items-center mt-10">
      <div className="w-full fixed top-0 left-0 z-10">
        <Header />
      </div>
  
      <div className="flex flex-col justify-start items-start w-full px-5 pt-24 md:flex-row md:pt-20 md:gap-10 lg:gap-0 lg:container">
        <Profile />
        <div className="flex flex-col items-start justify-start w-full max-w-4xl">
          <div className="flex gap-4 mb-4 justify-start w-full md:gap-10 md:mb-6">
            <button
              className={`flex gap-2 px-2.5 py-2 ${selectedTab === "repositories" ? "border-b-2 border-orange-400 text-black" : "text-gray-400 font-normal"}`}
              onClick={() => setSelectedTab("repositories")}
            >
              <div className="text-base flex gap-2 items-center leading-none">
                <BookBookmark size={26} weight="bold" /> Repositories
                <span className="bg-gray-200 rounded-3xl border border-gray-400 text-sm px-3 py-0.5 md:ml-2">
                  {repositoriesCount}
                </span>
              </div>
            </button>
            <button
              className={`flex gap-2 px-2.5 py-2 ${selectedTab === "starred" ? "border-b-2 border-orange-400 text-black" : "text-gray-400 font-normal"}`}
              onClick={() => setSelectedTab("starred")}
            >
              <div className="text-base flex gap-2 items-center leading-none">
                <Star size={26} weight="bold" /> Starred
                <span className="bg-gray-200 rounded-3xl border border-gray-400 text-sm px-3 py-0.5 md:ml-2">
                  {starredCount}
                </span>
              </div>
            </button>
          </div>
  
          {selectedTab === "repositories" ? <Repositories /> : <Starred />}
        </div>
      </div>
    </div>
  );
  
  
}
