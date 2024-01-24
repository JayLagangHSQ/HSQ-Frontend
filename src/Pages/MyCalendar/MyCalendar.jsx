import React, { useEffect, useState } from "react";
import TableView from "./TableView";
import LoaderTwo from "../../Components/Subcomponents/loader/LoaderTwo";
import styles from "./calendar.module.css";
import CalendarView from "./CalendarView";
import { clockIn } from "../../Util/clockIn";
import Swal from "sweetalert2";

const MyCalendar = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/user/timesheet`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              all: true,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result.timeSheet);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoaderTwo />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleClockIn = async() =>{
    const isClockedIn = await clockIn();
    if(isClockedIn === true){
      Swal.fire({
        title: "Clock-in Successful!",
        customClass: {
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button',
        }
      })
    } else {
      Swal.fire({
        title: `${isClockedIn.error}`,
        customClass: {
          title: 'custom-swal-title',
          confirmButton: 'custom-swal-confirm-button', 
        }
      });			
    }
  }
  return (
    // mockdata is the one that I used at the moment
    <div className={styles.attendanceContainer}>
      <div className="align-self-end d-flex justify-content-end">
        <div onClick={handleClockIn} className="border p-1 borderRadius-8 mr-3" style={{cursor:'pointer'}}>
          <span>Clock-in <img src="/icons/pop-clock-out.svg" alt="" /></span>
        </div>
      </div>
      <div>
        <div className={styles.viewType}>
          <select
            id="viewType"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className={styles.viewSelect}
          >
            <option value="table">Table View</option>
            <option value="calendar">Calendar View</option>
          </select>
        </div>
        {viewType === "table" ? (
          <TableView data={data} />
        ) : (
          <CalendarView data={data} />
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
