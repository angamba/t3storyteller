"use client";
import StoryForm from "~/app/_components/create-story";
import withAuthGuard from "~/app/_components/with-clerk-auth-guard";

const Stories = () => {
  return <StoryForm />;
};

export default withAuthGuard(Stories);
