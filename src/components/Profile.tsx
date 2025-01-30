import { useEffect, useState } from "react";

interface UserData {
    avatar_url: string;
    login: string;
    name: string;
    public_repos: number;
    public_gists: number;
    created_at: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null); 

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/FelipeErn`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data: UserData = await response.json(); 
            setUserData(data);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    
    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className="flex items-center">
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
