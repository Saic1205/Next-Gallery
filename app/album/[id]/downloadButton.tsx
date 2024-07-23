import React from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

interface DownloadButtonProps {
  albumName: string;
  selectedImages: { imgName: string; imageUrl: string }[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  albumName,
  selectedImages,
}) => {
  const handleDownload = async () => {
    const zip = new JSZip();

    for (const image of selectedImages) {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();
      zip.file(image.imgName, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${albumName}.zip`);
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary btn-outline btn-sm">
      Download
    </button>
  );
};

export default DownloadButton;
