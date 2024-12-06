import useSize from "@react-hook/size"

//components
import CodeEditor from "../components/CodeEditor"
import ContestProblemDesc from "../components/ContestProblemDesc"
import OutputSection from "../components/OutputSection"
import {ResizableBox } from "react-resizable"


const CodeSubmission = () => {
    const pref1 = useRef(null);
    const [w1,h1] = useSize(pref1);

    const pref2 = useRef(null);
    const [w2,h2] = useSize(pref2);

    return (
        <div className="h-[91vh] w-full flex bg-[#181C21]" ref={pref1}>
            <ContestProblemDesc w={w1} h={h1}/>
            <ResizableBox height={h1} width={.55*w1}
            minConstraints={[.55*w1,h1]}
            maxConstraints={[3*w1,h1]}
            resizeHandles={['w']}
            className="overflow-hidden"
            >
            <div className="flex flex-col h-full w-full" ref={pref2}>
                <CodeEditor w={w2} h={h2}/>
                <OutputSection w={w2} h={h2}/>
            </div>
            </ResizableBox>
        </div>
    )
}

export default CodeSubmission;