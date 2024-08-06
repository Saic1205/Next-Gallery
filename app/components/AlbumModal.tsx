"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { CloudinaryResult } from "../types/types";
import { toast } from "react-toastify";

type AlbumModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateAlbum: (name: string, images: CloudinaryResult[]) => Promise<void>;
};

const AlbumModal: React.FC<AlbumModalProps> = ({
  isOpen,
  onRequestClose,
  onCreateAlbum,
}) => {
  const [name, setName] = useState("");
  const [images, setImages] = useState<CloudinaryResult[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [nameError, setNameError] = useState(false);

  const handleUpload = (result: any) => {
    if (result.event !== "success") return;
    const info = result.info as CloudinaryResult;
    setImages((prevImages) => [...prevImages, info]);
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      setNameError(true);
      toast.error("Album name cannot be empty");
      return;
    }

    if (name.trim() && images.length > 0) {
      setIsCreating(true);
      try {
        await onCreateAlbum(name, images);
        setName("");
        setImages([]);
        onRequestClose();
        toast.success("Album created ");
      } catch (error) {
        toast.error("Failed to create album");
      } finally {
        setIsCreating(false);
      }
    }
  };

  return (
    <dialog
      id="album-modal"
      className={`modal ${isOpen ? "modal-open" : ""}`}
      open={isOpen}
    >
      <div className="modal-box bg-base-300/85">
        <h3 className="font-bold text-lg">
          {isCreating ? "Creating Album..." : "Create New Album"}
        </h3>
        {isCreating ? (
          <div className="py-4 flex justify-center">
            <span className="loading loading-infinity loading-lg text-success"></span>
          </div>
        ) : (
          <>
            <p className="py-4">Enter the album name and upload images.</p>
            <input
              type="text"
              placeholder="Album name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false);
              }}
              className={`input w-full mb-4 ${nameError ? 'input-error' : ''}`}
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
              <button 
                className="btn btn-primary btn-outline" 
                onClick={handleCreate}
                disabled={isCreating}
              >
                Create
              </button>
              <button 
                className="btn btn-error btn-outline" 
                onClick={onRequestClose}
                disabled={isCreating}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default AlbumModal;