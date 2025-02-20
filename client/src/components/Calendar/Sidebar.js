import React from 'react'
import CreateEventBt from './CreateEventBt'
import SmallCalendar from './SmallCalendar'
import Labels from './Labels'

export default function Sidebar() {
  return (
    <aside className="border p-5 w-64 ">
      <CreateEventBt/>
      <SmallCalendar/>
      <Labels />
    </aside>
  )
}
