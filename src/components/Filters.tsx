import { useState } from "react";

interface FilterProps {
  onApplyFilters: (filters: { type: string[]; language: string[] }) => void;
}

const Filters = ({ onApplyFilters }: FilterProps) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  const handleTypeChange = (type: string) => {
    let newTypes = [...selectedType];
    
    if (type === "All") {
      newTypes = newTypes.includes("All") ? [] : ["All"];
    } else {
      if (newTypes.includes(type)) {
        newTypes = newTypes.filter((t) => t !== type); 
      } else {
        newTypes.push(type); 
      }
    }

    if (newTypes.includes("All") && newTypes.length > 1) {
      newTypes = newTypes.filter((t) => t !== "All");
    }

    setSelectedType(newTypes);
  };

  const handleLanguageChange = (language: string) => {
    let newLanguages = [...selectedLanguage];
    
    if (language === "All") {
      newLanguages = newLanguages.includes("All") ? [] : ["All"];
    } else {
      if (newLanguages.includes(language)) {
        newLanguages = newLanguages.filter((l) => l !== language); 
      } else {
        newLanguages.push(language); 
      }
    }

    if (newLanguages.includes("All") && newLanguages.length > 1) {
      newLanguages = newLanguages.filter((l) => l !== "All");
    }

    setSelectedLanguage(newLanguages);
  };

  const applyFilters = () => {
    onApplyFilters({ type: selectedType, language: selectedLanguage });
  };

  return (
    <div className="p-4 border rounded shadow-lg">
      <button
        onClick={() => setShowTypeOptions(!showTypeOptions)}
        className="w-full text-left font-bold py-2 px-4 bg-gray-200 rounded mb-2"
      >
        Filter by Type
      </button>
      {showTypeOptions && (
        <div className="mb-4">
          {["All", "Forks", "Archived", "Mirrors"].map((type) => (
            <label key={type} className="block">
              <input
                type="checkbox"
                checked={selectedType.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              {type}
            </label>
          ))}
          <button
            onClick={applyFilters}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
        </div>
      )}

      <button
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
        className="w-full text-left font-bold py-2 px-4 bg-gray-200 rounded mb-2"
      >
        Filter by Language
      </button>
      {showLanguageOptions && (
        <div className="mb-4">
          {["All", "Java", "TypeScript", "HTML", "CSS"].map((lang) => (
            <label key={lang} className="block">
              <input
                type="checkbox"
                checked={selectedLanguage.includes(lang)}
                onChange={() => handleLanguageChange(lang)}
              />
              {lang}
            </label>
          ))}
          <button
            onClick={applyFilters}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
