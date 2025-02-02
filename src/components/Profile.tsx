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
        <div className="flex items-center justify-center container">
            {userData && (
                <>
                    <div className="">
                        <img
                            src={userData.avatar_url}
                            className="w-42 h-42 rounded-full mx-auto"
                        />
                        <h2 className="text-2xl font-semibold text-center mt-6">{userData.name}</h2>
                        <ul className="mt-1 space-y-2">
                            <li className="mb-8">
                                <span className="text-gray-500 text-center">{userData.bio}</span>
                            </li>

                            {userData.company && (
                                <li>
                                    <a href={`https://${userData.company}`} className="text-blue-600" target="_blank" rel="noopener noreferrer">
                                        {userData.company}
                                    </a>
                                </li>
                            )}

                            {userData.location && (
                                <li>
                                    <span className="text-blue-600">{userData.location}</span>
                                </li>
                            )}

                            {userData.blog && (
                                <li>
                                    <a href={`https://${userData.blog}`} className="text-blue-600" target="_blank" rel="noopener noreferrer">
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
                                        className="text-blue-600"
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
