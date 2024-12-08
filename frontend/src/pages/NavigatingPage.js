import { BrowserRouter, Routes, Route ,useLocation} from "react-router-dom";

import ContestHackathon from "./ContestHackathon";
import ProjectSubmission from "./ProjectSubmission";
import FormHackathon from "./FormHackathon";
import CreateHackathon from "./CreateHackathon";
import CreateContest from "./CreateContest";
import LeaderBoard from "../components/LeaderBoard";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import Emailverify from "./Emailverify"; 
import HackathonmanagePage from "./HackathonmanagePage.js";
import ContestProblemPage from "./ContestProblemPage.js";
function NavigatingPage() {
   
    return (
        <div className="Navigating">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/projectsubmit" element={<ProjectSubmission />} /> */}
                {/* <Route path="/teamregister" element={<FormHackathon />} /> */}
                <Route path="/createhackathon" element={<CreateHackathon />} />
                <Route path="/createcontest" element={<CreateContest />} />
                
                <Route path="/:feat" element={<ContestHackathon />} />
                <Route path="/users/:id/verify/:token" element={<Emailverify />} />
                <Route path="/teamregister/:hackathonId" element={<FormHackathon />} />
                <Route path="/projectsubmit/:hackathonId" element={<ProjectSubmission />} />  
                <Route path="/leaderboard" element={<LeaderBoard/>}/>    
                <Route path="/managehackathon/:hackathonId" element={<HackathonmanagePage />} />  
                <Route path="/contestproblempage" element={<ContestProblemPage />} />            
            </Routes>
        </div>
    );
}

export default NavigatingPage;
