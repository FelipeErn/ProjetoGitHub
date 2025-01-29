import React, { useState } from "react";

interface UserData {
    avatar_url: string;
    login: string;
    name: string;
    public_repos: number;
    public_gists: number;
    created_at: string;
}

const Profile = () => {
    const [username, setUsername] = useState<string>(""); 
    const [userData, setUserData] = useState<UserData | null>(null); 

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: UserData = await response.json(); 
            setUserData(data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    const handleSubmit = (e: React.FormEvent) => { 
        e.preventDefault();
        fetchUserData();
    };

    return (
        <div className="flex flex-col items-center sm:px-32 py-32">
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter GitHub username"
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="ml-2 p-2 bg-blue-500 text-white rounded"
                >
                    Submit
                </button>
            </form>
    
            {userData && (
                <>
                    <div className="border p-4 rounded shadow-lg sm:w-96">
                        <img
                            src={userData.avatar_url}
                            alt={userData.login}
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h2 className="text-xl text-center mt-2">{userData.name}</h2>
                        <p className="text-center text-gray-500">{userData.login}</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <strong>Public Repos:</strong> {userData.public_repos}
                            </li>
                            <li>
                                <strong>Public Gists:</strong> {userData.public_gists}
                            </li>
                            <li>
                                <strong>Created At:</strong> 
                                {new Date(userData.created_at).toISOString().split("T")[0]}
                            </li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
