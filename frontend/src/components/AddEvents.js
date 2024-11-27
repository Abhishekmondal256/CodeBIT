import { useNavigate } from 'react-router-dom';

const AddEvents = ({ feat }) => {
    const navigate = useNavigate();

    const handleCreateClick = () => {
        if (feat === "hackathon") {
            navigate("/createhackathon");
        } else if (feat === "contest") {
            navigate("/createcontest");
        }
    };
    return (
        <div className="border-4 border-[#393530] w-[300px] h-[320px]
         flex flex-col gap-8 items-center justify-center rounded-lg ">
            <div className="text-center text-4xl font-bold capitalize">
                Organize A
                <div className="text-green-400 py-3" >{feat}</div>
            </div>
            <div className="w-[220px] ">
                <div className="rounded-lg text-[18px] text-center text-slate-200 font-semibold 
                bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 mb-4 p-2" 
                onClick={handleCreateClick}>
                    Create {feat}
                </div>
                <div className="rounded-lg text-[18px] text-center text-slate-200 font-semibold 
                bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 p-2">
                    Manage {feat}
                </div>

            </div>
        </div >
    );
};
export default AddEvents;
