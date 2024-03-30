import { processAudio } from "@/utils/audioUtils";
import React, { ChangeEvent, useState } from "react";

interface UploadFormProps {
  onUpload: (file: File) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [lyrics, setLyrics] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      onUpload(file);
    }
  };

  const handleClearClick = () => {
    setFile(null);
    // Clear the file input element
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      console.log(fileInput);
      fileInput.value = ""; // Reset the value to clear the input
    }
    setLyrics("");
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const text = await processAudio(file);
      setLyrics(text);
      console.log(text);
    } catch (error) {
      console.error(error);
      alert("Failed to process the audio file.");
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <h1>
        <button onClick={handleSubmit}>Process</button>
      </h1>

      {file && (
        <>
          <div>Selected File: {file.name}</div>
          <div>
            <button onClick={handleClearClick}>Clear</button>
          </div>
        </>
      )}

      {lyrics && (
        <div>
          <h3>Extracted Lyrics:</h3>
          <p>{lyrics}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
