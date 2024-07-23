import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <dialog
      id="confirmation_modal"
      className="modal"
      open={isOpen}
    >
      <div className="modal-box bg-base-100 bg-opacity-90">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">Are you sure you want to delete this album?</p>
        <div className="modal-action">
          <button
            className="btn btn-primary btn-outline"
            onClick={onRequestClose}
          >
            Cancel
          </button>
          <button className="btn btn-error btn-outline" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmDeleteModal;
