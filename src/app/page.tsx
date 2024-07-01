import { Metadata } from "next";
import React from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "T3 Storyteller",
};

const Home = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">
          Welcome to Storyteller
        </h1>
        <p className="text-lg text-gray-600">Where your stories reaches life</p>
        <Link href="/viewer/stories">View Stories</Link>
      </div>
    </div>
  );
};

export default Home;
