import React from "react";
import Album from "./Album";
import { AlbumType } from "../types/types";

type AlbumListProps = {
  albums: AlbumType[];
  onAlbumClick: (id: number) => void;
  onDelete: (id: number) => void;
};

const AlbumList: React.FC<AlbumListProps> = ({
  albums,
  onAlbumClick,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
      {albums.map((album) => (
        <div key={album.id} className="max-w-xs w-full">
          <Album
            album={album}
            onClick={() => onAlbumClick(album.id)}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default AlbumList;
