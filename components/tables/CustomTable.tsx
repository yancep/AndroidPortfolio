"use client";
import { PaginationMeta } from "@/core/api/BaseState";
import {
  Pagination,
  SortDescriptor,
  Spacer,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import clsx from "clsx";
import React from "react";

export interface CustomTableState {
  rowsPerPage: number;
  page: number;
  order: "asc" | "desc";
}

export interface SearchState {
  value: string;
  isLoading: boolean;
}

export default function CustomTable<T extends { id?: string; url?: string }>({
  HEADER_COLUMNS,
  TOP_CONTENT,
  ITEMS,
  LOADING_STATE,
  CELL_RENDERERS,
  PAGINATION,
  CUSTOM_BOTTOM_CONTENT,
  ERROR,
  topContentPlacement = "outside",
  TABLE_STATE,
  UPDATE_TABLE_STATE,
  customMemoDeps = [],
  className,
}: {
  TABLE_STATE: CustomTableState;
  UPDATE_TABLE_STATE: (state: CustomTableState) => void;
  CUSTOM_BOTTOM_CONTENT?: React.ReactNode | null;
  PAGINATION?: PaginationMeta | null;
  TOP_CONTENT?: React.ReactNode;
  HEADER_COLUMNS: { name: string; uid: string; sortable?: boolean }[];
  LOADING_STATE: "loading" | "idle";
  ITEMS: T[] | undefined | null;
  CELL_RENDERERS: { [key: string]: (item: T) => React.ReactNode };
  ERROR?: string | null;
  topContentPlacement?: "outside" | "inside";
  customMemoDeps?: any[];
  className?: string;
}) {
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "fullName",
    direction: "ascending",
  });

  const showItemsCount = () => {
    return PAGINATION ? (
      <div className="px-2">
        <span className="text-small text-gray-500">
          Mostrado{" "}
          {PAGINATION.currentPage === 1
            ? 1
            : (PAGINATION.currentPage - 1) * TABLE_STATE.rowsPerPage + 1}{" "}
          -{" "}
          {PAGINATION.currentPage * TABLE_STATE.rowsPerPage >
          PAGINATION.itemCount
            ? PAGINATION.itemCount
            : PAGINATION.currentPage * TABLE_STATE.rowsPerPage}{" "}
          de un total de {PAGINATION.itemCount}
        </span>
      </div>
    ) : (
      <></>
    );
  };

  const BOTTOM_CONTENT = React.useMemo(() => {
    return (
      <div className="flex flex-row items-center justify-between px-4">
        {PAGINATION ? (
          <>
            {showItemsCount()}
            <div className="flex flex-row items-center">
              {changeRowsCount()}
              <Spacer />
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={PAGINATION.currentPage!}
                total={PAGINATION.pageCount!}
                onChange={(page) =>
                  UPDATE_TABLE_STATE({
                    ...TABLE_STATE,
                    page: page,
                  })
                }
              />
            </div>
          </>
        ) : (
          <div className="flex w-full justify-end px-4">
            {CUSTOM_BOTTOM_CONTENT}
          </div>
        )}
      </div>
    );
  }, [TABLE_STATE.rowsPerPage, PAGINATION, ...customMemoDeps]);

  function changeRowsCount() {
    return (
      <label className="flex items-center text-small text-default-400">
        Filas por páginas:
        <Spacer />
        <select
          value={TABLE_STATE.rowsPerPage}
          className="bg-transparent text-small text-default-400 outline-none"
          onChange={(e) => {
            UPDATE_TABLE_STATE({
              ...TABLE_STATE,
              rowsPerPage: parseInt(e.target.value),
            });
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
        </select>
      </label>
    );
  }

  const heightTable = LOADING_STATE === "loading" ? "h-full" : "max-h-full";

  return (
    <Table
      id="table"
      className={className ?? ""}
      classNames={{
        wrapper: `p-0 ${heightTable} max-w-full`,
        base: `p-4 ${heightTable} `,
        tr: "border-primary",
      }}
      isHeaderSticky
      bottomContentPlacement="outside"
      topContentPlacement={topContentPlacement}
      topContent={TOP_CONTENT}
      bottomContent={LOADING_STATE !== "loading" && BOTTOM_CONTENT}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={HEADER_COLUMNS}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        className="block max-h-[500px] overflow-y-auto"
        style={{
          padding: 4,
        }}
        emptyContent={
          LOADING_STATE !== "loading" && !ERROR ? (
            <span>Sin registro</span>
          ) : (
            <span>{ERROR}</span>
          )
        }
        items={LOADING_STATE === "loading" ? [] : ITEMS ? ITEMS : []}
        loadingState={LOADING_STATE}
        loadingContent={<Spinner />}
      >
        {(item: T) => (
          <TableRow
            key={item.id || item.url?.split('/').filter(Boolean).pop()} // Usamos id o el último segmento de la URL como key
            style={{
              borderBottomWidth: "0.5px",
            }}
            className="border-b-default hover:bg-default-100"
          >
            {HEADER_COLUMNS.map((column) => (
              <TableCell
                style={{
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
                className={clsx(
                  column.uid === "projectsActions" ? "w-full" : ""
                )}
                key={`${item.id || item.url}-${column.uid}`}
              >
                {CELL_RENDERERS[column.uid](item)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}