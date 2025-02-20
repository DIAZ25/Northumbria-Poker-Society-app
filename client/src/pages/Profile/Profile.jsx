import React from 'react'
import Navbar from "../../components/Navbar/Navbar"
import useAuth from "../../context/Auth/useAuth";
import Avatar from 'react-avatar';
import Chatbot from '../../components/Chatbot/Chatbot';
import axios from '../../api/axios';

/**
 * 
 * Contains all the logic/display data for profile page.
 * 
 * Calls the auth context to display
 * all the different user data.
 * 
 * 
 * @author Scott Mains
 * 
 */

const Profile = () => {

    const {userDetails } = useAuth();
    const obj = JSON.stringify(userDetails)
    const user = JSON.parse(obj)
    console.log(userDetails)
   
    const wins = parseFloat(user.wins)
    const losses= parseFloat(user.losses)

    const [showModal, setShowModal] = React.useState(false);

    let ratio = ""
    if (losses === 0) {
    ratio =  wins / 1
    } else {
    ratio = wins / losses
    }

    const userDelete = async (e) => {
        e.preventDefault();
        axios.post('/api/profile/userdelete',
           { email: user.email}
        ) .then(response => {
        window.location.reload(false);
        })
    }

  return (
    <>
     {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start text-center justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    DELETE ACCOUNT  
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                   Are you sure you want to delete?
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-red-500 mx-auto text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={userDelete}
                  >
                   DELETE 
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) :
     <div className="min-h-screen">
    <Navbar />
    <div className="relative md:pt-16 md:pb-32 flex content-center items-center justify-center ">
    <div className="bg-landing-background bg-cover bg-center absolute  top-0 w-full h-3/6 md:h-4/5   " />
    <div className="container relative mx-auto ">
        <div className="pb-44 md:pb-10 ">
          <div className="mt-3  "> 
                <h1 className="md:text-6xl text-3xl tracking-widest text-white pt-10 ">Profile</h1> </div>
                </div>
    </div>
    </div>
    <div className="container flex justify-center mx-auto text-white">
        <div className="p-5 bg-green-700 mx-auto md:w-1/3 w-4/5 rounded-xl max-w-lg hover:shadow">
            <div className="justify-between w-full text-center"> 
                <div className="ml-2">
                    <div className="p-3 ">
                    <Avatar name={user.name} round={true} />
                        <h3 className="text-2xl pt-4"> {user.name}</h3> 
                        <span>  {user.email}</span>
                    </div>
                    <div className="flex w-2/3 mx-auto justify-between items-center p-3  rounded-lg">
                        <div className="mr-3"> <span className="text-white block">Wins</span> 
                        <span className="font-bold text-xl">{user.wins}</span> </div>
                        <div className="mr-3"> <span className=" block">Losses</span> 
                        <span className="font-bold  text-xl">{user.losses}</span> </div>
                        <div> <span className="block">Ratio</span> 
                        <span className="font-bold  text-xl">{ratio}</span> </div>
                    </div>
                </div>
                <div className="pt-4"> 
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"  onClick={() => setShowModal(true)}>Delete Account</button>
                </div>
            </div>
            
        </div>
    </div>
    </div>}
 </>
  );
}

export default Profile
