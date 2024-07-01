"use client";

import React, { useState } from "react";

interface FollowButtonProps {
  followOnClick?: () => Promise<void>;
}

const FollowButton: React.FC<FollowButtonProps> = ({ followOnClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleClick = () => {
    if (followOnClick instanceof Function) {
      followOnClick()
        .then(() => {
          setIsFollowing(true);
        })
        .catch(() => {
          setIsFollowing(false);
        });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-full px-2 py-1 text-xs text-white transition-colors ${
        isFollowing
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-500 hover:bg-gray-600"
      }`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
