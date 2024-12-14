import HomeComponent from "../components/HomeComponent";
import UploadExcel from "../components/UploadExcel";
import AddEvents from "../components/AddEvents";
import { useEffect, useState } from "react";
const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
        const userType = user?.userType || null;
        setIsAdmin(userType === "admin");
    }, []);
    return (
        <div className="w-full bg-[#181C21] flex flex-col items-center justify-center">
            <div className="  w-[1200px] min-h-screen py-10 bg-[#181C21] flex">
                <div className="flex flex-wrap justify-between w-[1200px]">
                    <HomeComponent />
                </div>
                <div className="flex flex-col gap-16 w-[350px]">
                    {isAdmin && <AddEvents feat={"events"} />}
                    {isAdmin && <UploadExcel />}
                </div>
            </div>
        </div>
    );
};

export default Home;