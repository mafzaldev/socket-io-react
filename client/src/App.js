import "./App.css"
import io from "socket.io-client"
import { useEffect, useState } from "react"

const socket = io.connect("http://localhost:3001")

function App() {
  //Room State
  const [room, setRoom] = useState("")
  const [roomStatus, setRoomStatus] = useState("")

  // Messages States
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room, (message) => {
        setRoomStatus(message)
      })
    }
  }

  const sendMessage = () => {
    socket.emit("send_message", { message, room })
    setMessage("")
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])
  return (
    <div className="App">
      <div className="input-container">
        <input
          placeholder="Room Number..."
          value={room}
          onChange={(event) => {
            setRoom(event.target.value)
          }}
        />
        <button onClick={joinRoom}> Join </button>
        <br />
        <br />
        <input
          placeholder="Message..."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
          }}
        />
        <button onClick={sendMessage}> Send </button>
      </div>
      <p>{roomStatus && roomStatus}</p>
      <p className="message">
        Message: <span>{messageReceived}</span>
      </p>
    </div>
  )
}

export default App
