import { BuildingOffice, CaretDown, CaretUp, Link, MapPin, XLogo } from "@phosphor-icons/react";
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
    const [showDetails, setShowDetails] = useState(false);

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
        <div className="flex items-center justify-center md:w-3/6">
            {userData && (
                <div className="text-center flex flex-col items-center justify-center w-full">
                    <img
                        src={userData.avatar_url}
                        className="w-25 h-25 rounded-full mx-auto lg:w-38 lg:h-38"
                    />
                    <h2 className="text-xl font-semibold mt-3 md:text-xl md:mt-3 lg:text-2xl">{userData.name}</h2>
                    
                    <p className="text-gray-400 mt-0.5 w-4/6 text-sm md:mt-1.5 md:text-xs md:w-5/6 lg:text-base lg:w-3/6">{userData.bio}</p>

                    <button 
                        onClick={() => setShowDetails(!showDetails)}
                        className="mt-4 flex flex-col items-center justify-center text-sm text-blue-600 md:hidden"
                    >
                        {showDetails ? (
                            <>
                                Ocultar informações <CaretUp size={19} weight="bold" className="mb-1" />
                            </>
                        ) : (
                            <>
                                Informações Adicionais <CaretDown size={19} weight="bold" className="mb-10"/>
                            </>
                        )}
                    </button>

                    <ul className={`mt-4 space-y-2 mb-10 bg-gray-100 p-4 text-start w-full rounded-2xl md:p-0 md:mt-10 ${showDetails ? "block" : "hidden"} md:block md:bg-transparent`}>
                        {userData.company && (
                            <li>
                                <a 
                                    href={`https://${userData.company}`} 
                                    className="text-blue-600 text-sm no-underline flex gap-3 justify-center"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <BuildingOffice size={16} />
                                    {userData.company}
                                    
                                </a>
                            </li>
                        )}

                        {userData.location && (
                            <li className="text-blue-600 text-sm no-underline flex gap-3 justify-center">
                                <MapPin size={16} />
                                {userData.location}
                            </li>
                        )}

                        {userData.blog && (
                            <li>
                                <a 
                                    href={`https://${userData.blog}`} 
                                    className="text-blue-600 text-sm no-underline flex gap-3 justify-center"
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    <Link size={16} />
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
                                    className="text-blue-600 text-sm no-underline flex gap-3 justify-center"
                                >
                                    <XLogo size={16} />
                                    {userData.twitter_username}
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Profile;
