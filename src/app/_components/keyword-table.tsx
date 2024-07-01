// components/KeywordTable.tsx
import React from "react";
import { useTable, CellProps } from "react-table";

export interface Keyword {
  id?: number;
  keyword: string;
}

interface KeywordTableProps {
  isLoading: boolean
  data: Keyword[];
  onEdit: (row: Keyword) => void;
  onDelete: (id: number) => void;
}

const KeywordTable: React.FC<KeywordTableProps> = ({
  isLoading,
  data,
  onEdit,
  onDelete,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Keyword",
        accessor: "keyword",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }: CellProps<Keyword>) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => onEdit(row.original)}
              className="rounded bg-blue-500 px-3 py-1 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (row.original.id) {
                  onDelete(row.original.id);
                }
              }}
              className="rounded bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <h1>Keyword List</h1>
      <div className="mt-4 flex justify-center">
        <table {...getTableProps()} className="min-w-full bg-white">
          <thead>
            {headerGroups.map((headerGroup, key) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-gray-200"
                key={key}
              >
                {headerGroup.headers.map((column, key) => (
                  <th
                    {...column.getHeaderProps()}
                    className="border-b border-gray-200 px-6 py-3 text-center"
                    key={key}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, key) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-gray-100"
                  key={key}
                >
                  {row.cells.map((cell, key) => (
                    <td
                      key={key}
                      {...cell.getCellProps()}
                      className="border-b border-gray-200 px-6 py-4 text-center"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {isLoading && <p className="text-center">Fetching data please wait...</p>}
      {!isLoading && !rows.length && <p className="text-center">No data available</p>}
    </>
  );
};

export default KeywordTable;
