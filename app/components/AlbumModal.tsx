"use client";
import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { AlbumType, CloudinaryResult } from "../types/types";

type AlbumModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateAlbum: (name: string, images: CloudinaryResult[]) => void;
};

const AlbumModal: React.FC<AlbumModalProps> = ({
  isOpen,
  onRequestClose,
  onCreateAlbum,
}) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState<CloudinaryResult[]>([]);

  const handleUpload = (result: any) => {
    if (result.event !== "success") return;
    const info = result.info as CloudinaryResult;
    setImages((prevImages) => [...prevImages, info]);
  };

  const handleCreate = () => {
    if (name || images.length > 0) {
      onCreateAlbum(name, images);
      setName("");
      setImages([]);
      onRequestClose();
    }
  };

  return (
    <dialog
      id="album-modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      open={isOpen}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create New Album</h3>
        <p className="py-4">Enter the album name and upload images.</p>

        <input
          type="text"
          placeholder="Album name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input w-full mb-4"
        />

        <CldUploadWidget uploadPreset="zibcadim" onUpload={handleUpload}>
          {({ open }) => (
            <button
              className="btn btn-primary btn-outline"
              onClick={() => open()}
            >
              Upload
            </button>
          )}
        </CldUploadWidget>

        <div className="modal-action">
          <button className="btn" onClick={handleCreate}>
            Create
          </button>
          <button className="btn" onClick={onRequestClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AlbumModal;
