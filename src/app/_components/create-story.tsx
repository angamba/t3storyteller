"use client";
import React, { useState, useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";
import { api } from "~/trpc/react";
import withAuthGuard from "./with-clerk-auth-guard";

interface MultiSelectKeywords {
  value: number;
  label: string;
}

const StoryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [keywords, setKeywords] = useState<MultiSelectKeywords[]>([]);
  const [keywordOptions, setKeywordOptions] = useState<MultiSelectKeywords[]>([]);
  const createStory = api.post.create.useMutation();
  const { data, isLoading, error } = api.keyword.getAll.useQuery();

  useEffect(() => {
    if (data?.length) {
      const keywordsTransformed = data?.map((keyword) => ({
        value: keyword.id,
        label: keyword.name,
      }));

      setKeywordOptions(keywordsTransformed);
    }
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const keywordsArray = keywords.map((kw) => kw.value);

    await createStory.mutateAsync({
      title,
      content,
      keywords: keywordsArray,
    });

    // Reset form
    setTitle("");
    setContent("");
    setKeywords([]);
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
        Create your story
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="keywords"
          >
            Keywords
          </label>
          <MultiSelect
            options={keywordOptions}
            value={keywords}
            onChange={setKeywords}
            labelledBy="Select Keywords"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoryForm;
