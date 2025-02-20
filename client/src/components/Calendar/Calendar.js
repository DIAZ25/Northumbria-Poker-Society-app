import './Calendar.css';
import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './util';
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import Month from './Month';
import GlobalContext from './GlobalContext';
import EventModal from './EventModal';

function Calendar() {
  
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  } , [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}
      <div className="sm:flex h-screen flex flex-col">
        <CalendarHeader />
        <div className="md:flex md:flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
      {/* sm:flex-direction-column */}
      {/* sm:flex-wrap-col */}

    </React.Fragment>


  );
}

export default Calendar;
