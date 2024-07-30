"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlbumType } from "@/app/types/types";
import Modal from "./imageView";
import DownloadButton from "./downloadButton";
import Image from "next/image";
import { SparklesPreview } from "@/app/components/ui/sparklesPreview";

const AlbumDetails: React.FC = () => {
  const params = useParams();
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(
    new Set()
  );
  const [modalImageId, setModalImageId] = useState<string | null>(null);

  const id = params.id as string;

  useEffect(() => {
    if (id) {
      const fetchAlbum = async () => {
        try {
          const response = await fetch(`/api/album/${id}`);
          if (!response.ok) {
            throw new Error("Error fetching album");
          }
          const data: AlbumType = await response.json();
          setAlbum(data);
        } catch (error) {
          console.error("Error fetching album:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAlbum();
    } else {
      console.error("No ID found in params");
      setLoading(false);
    }
  }, [id]);

  const handleImageClick = (imageId: string) => {
    setSelectedImageIds((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(imageId)) {
        newSelected.delete(imageId);
      } else {
        newSelected.add(imageId);
      }
      return newSelected;
    });
  };

  const handleImageDoubleClick = (imageId: string) => {
    setModalImageId(imageId);
    const modalCheckbox = document.getElementById(
      "image_modal"
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = true;
    }
  };

  const closeModal = () => {
    setModalImageId(null);
    const modalCheckbox = document.getElementById(
      "image_modal"
    ) as HTMLInputElement;
    if (modalCheckbox) {
      modalCheckbox.checked = false;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Album not found</div>;
  }

  const selectedImages = album.albums.filter((image) =>
    selectedImageIds.has(image.id)
  ) as { imgName: string; imageUrl: string }[];

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <SparklesPreview />
      </div>
      <div className="relative z-1 flex flex-col items-center top-10">
        <div className="w-full flex items-center justify-center mb-4 relative">
          <h1 className="text-4xl font-bold text-center absolute left-1/2 transform -translate-x-1/2 text-white">
            {album.albumName}
          </h1>
          {selectedImageIds.size > 0 && (
            <div className="absolute right-0">
              <DownloadButton
                albumName={album.albumName}
                selectedImages={selectedImages}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
          {album.albums.map((image) => (
            <div
              key={image.id}
              className={`relative rounded-xl overflow-hidden h-64 cursor-pointer ${
                selectedImageIds.has(image.id) ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleImageClick(image.id)}
              onDoubleClick={() => handleImageDoubleClick(image.id)}
            >
              <Image
                src={image.imageUrl}
                alt={`${image.imgName}`}
                width={250}
                height={250}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
        {modalImageId && (
          <Modal
            images={album.albums}
            initialImageId={modalImageId}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default AlbumDetails;
