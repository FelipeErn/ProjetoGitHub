import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
  }
  const Search = ({ searchQuery, onSearchChange }: SearchProps) => {
    return (
      <div className="relative w-full">
        <MagnifyingGlass 
          size={28} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Here"
          className="text-xl pl-14 p-2 border-b border-gray-300 w-full outline-none "
        />
      </div>
    );
  };
  
  export default Search;
  