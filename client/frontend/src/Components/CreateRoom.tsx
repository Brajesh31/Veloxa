import React from "react"
import { Socket } from "socket.io-client"
import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

const CreateRoom : React.FC = () => {

    const { socket } = useContext(SocketContext)

    const initRoom = () => {
        console.log("Initializing a req to create a room")
        socket.emit("create-room")
    }

    return (
        <button onClick={initRoom}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
           Start a new meeting in a new room
        </button>
    )
} 

export default CreateRoom