import { useEffect, useState } from "react";

interface Repository {
    full_name: string;
}

const Repositories = () => {
    const [repositories, setRepositories] = useState<Repository[]>([]); // Lista de repositórios
    const [repoSearch, setRepoSearch] = useState(''); // Repositório de busca
    const [filteredRepo, setFilteredRepo] = useState<Repository | null>(null); // Repositório filtrado

    // Função para buscar todos os repositórios do usuário
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

    // Função para filtrar repositórios com base no campo de busca
    const handleSearch = () => {
        const repo = repositories.find(r => r.full_name.toLowerCase().includes(repoSearch.toLowerCase()));
        setFilteredRepo(repo || null);
    };

    // Carregar todos os repositórios ao montar o componente
    useEffect(() => {
        fetchRepositories();
    }, []);

    // Efetuar a pesquisa sempre que o campo de pesquisa mudar
    useEffect(() => {
        if (repoSearch === '') {
            setFilteredRepo(null); // Se não houver busca, limpar o filtro
        } else {
            handleSearch();
        }
    }, [repoSearch, repositories]);

    return (
        <div className="flex flex-col items-center sm:px-32 py-32">
            <div className="border p-4 rounded shadow-lg sm:w-96">
                <h2 className="text-xl text-center mt-2">Repositórios</h2>
                
                {/* Campo de busca */}
                <input
                    type="text"
                    value={repoSearch}
                    onChange={(e) => setRepoSearch(e.target.value)}
                    placeholder="Buscar repositório"
                    className="mt-4 p-2 border border-gray-300 rounded"
                />
                
                <ul className="mt-4 space-y-2">
                    {/* Se houver um repositório filtrado, exibe ele */}
                    {filteredRepo ? (
                        <>
                            <li><strong>Nome do repositório:</strong> {filteredRepo.full_name}</li>
                        </>
                    ) : (
                        <>
                            {/* Se não houver busca, mostra todos os repositórios */}
                            {repositories.map(repo => (
                                <li>
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
