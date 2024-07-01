"use client";

import React, { useState } from "react";
import AuthorDtlsToolTip from "./author-dtl-modal";

interface AuthorDetailsProps {
  followOnClick?: () => Promise<void>;
  authorName: string;
  publishedDate: string;
}

const AuthorDetails: React.FC<AuthorDetailsProps> = ({
  authorName,
  publishedDate,
  followOnClick,
}) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  return (
    <div className="author_detail_row relative flex items-center space-x-4">
      <span
        className="text-sm font-semibold text-gray-700"
        onClick={() => setIsOpenDetails(true)}
      >
        {authorName}
      </span>
      <span className="text-xs text-gray-500">{publishedDate}</span>

      {isOpenDetails && (
        <AuthorDtlsToolTip
          authorName={authorName}
          followOnClick={followOnClick}
          onClose={() => setIsOpenDetails(false)}
        />
      )}
    </div>
  );
};

export default AuthorDetails;
