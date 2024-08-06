import React, { useState } from "react";
import Image from "next/image";
import { AlbumType } from "../types/types";
import Loading from "../loading";

type AlbumProps = {
  album: AlbumType;
  onClick: () => void;
  onDelete: (id: number) => void;
};

const Album: React.FC<AlbumProps> = ({ album, onClick, onDelete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const coverImage =
    album.albums.length > 0 ? album.albums[0].imageUrl : "/alt.png";

  return (
    <div
      onClick={onClick}
      style={{ minWidth: "200px", minHeight: "200px" }}
      className="card bg-base-100 bg-opacity-75 shadow-xl max-w-xs w-full cursor-pointer z-1"
    >
      <figure className="relative h-64 w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <Loading />
          </div>
        )}
        <div className="carousel rounded-box h-full w-full">
          {album.albums.length > 0 ? (
            album.albums.map((albumImage, index) => (
              <div className="carousel-item h-full w-full" key={index}>
                <Image
                  src={albumImage.imageUrl}
                  alt={album.albumName}
                  layout="fill"
                  objectFit="cover"
                  onLoad={() => setIsLoading(false)}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="carousel-item h-full w-full">
              <Image
                src={coverImage}
                alt={album.albumName}
                layout="fill"
                objectFit="cover"
                onLoad={() => setIsLoading(false)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </figure>
      <div className="card-body p-2">
        <h2 className="card-title text-m justify-center">{album.albumName}</h2>
        <p className="text-xs text-center" >{new Date(album.created_at).toLocaleDateString()}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-error btn-outline btn-xs"
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onClick from parent
              onDelete(album.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Album;
