import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import { Textarea, Spinner } from "flowbite-react";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// Utitility Functions
const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const SERVER_URL = import.meta.env.VITE_REACT_APP_SERVER_URL;

const MessageBoard = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const messageboardRef = useRef(null);
  const socketRef = useRef(null);

  const scrollToBottom = () => {
    const container = messageboardRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    if (user) {
      socketRef.current = io.connect(SERVER_URL);

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [user]);

  useEffect(() => {
    const handleChatHistory = (history) => {
      setMessages((prevMessages) => [...prevMessages, ...history]);
      setLoading(false);
    };

    const handleError = (error) => {
      console.log("An error occured: ", error);
    };

    if (socketRef.current) {
      socketRef.current.on("chat_history", handleChatHistory);
      socketRef.current.on("error", handleError);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("chat_history", handleChatHistory);
        socketRef.current.off("error", handleError);
      }
    };
  }, [socketRef.current]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = () => {
    if (content.trim() !== "") {
      const newMessage = {
        content: content,
        time: getTime(),
        username: user.username,
        avatar: user.avatar,
        id: uuidv4(),
      };

      setContent("");
      socketRef.current.emit("send_message", newMessage);
    }
  };

  const handleKeyEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNewMessage();
    }
  };

  const renderMessage = () => {
    if (messages.length !== 0) {
      return messages.map((newMessage, index) => (
        <Message
          message={newMessage}
          currentUser={user.username}
          key={newMessage.id}
        />
      ));
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <Spinner aria-label="loader" size="xl" />
        </div>
      ) : (
        <>
          <div className="flex-1 flex flex-col justify-end pt-4 overflow-hidden">
            <div className="overflow-y-scroll px-6" ref={messageboardRef}>
              {renderMessage()}
            </div>
          </div>
          <div className="relative flex p-4 px-5 bg-slate-900">
            <Textarea
              className="w-full pr-10 resize-none"
              placeholder="Send a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyEnter}
            />
            <button
              onClick={handleNewMessage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-violet-400 rounded-md p-2"
            >
              <IoMdSend size="1rem" className="text-white" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MessageBoard;
