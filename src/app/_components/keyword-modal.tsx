// components/KeywordModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Keyword } from "./keyword-table";

interface KeywordModalProps {
  isLoading: boolean;
  isEdit: boolean;
  isOpen: boolean;
  editData: Keyword | undefined;
  onRequestClose: () => void;
  onAdd: (keyword: string) => void;
  onEditSave: (keyword: Keyword) => void;
}

const KeywordModal: React.FC<KeywordModalProps> = ({
  isLoading,
  isEdit,
  editData,
  isOpen,
  onRequestClose,
  onAdd,
  onEditSave,
}) => {
  const [data, setData] = useState<Keyword | undefined>(editData);

  useEffect(() => {
    setData(editData);
  }, [editData]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
    >
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl">
          {isEdit ? "Edit Keyword" : "Add Keyword"}
        </h2>
        <div className="mb-4 flex flex-col">
          <label className="mb-2 text-gray-700">Keyword</label>
          <input
            type="text"
            value={data?.keyword}
            onChange={(e) => setData({ ...data, keyword: e.target.value })}
            placeholder="Enter keyword"
            className="w-full rounded border p-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onRequestClose}
            className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={() => {
              if (isEdit && data) {
                onEditSave(data);
                setData(undefined)
              }
              if (!isEdit && data?.keyword) {
                onAdd(data?.keyword);
                setData(undefined)

              }
            }}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {isLoading && "Saving..."}
            {!isLoading && isEdit &&  "Save"}
            {!isLoading && !isEdit && "Add"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default KeywordModal;
