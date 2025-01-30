import { useEffect, useState } from "react";

interface Starred {
    full_name: string;
}

const Starred = () => {
    const [starred, setStarred] = useState<Starred[]>([]);
    const [starredSearch, setStarredSearch] = useState('');
    const [filteredStarred, setFilteredStarred] = useState<Starred | null>(null);

    const fetchStarred = async () => {
        try {
            const response = await fetch("https://api.github.com/users/FelipeErn/starred");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: Starred[] = await response.json();
            setStarred(data);
        } catch (err) {
            console.error("Error fetching Starreds:", err);
        }
    };

    const handleSearch = () => {
        const foundStarred = starred.find(r => r.full_name.toLowerCase().includes(starredSearch.toLowerCase()));
        setFilteredStarred(foundStarred || null);
    };

    useEffect(() => {
        fetchStarred();
    }, []);

    useEffect(() => {
        if (starredSearch === '') {
            setFilteredStarred(null); 
        } else {
            handleSearch();
        }
    }, [starredSearch, starred])

    return (
        <div className="flex items-center">
            <div className="border p-4 rounded shadow-lg sm:w-96">
                
                <input
                    type="text"
                    value={starredSearch}
                    onChange={(e) => setStarredSearch(e.target.value)}
                    placeholder="Buscar"
                    className="mt-4 p-2 border border-gray-300 rounded"
                />
                
                <ul className="mt-4 space-y-2">
                    {filteredStarred ? (
                        <>
                            <li><strong>Nome do repositório:</strong> {filteredStarred.full_name}</li>
                        </>
                    ) : (
                        <>
                            {starred.map(star => (
                                <li key={star.full_name}>
                                    <strong>Nome do repositório:</strong> {star.full_name}
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Starred;
