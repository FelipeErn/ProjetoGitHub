import { create } from 'zustand';

interface Store {
  repositoriesCount: number;
  starredCount: number;
  fetchRepositoriesCount: () => Promise<void>;
  fetchStarredCount: () => Promise<void>;
}

export const useStore = create<Store>((set) => ({
  repositoriesCount: 0,
  starredCount: 0,

  fetchRepositoriesCount: async () => {
    const response = await fetch("https://api.github.com/users/gabrielscordeiro");
    const data = await response.json();
    set({ repositoriesCount: data.public_repos }); 
  },

  fetchStarredCount: async () => {
    const response = await fetch("https://api.github.com/users/gabrielscordeiro/starred");
    const data = await response.json();
    set({ starredCount: data.length }); 
  },
}));
