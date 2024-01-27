import { Link } from "react-router-dom"
export default function MyCalendarDropdown({ComingSoonBadge, isMyCalendarDropped}){
    return(
        <>
            <div className={`ml-4 mt-2 ${!isMyCalendarDropped ? 'd-none' : null}`}>
                <Link to={'/my-calendar/timesheet'}>My Attendance</Link>
                <span className="user-select-none text-muted">My Schedules <ComingSoonBadge/> </span>
            </div>
        </>
    )
}