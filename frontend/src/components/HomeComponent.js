const HomeComponent = () => {
    return (
        <div className="w-[900px] rounded-lg border-2 border-[#0DB276] bg-[#21272e]  my-14">
            <div className="text-2xl display font-bold text-slate-50 bg-[#0DB276] py-4 mb-4  ">
                <h1 className="w-[100%] text-center">CodeBIT Beginner Contest 13 Announcement</h1>
            </div>
            <div className=" bg-[#21272e] px-12  ">
                <div className=" text-[22px] text-slate-50 ">
                    <p className="leading-relaxed mb-4">
                        We are super excited to invite you to participate in <span className="text-[#0a9160]">CodeBIT Round 9 </span> which will be held on <span className="text-[#0a9160]">Saturday, November 23, 2024 at 20:05UTC+5.5</span>.
                    </p>
                    <p className="text-[19px] text-[#eee] leading-relaxed mb-8">
                        <span className="text-[#0DB276] border-2 border-[#0DB276] rounded-md py-1 px-2 hover:cursor-pointer">Click here</span> to know more about the series and explore previous contests.
                    </p>
                    <p className="text-[22px] mb-4">
                        The contest will feature 4
                        problems.
                        <ul className="text-[19px] py-4 px-8 list-inside list-disc text-[text-slate-50]">
                            <li>
                                Question 1: Solve all test cases to get 100 points.
                            </li>
                            <li>
                                Question 2: Solve all test cases to get 200 points.
                            </li>
                            <li>
                                Question 3: Solve all test cases to get 300 points.
                            </li>
                            <li>
                                Question 4: Solve all test cases to get 400 points.
                            </li>
                        </ul>
                    </p>
                    <div className="">
                        <p className="text-[22px]">Rules and Instructions</p>
                        <ul className="text-[19px] py-4 px-8 list-inside list-disc text-[text-slate-50] ">
                            <li>
                                The contest duration will be of 2 hours
                            </li>
                            <li>
                                Coding Languages supported for the contest are: C++, Java, Python, JS.
                            </li>
                            <li>
                                In case of technical problems, participants can contact to the contest <span className="text-[#0a9160]">administrators</span> immediately.
                            </li>

                        </ul>

                    </div>
                </div>
            </div>
            <div className=" flex flex-col items-end justify-center pb-8">
                <div className=" text-[18px] text-center text-slate-200 font-semibold  rounded-md
                bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 mx-10 px-14 py-4  ">
                    View Details
                </div>
            </div>
        </div>);
};
export default HomeComponent;