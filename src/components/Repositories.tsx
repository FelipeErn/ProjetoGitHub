import { useEffect, useState } from "react";

interface Repository {
    full_name: string;
}

const Repositories = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]); 
    const [repoSearch, setRepoSearch] = useState(''); 
    const [filteredRepo, setFilteredRepo] = useState<Repository | null>(null); 

    const fetchRepositories = async () => {
        try {
            const response = await fetch("https://api.github.com/users/FelipeErn/repos");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: Repository[] = await response.json();
            setRepositories(data);
        } catch (err) {
            console.error("Error fetching repositories:", err);
        }
    };

    const handleSearch = () => {
        const repo = repositories.find(r => r.full_name.toLowerCase().includes(repoSearch.toLowerCase()));
        setFilteredRepo(repo || null);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    useEffect(() => {
        if (repoSearch === '') {
            setFilteredRepo(null); 
        } else {
            handleSearch();
        }
    }, [repoSearch, repositories]);

    return (
        <div className="flex items-center">
            <div className="border p-4 rounded shadow-lg sm:w-96">

                <input
                    type="text"
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    placeholder="Buscar"
                    className="mt-4 p-2 border border-gray-300 rounded"
                />
                
                <ul className="mt-4 space-y-2">
                    {filteredRepo ? (
                        <>
                            <li><strong>Nome do repositório:</strong> {filteredRepo.full_name}</li>
                        </>
                    ) : (
                        <>
                            {repositories.map(repo => (
                                <li key={repo.full_name}>
                                    <strong>Nome do repositório:</strong> {repo.full_name}
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Repositories;
