import React, { useState, useEffect } from "react";

interface ModalProps {
  images: { id: string; imageUrl: string }[];
  initialImageId: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ images, initialImageId, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const initialIndex = images.findIndex((img) => img.id === initialImageId);
    setCurrentImageIndex(initialIndex !== -1 ? initialIndex : 0);
  }, [initialImageId, images]);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <input type="checkbox" id="image_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box relative">
          <label
            htmlFor="image_modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={onClose}
          >
            &times;
          </label>
          <div className="carousel rounded-box w-full">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={`carousel-item w-full ${
                  index === currentImageIndex ? "block" : "hidden"
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt="Carousel view"
                  className="w-full"
                />
              </div>
            ))}
          </div>
          <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button className="btn btn-circle btn-outline btn-ghost" onClick={handlePrev}>
              ❮
            </button>
            <button className="btn btn-circle btn-outline btn-ghost" onClick={handleNext}>
              ❯
            </button>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="image_modal"
          onClick={onClose}
        ></label>
      </div>
    </>
  );
};

export default Modal;
