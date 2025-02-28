import React from 'react';

function ChatList({ chats }) {
  const user = localStorage.getItem('user');
  
  function SenderChat({ message, username, avatar, timestamp }) {
    return (
      <div className="flex justify-end mb-6 transform transition-all duration-300 hover:scale-102">
        <div className="flex flex-col items-end max-w-[70%]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-800">{username}</span>
            <div className="relative">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-400 shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-tr-none shadow-md">
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">{timestamp || 'Just now'}</span>
        </div>
      </div>
    );
  }

  function ReceiverChat({ message, username, avatar, timestamp }) {
    return (
      <div className="flex justify-start mb-6 transform transition-all duration-300 hover:scale-102">
        <div className="flex flex-col items-start max-w-[70%]">
          <div className="flex items-center gap-2 mb-1">
            <div className="relative">
              <img
                src={avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300 shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
            </div>
            <span className="text-sm font-semibold text-gray-800">{username}</span>
          </div>
          <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-100">
            <p className="text-sm">{message}</p>
          </div>
          <span className="text-xs text-gray-500 mt-1">{timestamp || 'Just now'}</span>
        </div>
      </div>
    );
  }

  const groupChatsByDate = (chats) => {
    const groups = {};
    chats.forEach(chat => {
      const date = chat.timestamp ? new Date(chat.timestamp).toLocaleDateString() : 'Today';
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(chat);
    });
    return groups;
  };

  const groupedChats = groupChatsByDate(chats);

  return (
    <div className="p-6 overflow-y-auto bg-gray-50">
      {Object.entries(groupedChats).map(([date, dateChats]) => (
        <div key={date} className="mb-6">
          <div className="flex justify-center mb-4">
            <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-medium">
              {date}
            </span>
          </div>
          
          {dateChats.map((chat, index) =>
            chat.user === user ? (
              <SenderChat
                key={index}
                message={chat.message}
                username={chat.user}
                avatar={chat.avatar}
                timestamp={chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null}
              />
            ) : (
              <ReceiverChat
                key={index}
                message={chat.message}
                username={chat.user}
                avatar={chat.avatar}
                timestamp={chat.timestamp ? new Date(chat.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null}
              />
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;