import axios from '../../api/axios';
import { useState} from 'react';


/**
 * 
 * Child component of admin apge
 * 
 * This calls the back end API to change
 * the different elements called in the 
 * parent component
 * 
 * 
 * @author Scott Mains
 * 
 */

const UsersExcerpt = ({ user }) => {

    const [winUpdate, setWinUpdate] = useState('');
    const [lossUpdate, setLossUpdate] = useState('');

    const [winContent, setWinContent] = useState(true);
    const [lossContent, setLossContent] = useState(true);

    const [success, setSuccess] =useState("");

    const editWins = () => {
        const res =  axios.post('/api/admin/updateWins',
           { _id: user._id, winUpdate: winUpdate }
        ) .then((res)=> {
        setSuccess("Wins have been updated");
        window.location.reload(false);
        });
    }

    const editLosses = async (e) => {
        const res =  axios.post('/api/admin/updateLosses',
        { _id: user._id, lossUpdate: lossUpdate }
     ) .then((res)=> {
     setSuccess("Losses have been updated");
     window.location.reload(false);
     });
 }

    console.log(success)

const showWinContent = () => {
    setWinContent(!winContent)

    }

    const showLossContent = () => {
        setLossContent(!lossContent)
    }

    return (
        <article className="mx-auto p-1 mt-2 sm:w-1/3 rounded-lg border text-black  shadow-md bg-white">
            <h4 className="font-mono text-4xl"> {user.name}</h4> 
            <p className="font-mono text-lg pt-3 "> Wins: {user.wins} <button className="text-red-500" onClick={showWinContent}>Edit</button></p>
            
             <div className={winContent? 'hidden' : undefined}>
             <div className="pt-2 flex place-content-center">
             <input className="appearance-none rounded-none relative block w-20  px-3 py-2 border border-gray-300 
            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500
             focus:z-10 sm:text-sm" 
            type="text" id="wins" onChange={(e)=> setWinUpdate(e.target.value)} value={winUpdate} required />
             <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    type="button"
                    onClick={editWins}
                
                >Submit</button>
            </div>
            </div>
            <p className="font-mono text-lg pt-3 ">Losses: {user.losses} <button className="text-red-500" onClick={showLossContent}>Edit</button></p>
          
             <div className={lossContent? 'hidden' : undefined}>
             <div className="pt-2 flex place-content-center">
             <input className="appearance-none rounded-none relative block w-20  px-3 py-2 border border-gray-300 
            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500
             focus:z-10 sm:text-sm" 
            type="text" id="losses" onChange={(e)=> setLossUpdate(e.target.value)} value={lossUpdate} required />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={editLosses}>Submit</button>
            </div>
            </div>
        </article>
    )
}
export default UsersExcerpt