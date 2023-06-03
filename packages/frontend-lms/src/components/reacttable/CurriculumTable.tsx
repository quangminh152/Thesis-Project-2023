import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  Table,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { rankItem } from "@tanstack/match-sorter-utils";
import Link from "next/link";
import type { InputHTMLAttributes } from "react";
import { useEffect, useMemo, useState } from "react";

import type { ClassesInformationResponse, CoursesResponse } from "server-lms";
import { Collections } from "server-lms";
import type { PBCustom } from "src/types/pb-custom";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

// const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
//   let dir = 0;

//   // Only sort by rank if the column has ranking information
//   if (rowA.columnFiltersMeta[columnId]) {
//     dir = compareItems(
//       rowA.columnFiltersMeta[columnId]?.itemRank,
//       rowB.columnFiltersMeta[columnId]?.itemRank
//     );
//   }

//   // Provide an alphanumeric fallback for when the item ranks are equal
//   return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
// };

interface CoursesExpand {
  course: CoursesResponse;
}

interface CurriculumTableProps {
  classInfo: ClassesInformationResponse<CoursesExpand>[];
  pbClient: PBCustom;
}

function CurriculumTable({ pbClient, classInfo }: CurriculumTableProps) {
  const getHref = (classID: string) =>
    `/class-detail/${encodeURIComponent(classID)}`;

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const toggleComplete = (
    classInfo: ClassesInformationResponse,
    status: boolean
  ) => {
    classInfo.isCompleted = status;
    pbClient
      .collection(Collections.ClassesInformation)
      .update<ClassesInformationResponse>(classInfo.id, classInfo);
  };

  const columns: ColumnDef<ClassesInformationResponse<CoursesExpand>>[] = [
    {
      accessorFn: (item) => item.expand?.course.name,
      id: "name",
      cell: (info) => (
        <Link
          className="block w-max truncate px-2 py-1"
          href={getHref(info.row.original.id)}
        >
          {info.getValue() as string}
        </Link>
      ),
      header: () => <span>Subject Name</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (item) => item.expand?.course.credit,
      id: "credit",
      cell: (info) => (
        <Link
          className="w-max truncate px-2 py-1"
          href={getHref(info.row.original.id)}
        >
          {info.getValue() as string}
        </Link>
      ),
      header: () => <span>Credit</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (item) => item.expand?.course.yearCurri,
      id: "yearCurri",
      cell: (info) => (
        <Link
          className="w-max truncate px-2 py-1"
          href={getHref(info.row.original.id)}
        >
          {info.getValue() as string}
        </Link>
      ),
      header: () => <span>Year</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (item) => item.expand?.course.semesterCurri,
      id: "semesterCurri",
      cell: (info) => (
        <Link
          className="w-max truncate px-2 py-1"
          href={getHref(info.row.original.id)}
        >
          {info.getValue() as string}
        </Link>
      ),
      header: () => <span>Semester</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (item) => item.expand?.course.isElective,
      id: "isElective",
      cell: (info) => (
        <Link
          className="w-max truncate px-2 py-1"
          href={getHref(info.row.original.id)}
        >
          {(info.getValue() as boolean) ? "X" : ""}
        </Link>
      ),
      header: () => <span>Elective</span>,
      footer: (props) => props.column.id,
    },
    {
      accessorFn: (item) => item,
      id: "isCompleted",
      cell: (info) => {
        const classInfo =
          info.getValue() as ClassesInformationResponse<CoursesExpand>;
        return (
          <input
            type="checkbox"
            className="toggle toggle-success"
            onChange={(event) => {
              toggleComplete(classInfo, event.currentTarget.checked);
            }}
            defaultChecked={classInfo.isCompleted}
          />
        );
      },
      header: () => <span>Status</span>,
      footer: (props) => props.column.id,
    },
  ];

  const table = useReactTable({
    data: classInfo,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <div className="mb-8" >
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="font-lg border-block border p-2 shadow"
          placeholder="Search for subject"
        />
      </div>
      <div className="h-2" />
      <div className="overflow-x-auto pb-2">
        <table className="min-w-full">
          <thead className="bg-sky-600 min-w-fit whitespace-nowrap px-2 py-2 text-lg leading-10 text-white border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              {/* <Filter column={header.column} table={table} /> */}
                            </div>
                          ) : null}
                        </>
                      )
                      }
                    </th >
                  );
                })}
              </tr >
            ))}
          </thead >
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr className="even:bg-slate-50 odd:bg-white font-regular whitespace-nowrap text-center text-lg leading-8 text-gray-800" key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td className="px-4 py-1" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table >
      </div >
      <div className="h-2" />
      <div className="flex items-center gap-4 mt-2 justify-end">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border px-3 py-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}/{""}
            {table.getPageCount()}
          </strong>
        </span>
        {/* <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span> */}
        {/* <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select> */}
      </div>
      <div className="justify-end flex text-gray-600">{table.getPrePaginationRowModel().rows.length} Rows</div>
    </div >
  );
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${column.getFacetedMinMaxValues()?.[0]
            ? `(${column.getFacetedMinMaxValues()?.[0]})`
            : ""
            }`}
          className="w-24 rounded border shadow"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${column.getFacetedMinMaxValues()?.[1]
            ? `(${column.getFacetedMinMaxValues()?.[1]})`
            : ""
            }`}
          className="w-24 rounded border shadow"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 rounded border shadow"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default CurriculumTable;
