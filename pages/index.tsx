import React from "react";
import UploadForm from "@/components/UploadForm";

const Home: React.FC = () => {
  const handleUpload = (file: File) => {
    // Implement your upload logic here
    console.log("Uploaded file:", file);
  };

  return (
    <div>
      <h1>Web Audio API Demo</h1>
      <UploadForm onUpload={handleUpload} />
    </div>
  );
};

export default Home;
