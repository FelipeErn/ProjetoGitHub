import { CaretDown, X } from "@phosphor-icons/react";
import { useState } from "react";


interface FilterProps {
  onApplyFilters: (filters: { type: string[]; language: string[] }) => void;
}

const Filters = ({ onApplyFilters }: FilterProps) => {
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

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
    setShowTypeModal(false);
    setShowLanguageModal(false);
  };

  return (
    <div className="mt-2 flex flex-row gap-2 p-2.5 w-full bg-gray-100 rounded-xl md:bg-transparent md:p-0">
      <button
        onClick={() => setShowTypeModal(true)}
        className="flex flex-row items-center justify-center gap-0 rounded-3xl text-white text-center font-medium py-2 px-2 bg-blue-600 md:py-1.5"
      >
        <CaretDown size={16} color="#ffffff" weight="bold" />
        <span className="text-sm font-light px-3">Type</span>
      </button>
  
      <button
        onClick={() => setShowLanguageModal(true)}
        className="flex flex-row items-center justify-center gap-0 rounded-3xl text-white text-center font-medium py-2 px-2 bg-blue-600 md:py-1.5"
      >
        <CaretDown size={16} color="#ffffff" weight="bold" />
        <span className="text-sm font-light px-3">Language</span>
      </button>
  
      {showTypeModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full h-full p-6">
            <button
              onClick={() => setShowTypeModal(false)}
              className="absolute top-8 right-6 text-red-500"
            >
              <X size={24} color="#fe354d" weight="bold" />
            </button>
            <h3 className="font-bold text-2xl mb-12 text-start">Type</h3>
            {["All", "Forks", "Archived", "Mirrors", "Starred"].map((type) => (
              <label key={type} className="mb-5 flex leading-none items-center">
                <input
                  type="checkbox"
                  checked={selectedType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="h-5 w-5 mr-4"
                />
                {type}
              </label>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={applyFilters}
                className="flex flex-row items-center justify-center gap-4 rounded-3xl text-white text-center font-medium py-2 px-4 bg-blue-600 mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
  
      {showLanguageModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative w-full h-full p-6">
            <button
              onClick={() => setShowLanguageModal(false)}
              className="absolute top-8 right-6 text-red-500"
            >
              <X size={24} color="#fe354d" weight="bold" />
            </button>
            <h3 className="font-bold text-2xl mb-12 text-start">Language</h3>
            {["All", "Java", "TypeScript", "HTML", "CSS"].map((lang) => (
              <label key={lang} className="mb-5 flex leading-none items-center">
                <input
                  type="checkbox"
                  checked={selectedLanguage.includes(lang)}
                  onChange={() => handleLanguageChange(lang)}
                  className="h-5 w-5 mr-4"
                />
                {lang}
              </label>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={applyFilters}
                className="flex flex-row items-center justify-center gap-4 rounded-3xl text-white text-center font-medium py-2 px-4 bg-blue-600 mt-4"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Filters;
