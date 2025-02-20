import React, {useContext} from 'react'
import plusImg from '../../assets/chip.png'
import GlobalContext from './GlobalContext'

export default function CreateEventBt() {
  const {setShowEventModal} = useContext(GlobalContext)
  return (
    <button onClick={() => setShowEventModal(true)}
    
     className="border p-2 rounded-full flex item-center shadow-md hover:shadow-2xl">
        <img src={plusImg} alt="create_event" className='w-7 h-7' />
        <span className="pl-3 pr-7">
            Create
        </span>
    </button>
  )
}
