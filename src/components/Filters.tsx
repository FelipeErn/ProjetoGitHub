import { CaretDown } from "@phosphor-icons/react";
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
    <div className="flex flex-row gap-2 p-4 w-full">
      <button
        onClick={() => setShowTypeModal(true)}
        className="flex flex-row justify-center gap-4 text-center font-medium py-2 px-4 bg-custom-gradientrounded-3xl mb-2"
      >
        <CaretDown size={20} />
        <span>Type</span>
      </button>

      <button
        onClick={() => setShowLanguageModal(true)}
        className="flex flex-row justify-center gap-4 text-center font-medium py-2 px-4 bg-custom-gradientrounded-3xl mb-2"
      >
        <CaretDown size={20} />
        <span>Language</span>
      </button>

      {showTypeModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h3 className="font-bold mb-4">Select Type Filters</h3>
            {["All", "Forks", "Archived", "Mirrors", "Starred"].map((type) => (
              <label key={type} className="block">
                <input
                  type="checkbox"
                  checked={selectedType.includes(type)}
                  onChange={() => handleTypeChange(type)}
                />
                {type}
              </label>
            ))}
            <div className="mt-4 flex justify-between">
              <button
                onClick={applyFilters}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply Filters
              </button>
              <button
                onClick={() => setShowTypeModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showLanguageModal && (
        <div className="fixed inset-0 bg-gray-800 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h3 className="font-bold mb-4">Select Language Filters</h3>
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
            <div className="mt-4 flex justify-between">
              <button
                onClick={applyFilters}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply Filters
              </button>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
