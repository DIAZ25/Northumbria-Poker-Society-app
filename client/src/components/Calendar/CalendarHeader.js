import dayjs from 'dayjs';
import React, { useContext } from 'react'
import pokerLogo from '../../assets/pokerlogo.svg'
import GlobalContext from './GlobalContext';


// function handles nav of main calendar
export default function CalendarHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1)
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1)
    }
    function handleReset() {
        setMonthIndex(monthIndex === dayjs().month() 
        ? monthIndex + Math.random() 
        : dayjs().month());
    }

  return (
    <header className="bg-gray-300 px-4 py-2 flex items-center">
        <img src={pokerLogo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-700 font-bold">Event Calendar</h1>
        
        
        {/*Navigation buttons*/}
        <button onClick={handleReset} className="border bg-green-700 rounded py-2 px-4 mr-5">
            Today
        </button>
        <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                chevron_left
            </span>
        </button>
        <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
                chevron_right
            </span>
        </button>

        {/* Formating for Month and Year */}
        <h2 className="ml-4 text-xl text-gray-700 font-bold">
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
    </header>
  );
}
