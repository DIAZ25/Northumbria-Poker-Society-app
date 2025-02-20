import React, {useState, useEffect, useReducer, useMemo} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, {type, payload}) {
  switch (type) {
    case 'push':
      return [...state, payload];
    case "update":
      return state.map(event => event.id === payload.id ? payload : event)
    case "delete":
      return state.filter(event => event.id !== payload.id)
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents')
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
  return parsedEvents
}



export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [SmallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, dispatchEvent] = useReducer(savedEventsReducer, [], initEvents);
  const filteredEvents = useMemo(() => {
    return savedEvents.filter((event) => 
    labels
    .filter(lbl => lbl.checked)
    .map(lbl => lbl.label)
    .includes(event.label)
    );
  }, [savedEvents, labels]);


  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents])

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set( savedEvents.map(event =>event.label))].map(label => {
        const currentLabel = prevLabels.find(lbl => lbl.label === label)
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      }
    );
    });
  }, [savedEvents]);

  useEffect(() => {
    if(SmallCalendarMonth !== null) {
      setMonthIndex(SmallCalendarMonth);
    }
  }, [SmallCalendarMonth]);

  useEffect(() => {
    if(!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal])

  function updateLabel(label) {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
  }

  return (
    <GlobalContext.Provider 
    value={{
      monthIndex, 
      setMonthIndex, 
      SmallCalendarMonth, 
      setSmallCalendarMonth,
      selectedDay,
      setSelectedDay,
      showEventModal,
      setShowEventModal,
      dispatchEvent,
      savedEvents,
      selectedEvent,
      setSelectedEvent,
      labels,
      setLabels,
      updateLabel,
      filteredEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  )
}