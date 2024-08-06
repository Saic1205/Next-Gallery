"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchBox from "../components/SearchBox";
import CreateAlbumButton from "../components/CreateAlbumBtn";
import AlbumModal from "../components/AlbumModal";
import AlbumList from "../components/AlbumList";
import ConfirmDeleteModal from "./confirmDeleteModal";
import { AlbumType, CloudinaryResult } from "../types/types";
import { SparklesPreview } from "../components/ui/sparklesPreview";

const Gallery: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch("/api/fetchAlbums");
        if (!response.ok) {
          throw new Error("Error fetching albums");
        }
        const data: AlbumType[] = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);
// search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
// Creates a new album
  const handleCreateAlbum = async (
    name: string,
    images: CloudinaryResult[],
    userId: number

  ) => {
    try {
      const response = await fetch("/api/albumupload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, images, userId }),
      });

      if (!response.ok) {
        throw new Error("Error creating album");
      }

      const createdAlbum: AlbumType = await response.json();
      setAlbums([...albums, createdAlbum]);
      console.log("Album created successfully:", createdAlbum);
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };
// routes to the selected album
  const handleAlbumClick = (id: number) => {
    router.push(`/album/${id}`);
  };
// delete album functionality
  const handleDeleteAlbum = (id: number) => {
    setAlbumToDelete(id);
    setIsConfirmDeleteModalOpen(true);
    (document.getElementById("confirmation_modal") as HTMLDialogElement)?.showModal();
  };

  const confirmDeleteAlbum = async () => {
    if (albumToDelete === null) return;

    try {
      const response = await fetch(`/api/deleteAlbum?id=${albumToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting album");
      }

      setAlbums(albums.filter((album) => album.id !== albumToDelete));
    } catch (error) {
      console.error("Error deleting album:", error);
    } finally {
      setIsConfirmDeleteModalOpen(false);
      setAlbumToDelete(null);
      (document.getElementById("confirmation_modal") as HTMLDialogElement | null)?.close();
    }
  };

  const filteredAlbums = albums.filter((album) =>
    album.albumName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-base-200">
      <div className="absolute inset-0 z-0">
        <SparklesPreview />
      </div>
      <div className="relative z-1 flex flex-col items-center justify-center space-y-4 top-5">
        <div className="flex justify-center space-x-4 min-h-fit">
          <SearchBox onSearch={handleSearch} />
          <CreateAlbumButton onClick={() => setIsModalOpen(true)} />
        </div>
        <AlbumModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onCreateAlbum={handleCreateAlbum}
        />
        <AlbumList
          albums={filteredAlbums}
          onAlbumClick={handleAlbumClick}
          onDelete={handleDeleteAlbum}
        />
      </div>
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onCancel={() => {
          setIsConfirmDeleteModalOpen(false);
          setAlbumToDelete(null);
        }}
        onConfirm={confirmDeleteAlbum}
      />
    </div>
  );
};

export default Gallery;
