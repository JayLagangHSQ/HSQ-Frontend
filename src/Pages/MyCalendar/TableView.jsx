import React, { useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import Table from "react-bootstrap/Table";
import styles from "./calendar.module.css";

const TableView = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      { Header: "Status", accessor: "status" },
      {
        Header: "Time In",
        accessor: "clockIn",
        Cell: ({ value }) =>
          new Date(value).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
      {
        Header: "Time Out",
        accessor: "clockOut",
        Cell: ({ value }) =>
          new Date(value).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    return data.map((item) => ({
      ...item,
      month: new Date(item.date).toLocaleString("default", { month: "long" }),
    }));
  }, [data]);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const uniqueMonths = useMemo(() => {
    return [...new Set(tableData.map((item) => item.month))];
  }, [tableData]);

  const filteredData = useMemo(() => {
    const selectedMonth = uniqueMonths[currentMonthIndex];
    return selectedMonth
      ? tableData.filter((item) => item.month === selectedMonth)
      : tableData;
  }, [tableData, uniqueMonths, currentMonthIndex]);

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data: filteredData,
        initialState: {
          pageIndex: 0,
          pageSize: 31,
          sortBy: [{ id: "date", desc: true }],
        },
      },
      useSortBy,
      usePagination
    );

  const currentMonth = uniqueMonths[currentMonthIndex];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.monthPagination}>
        <button
          onClick={() =>
            setCurrentMonthIndex(
              (prevIndex) =>
                prevIndex < uniqueMonths.length - 1 ? prevIndex + 1 : prevIndex // Invert the logic for right arrow
            )
          }
          disabled={currentMonthIndex === uniqueMonths.length - 1}
          className={styles.paginationButton}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.72336 9.15807L2.40748 5.49997L9.72336 1.84187C9.97024 1.71843 10.0705 1.41812 9.94711 1.17125L9.49993 0.276569C9.37649 0.0296958 9.07618 -0.0706159 8.829 0.0528208L0.276248 4.32904C0.193179 4.37061 0.123332 4.4345 0.0745379 4.51354C0.0257443 4.59258 -6.63747e-05 4.68365 1.28188e-07 4.77654V6.22372C1.28188e-07 6.41309 0.106874 6.58621 0.276248 6.6709L8.82868 10.9471C9.07556 11.0706 9.37618 10.9706 9.49962 10.7234L9.9468 9.82869C10.0705 9.58182 9.97024 9.28151 9.72336 9.15807Z"
              fill="#F3F3F3"
            />
          </svg>
        </button>

        <h4 className={`${styles.headerPagination}`}>{currentMonth}</h4>

        <button
          onClick={() =>
            setCurrentMonthIndex(
              (prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex) // Invert the logic for left arrow
            )
          }
          disabled={currentMonthIndex === 0}
          className={styles.paginationButton}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.295 4.3291L1.74228 0.0528769C1.49541 -0.0705598 1.19479 0.0294395 1.07135 0.276625L0.624166 1.17131C0.500729 1.41818 0.600729 1.71849 0.847914 1.84193L8.1638 5.50003L0.847914 9.15813C0.601041 9.28157 0.500729 9.58188 0.624166 9.82875L1.07135 10.7234C1.19479 10.9703 1.4951 11.0706 1.74228 10.9472L10.2947 6.67096C10.4641 6.58627 10.571 6.41315 10.571 6.22377V4.7766C10.5713 4.58691 10.4644 4.41379 10.295 4.3291V4.3291Z"
              fill="#F3F3F3"
            />
          </svg>
        </button>
      </div>

      <Table {...getTableProps()} className={styles.tableView}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, key) => (
                <th {...column.getHeaderProps()} key={key}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, key) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={key}>
                {row.cells.map((cell, key) => (
                  <td {...cell.getCellProps()} key={key}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableView;
