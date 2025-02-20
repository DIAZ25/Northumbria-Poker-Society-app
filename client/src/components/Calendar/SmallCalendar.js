import React, { useEffect, useState, useContext } from 'react'
import dayjs from 'dayjs'
import { getMonth } from './util'
import GlobalContext from './GlobalContext';


export default function SmallCalendar() {
    // Gets current Month and Year
    const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx))
    }, [currentMonthIdx]);

    // Connect small calendar navigation with main, including Today btt
    const { monthIndex, setSmallCalendarMonth, setSelectedDay, selectedDay } = useContext(GlobalContext);
    useEffect(() => {
        setCurrentMonthIdx( monthIndex )
    }, [monthIndex])

    // Handles navigation of small calendar
    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1)
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1)
    }

    function getDayClass(day){
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = selectedDay && selectedDay.format(format);
        if(nowDay === currDay) {
            return 'bg-green-600 rounded-full text-white';
        } else if (currDay === slcDay) {
            return "bg-green-100 rounded-full text-green-600 font-bold"
        } else {
            return "";
        }
    }

    // function getDayClass(day){
    //     return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
    //     ? 'bg-blue-600 text-white rounded-full w-7'
    //     : "";
    // };

    

  return (
    <div className="mt-9">
        <header className="flex justify-between">

            {/*  */}
            <p className="text-gray-700 font-bold">
                {dayjs(new Date(dayjs().year(), currentMonthIdx))
                .format("MMMM YYYY")}
            </p>

            {/*Creation of small calendar Nav buttons*/}
            <div>
                <button onClick={handlePrevMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-700 mx-2">
                        chevron_left
                    </span>
                </button>
                <button onClick={handleNextMonth}>
                    <span className="material-icons-outlined cursor-pointer text-gray-700 mx-2">
                        chevron_right
                    </span>
                </button>
            </div>
            
        </header>

        <div className="grid grid-cols-7 grid-rows-6 font-bold">
            {currentMonth[0].map((day, i) => (
                <span key={i} className="text-sm py-1 text-center">
                    {day.format('dd').charAt(0)}
                </span>
            ))}
            {currentMonth.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <button 
                        key={idx} 
                        onClick={() => {
                            setSmallCalendarMonth(currentMonthIdx);
                            setSelectedDay(day)
                        }}
                        className={`py-1 w-full ${getDayClass(day)}`}>
                            <span className="text-sm">{day.format('D')}</span>
                        </button>
                    ))}
                </React.Fragment>
            ))}
        </div>
        
    </div>
  )
}
