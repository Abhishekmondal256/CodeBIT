import { useState } from "react";
import * as XLSX from "xlsx";

const UploadExcel = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage
  const userType = user?.userType || null; // Get userType or set null if not logged in
  const userEmail = user?.userid || null; // Get user email
  const token = user?.tokene || null;
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const binaryData = e.target.result;
          const workbook = XLSX.read(binaryData, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

          // Find the first non-empty row to determine headers
          let headerRowIndex = parsedData.findIndex(
            (row) => row.some((cell) => cell.trim() !== "")
          );

          if (headerRowIndex === -1) {
            alert("The Excel file does not contain valid headers or data.");
            setLoading(false);
            return;
          }

          const headers = parsedData[headerRowIndex];
          const dataRows = parsedData.slice(headerRowIndex + 1);

          const emailColumnIndex = headers.findIndex((header) =>
            header.toLowerCase().includes("email")
          );
          const rollNoColumnIndex = headers.findIndex((header) =>
            header.toLowerCase().includes("roll")
          );

          if (emailColumnIndex === -1 || rollNoColumnIndex === -1) {
            alert("Email or Roll Number column not found in the sheet.");
            setLoading(false);
            return;
          }

          const extractedData = dataRows.map((row) => ({
            email: row[emailColumnIndex]?.replace(/\r\n/g, "").trim() || "N/A",
            roll: row[rollNoColumnIndex] || "N/A",
          }));

          // Send the full extracted data to the backend
          const response = await fetch("http://localhost:4000/auth/registermain", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization":token
            },
            body: JSON.stringify({ students: extractedData }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error("Backend Error:", errorData);
            throw new Error("Failed to process the data in the backend");
          }

          const responseData = await response.json();
          console.log("Response from backend:", responseData);
          alert("File uploaded and processed successfully!");
        } catch (error) {
          console.error("Error processing the file or sending data to backend:", error);
          alert("An error occurred. Check console for details.");
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = (error) => {
        console.error("File reading error:", error);
        alert("Error reading the file. Please try again.");
        setLoading(false);
      };

      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload the file");
      setLoading(false);
    }
  };

  return (
    <div
      className="border-4 border-[#393530] w-[300px] h-[260px] 
      flex flex-col gap-4 items-center justify-center rounded-lg"
    >
      <div className="text-center text-3xl font-bold text-slate-300">
        Upload Student
        <div className="text-green-400 py-3">Excel File</div>
      </div>
      <div className="w-[220px]">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="rounded-lg text-[18px] text-center text-slate-200 font-semibold 
          hover:scale-105 transition-transform duration-300 bg-transparent border-2 hover:cursor-pointer transition delay-300 p-2 block"
        >
          {fileName ? `Selected: ${fileName}` : "Choose File"}
        </label>
      </div>
      <div>
        <button
          className={`rounded-lg text-[18px] text-center text-slate-200 font-semibold 
          bg-[#0DB276] hover:bg-[#0aa46c] hover:cursor-pointer transition delay-100 py-2 px-6 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleUploadClick}
          disabled={loading}
        >
          {loading ? "Processing..." : "Upload Excel"}
        </button>
      </div>
    </div>
  );
};

export default UploadExcel;
