import React, { useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Table from "react-bootstrap/Table";
import styles from './calendar.module.css';

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
        Cell: ({ value }) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      },
      {
        Header: "Time Out",
        accessor: "clockOut",
        Cell: ({ value }) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 31, sortBy: [{ id: "date", desc: false }] },
    },
    useSortBy,
    usePagination,
  );

  const currentMonth = uniqueMonths[currentMonthIndex];

  return (
    <div className={styles.tableContainer}>
      <div className={styles.monthPagination}>
        <button
          onClick={() =>
            setCurrentMonthIndex((prevIndex) =>
              prevIndex > 0 ? prevIndex - 1 : prevIndex
            )
          }
          disabled={currentMonthIndex === 0}
          className={styles.paginationButton}
        >
          <IoIosArrowBack />
        </button>

        <h4 className={`${styles.headerPagination}`}>{currentMonth}</h4>
        
        <button
          onClick={() =>
            setCurrentMonthIndex((prevIndex) =>
              prevIndex < uniqueMonths.length - 1 ? prevIndex + 1 : prevIndex
            )
          }
          disabled={currentMonthIndex === uniqueMonths.length - 1}
          className={styles.paginationButton}
        >
          <IoIosArrowForward />
        </button>
      </div>

      <Table {...getTableProps()} className={styles.tableView}>
        <thead>
          {headerGroups.map((headerGroup, key) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={key}>
              {headerGroup.headers.map((column, key) => (
                <th {...column.getHeaderProps()}  key={key}>
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
                  <td {...cell.getCellProps()} key={key} >
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