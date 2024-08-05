import React, { useState } from "react";


interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => Promise<void>;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      onRequestClose();
    } catch (error) {
      console.error("Deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <dialog
      id="confirmation_modal"
      className="modal"
      open={isOpen}
    >
      <div className="modal-box bg-base-300/85">
        <h3 className="font-bold text-lg">
          {isDeleting ? "Deleting..." : "Confirm Deletion"}
        </h3>
        {isDeleting ? (
          <div className="py-4 flex justify-center">
            <span className="loading loading-infinity loading-lg text-error"></span>
          </div>
        ) : (
          <p className="py-4">Are you sure you want to delete this album?</p>
        )}
        <div className="modal-action">
          {!isDeleting && (
            <>
              <button
                className="btn btn-primary btn-outline"
                onClick={onRequestClose}
              >
                Cancel
              </button>
              <button 
                className="btn btn-error btn-outline" 
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteModal;