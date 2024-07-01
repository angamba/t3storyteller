import React from "react";

interface ContentCardProps {
  content: string;
}

const ContentCard: React.FC<ContentCardProps> = ({
  content
}) => {
  return (
    <div className="overflow-hidden rounded">
      <div className="px-6 py-4">
        <p className="text-base text-gray-900">{content}</p>
      </div>
    </div>
  );
};

export default ContentCard;
