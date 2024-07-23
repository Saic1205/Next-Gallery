import React from "react";

type CreateAlbumButtonProps = {
  onClick: () => void;
};

const CreateAlbumButton: React.FC<CreateAlbumButtonProps> = ({ onClick }) => {
  return <button className="btn btn-primary btn-outline rounded-lg ml-1" onClick={onClick}>Create Album</button>;
};

export default CreateAlbumButton;
