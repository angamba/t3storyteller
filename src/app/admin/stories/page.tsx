"use client";
import TagsFilter from "~/app/_components/tags-filter-row";
import CardTitle from "~/app/_components/story-title-card";
import { api } from "~/trpc/react";
import { useState } from "react";
import { type Keyword } from "@prisma/client";
import AuthorDetails from "~/app/_components/story-author-details";
import ContentCard from "~/app/_components/story-content-card";

export default function Stories() {
  const [tags, setTags] = useState<number[]>([]);
  const { mutateAsync: approveStory, isPending: approveStoryLoading } =
    api.post.approve.useMutation();

  const {
    data: stories,
    error: errorStory,
    isLoading: storyLoading,
    refetch: refetchStories,
  } = api.post.getAll.useQuery({ keywords: tags });
  const {
    data: keywords,
    error: errorKeywords,
    isLoading: keywordsLoading,
  } = api.keyword.getAll.useQuery();

  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center">
        <TagsFilter
          selectedTags={tags}
          onChange={(keyword: Keyword) => {
            setTags((prevTags) =>
              prevTags.includes(keyword.id)
                ? prevTags.filter((t) => t !== keyword.id)
                : [...prevTags, keyword.id],
            );
          }}
          tags={keywords ?? []}
        />
      </div>
      <div className="w-4/5">
        {storyLoading && <p>Loading latest stories. Please wait...</p>}
        {!storyLoading && !stories?.length && <p>No stories available</p>}
        {stories?.map((story) => (
          <div key={story.title} className="my-4 flex-auto flex-col">
            <div className="border-b border-gray-200 p-4">
              <CardTitle title={story.title} />
              <div className="flex items-center space-x-4">
                <AuthorDetails
                  authorName={story.createdBy.name}
                  publishedDate={story.createdAt.toLocaleString()}
                />
              </div>
            </div>
            <ContentCard content={story.content} />
            <div className="flex flex-wrap gap-2 px-6">
              {story.keywords.map((item) => (
                <span key={item.keyword.id} className="text-sm text-gray-400">
                  {item.keyword.name.toLowerCase()}
                </span>
              ))}
            </div>

            <div
              style={{
                color: "white",
                width: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className={`
                text-xs
                ${
                  story.status === "APPROVED" ? " bg-green-500" : "bg-red-500"
                }`}
            >
              {story.status}
            </div>
            {story.status !== "APPROVED" && (
              <div className="flex flex-row">
                <button
                  onClick={async () => {
                    await approveStory(story.id);
                    await refetchStories();
                  }}
                  disabled={approveStoryLoading}
                  className="ml-auto bg-green-500 px-4 py-2 text-white"
                >
                  {approveStoryLoading ? "Approving..." : "Approve"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
