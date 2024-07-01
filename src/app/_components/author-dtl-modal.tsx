import React from "react";
import FollowButton from "./follow-btn";

interface ModalProps {
  authorName: string;
  followOnClick?: () => Promise<void>;
  onClose: () => void;
}

const AuthorDtlsToolTip: React.FC<ModalProps> = ({
  authorName,
  onClose,
  followOnClick,
}) => {
  return (
    <div className="absolute left-0 top-full z-10 mt-2 w-64 rounded-lg bg-white p-4 shadow-lg">
      <button
        onClick={onClose}
        className="absolute right-1 top-1 p-1 text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
      <h2 className="text-lg font-semibold">{authorName}</h2>
      <p className="text-sm text-gray-600">Author details go here...</p>
      <FollowButton followOnClick={followOnClick} />
    </div>
  );
};

export default AuthorDtlsToolTip;
