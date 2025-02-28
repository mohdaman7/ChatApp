import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";
import { FaReact, FaUsers, FaBell } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";

function Chat() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const socketio = socketIOClient("http://localhost:3000");
  const [chats, setChats] = useState([]);
  const [onlineUsers] = useState(["Sarah", "Mike", "Jessica", "David"]); // Mock data
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    socketio.on("chat", (chats) => {
      setChats(chats);
    });
  }, [socketio]);

  const sendToSocket = (chat) => {
    socketio.emit('chat', chat);
  };

  const addMessage = (chat) => {
    const newChat = {
      ...chat,
      user: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar"),
    };
    setChats([...chats, newChat]);
    sendToSocket([...chats, newChat]);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('avatar');
    setUser('');
  };

  return (
    <div className="h-screen w-full bg-gray-50 font-sans flex">
      {user ? (
        <>
  
          <div className={`bg-indigo-800 text-white ${showSidebar ? 'w-64' : 'w-16'} flex-shrink-0 transition-all duration-300 flex flex-col`}>
  
            <div className="p-4 border-b border-indigo-700 flex items-center">
              <FaReact className="text-2xl text-indigo-300" />
              {showSidebar && <span className="ml-3 font-bold text-xl">CodeMesh</span>}
            </div>
            
     
            <div className="p-4 border-b border-indigo-700 flex items-center">
              <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center">
                {user.charAt(0).toUpperCase()}
              </div>
              {showSidebar && (
                <div className="ml-3 overflow-hidden">
                  <div className="font-medium truncate">{user}</div>
                  <div className="text-xs text-indigo-300 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-400 mr-2"></div>
                    Online
                  </div>
                </div>
              )}
            </div>
            
   
            <div className="flex-1 overflow-y-auto">
              {showSidebar && <div className="px-4 py-2 text-xs font-semibold text-indigo-300">ONLINE USERS</div>}
              <div className="space-y-1 p-2">
                {onlineUsers.map((username) => (
                  <div key={username} className="flex items-center p-2 rounded-lg hover:bg-indigo-700 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm">
                      {username.charAt(0)}
                    </div>
                    {showSidebar && <div className="ml-3 truncate">{username}</div>}
                  </div>
                ))}
              </div>
            </div>
            

            <div className="p-4 border-t border-indigo-700">
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showSidebar ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col">

            <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6 flex-shrink-0">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-800">CodeMesh Chat</h1>
                <div className="ml-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium">
                  Global
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700 relative">
                  <FaBell className="text-xl" />
                  <div className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></div>
                </button>
                <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium">
                  Logout
                </button>
              </div>
            </div>
      
            <div className="flex-1 overflow-y-auto bg-white">
              <div className="max-w-4xl mx-auto px-6 py-8">
                <ChatList chats={chats} />
              </div>
            </div>
   
            <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-1">
                  <InputText addMessage={addMessage} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full">
          <UserLogin setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default Chat;