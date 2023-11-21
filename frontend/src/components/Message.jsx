import React from "react";

const Message = ({ message, currentUser }) => {
  const isUser = currentUser === message.username;

  const messageClasses = isUser ? "currentUserMessage" : "otherUserMessage";

  return (
    <div
      className={`flex gap-1 items-end my-2 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      <img className="rounded-full w-7 h-7" src={message.avatar} />
      <div className={`flex-initial rounded-xl p-2 border ${messageClasses}`}>
        <span className="text-sm md:text-md lg:text-lg mb-1">
          {message.content}
        </span>
        <div className="text-xs text-end font-light">{message.time}</div>
      </div>
    </div>
  );
};

export default Message;
