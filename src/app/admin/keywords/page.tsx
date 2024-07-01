"use client";

import React, { useState } from "react";
import KeywordModal from "~/app/_components/keyword-modal";
import KeywordTable from "~/app/_components/keyword-table";
import { api } from "~/trpc/react";

interface Keyword {
  id?: number;
  keyword: string;
}

const Home: React.FC = () => {
  //   const [keywordData, setKeywordData] = useState<Keyword[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState<Keyword | undefined>(undefined);
  const { mutateAsync, isPending } = api.keyword.create.useMutation();
  const { mutateAsync: updateOneKeyword } = api.keyword.updateOne.useMutation();
  const { mutateAsync: deleteOneKeyword } = api.keyword.deleteOne.useMutation();
  const { data, isLoading, refetch } = api.keyword.getAll.useQuery();

  const handleEdit = async (row: Keyword) => {
    setIsEdit(true);
    setIsModalOpen(true);
    setEditData(row);
  };

  const handleEditSave = async (data: Keyword) => {
    if (data?.id) {
      await updateOneKeyword({
        id: data.id,
        name: data.keyword,
      });
      setIsEdit(false);
      setIsModalOpen(false);
      setEditData(undefined);
      await refetch();
    }
  };

  const handleDelete = async (id: number) => {
    if (id) {
      try {
        await deleteOneKeyword({
          id,
        });
        await refetch();
      } catch (error) {}
    }
  };

  const handleAdd = async (keyword: string) => {
    if (!keyword) {
      alert("Keyword is required!");
    }
    await mutateAsync({
      name: keyword,
    });

    setIsEdit(false);
    setEditData(undefined);
    setIsModalOpen(false);

    await refetch();
  };

  const handleClose = () => {
    setIsEdit(false);
    setIsModalOpen(false);
    setEditData(undefined);
  };

  return (
    <div className="mx-auto bg-white p-8 shadow-md">
      <button
        onClick={() => setIsModalOpen(true)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Keyword
      </button>

      <KeywordTable
        isLoading={isLoading}
        data={data?.map((item) => ({ id: item.id, keyword: item.name })) ?? []}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <KeywordModal
        isLoading={isPending}
        isEdit={isEdit}
        editData={editData}
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        onAdd={handleAdd}
        onEditSave={handleEditSave}
      />
    </div>
  );
};

export default Home;
