interface SearchProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
  }
  
  const Search = ({ searchQuery, onSearchChange }: SearchProps) => {
    return (
      <div className="border p-4 rounded shadow-lg sm:w-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar repositório"
          className="mt-4 p-2 border border-gray-300 rounded w-full"
        />
      </div>
    );
  };
  
  export default Search;
  