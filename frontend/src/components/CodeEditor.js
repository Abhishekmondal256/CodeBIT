import { useEffect, useState } from "react"
import { ResizableBox } from "react-resizable";
import { Editor } from "@monaco-editor/react"

//components
import LanguageSelector from "./LanguageSelector";
import CodeZoomInOut from "./CodeZoomInOut";
import { useCodeContext } from "../hooks/useCodeContext";
import useCodeSubmission from "../hooks/useCodeSubmission";

const CodeEditor = ({ w, h }) => {
  const [language, setLanguage] = useState("cpp");
  const [code, setCode] = useState(`// write your solution here`);
  const [fontSize, setFontSize] = useState(14);

  const {codeSubmitted} = useCodeContext();
  const { handleCodeSubmission } = useCodeSubmission();


  useEffect(() => {
    
    if (language === "python") {
      setCode(`# write your solution here`)
    }
    else{
      setCode(`// write your solution here`)
    } 

  }, [language]);

  useEffect(() => {
    if (codeSubmitted) {
      console.log(code,language)
        handleCodeSubmission(code,language);
    }
}, [codeSubmitted]);



 
  return (
    <ResizableBox className="h-full w-full overflow-hidden"
      height={h * .72}
      width={w}
      minConstraints={[0.8 * w, 0.2 * h]}
      maxConstraints={[4 * w, 0.9 * h]}
      resizeHandles={['s']}
    >
      <div className="h-full w-full">
        <div className="h-[8.5%] flex justify-between w-full px-2 items-center">
          <LanguageSelector language={language} setLanguage={setLanguage} className="flex" />
          <CodeZoomInOut fontSize={fontSize} setFontSize={setFontSize} />
        </div>
        <Editor
          className="h-full w-full font-bold"
          value={code}
          language={language}
          theme="vs-dark"
          onChange={(val, event) => setCode(val)}
          options={{
            fontSize: fontSize,
            minimap: { enabled: false }
          }}
        />
      </div>
    </ResizableBox>
  )
}

export default CodeEditor