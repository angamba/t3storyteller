import { type Keyword } from "@prisma/client";
import React from "react";

interface TagsFilterProps {
  tags: Keyword[];
  selectedTags: number[];
  onChange: (tags: Keyword) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({
  tags,
  onChange,
  selectedTags,
}) => {
  const isSelected = (tag: Keyword) => {
    return selectedTags.includes(tag.id);
  };
  return (
    <div className="flex flex-wrap gap-2 p-4">
      {tags.map((keywordObj, index) => (
        <span
          onClick={() => onChange(keywordObj)}
          key={index}
          //   onClick={() => toggleTag(tag)}
          className={`cursor-pointer rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
            // selectedTags.includes(tag)
            //   ? 'bg-blue-500 text-white'
            "bg-gray-200 text-gray-700 hover:bg-gray-300 " +
            (isSelected(keywordObj) ? "bg-blue-500 text-white" : "")
          }`}
        >
          {keywordObj.name}
        </span>
      ))}
    </div>
  );
};

export default TagsFilter;
