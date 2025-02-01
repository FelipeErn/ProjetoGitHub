import { useEffect, useState } from "react";

interface UserData {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    company: string;
    blog: string;
    twitter_username: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null); 

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/gabrielscordeiro`);
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
                            className="w-24 h-24 rounded-full mx-auto"
                        />
                        <h2 className="text-xl text-center mt-2">{userData.name}</h2>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <span>{userData.bio}</span>
                            </li>

                            {userData.company && (
                                <li>
                                    <a href={`https://${userData.company}`} target="_blank" rel="noopener noreferrer">
                                        {userData.company}
                                    </a>
                                </li>
                            )}

                            {userData.location && (
                                <li>
                                    <span>{userData.location}</span>
                                </li>
                            )}

                            {userData.blog && (
                                <li>
                                    <a href={`https://${userData.blog}`} target="_blank" rel="noopener noreferrer">
                                        {userData.blog}
                                    </a>
                                </li>
                            )}

                            {userData.twitter_username && (
                                <li>
                                    <a
                                        href={`https://x.com/${userData.twitter_username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Twitter
                                    </a>
                                </li>
                            )}

                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;
