import React from 'react'
import SmallCalendar from './SmallCalendar'

const GlobalContext = React.createContext({
  monthIndex: 0 ,
  setMonthIndex: (index) => {},
  SmallCalendarMonth: null,
  setSmallCalendarMonth: (index) => {},
  selectedDay : null,
  setSelectedDay: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchEvent: ({type, payload}) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updatelabel: () => {},
  filteredEvents: [],
})

export default GlobalContext