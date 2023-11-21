import React, { useEffect } from "react";
import MesssageBoard from "./MessageBoard";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   navigate("/login");
    // }
  }, []);

  return (
    <div className="flex h-[100svh]">
      <div className="flex flex-col bg-slate-800 ">
        <div className="flex-1 bg-slate-600">
          <h1 className="text-white p-5">CHAT</h1>
        </div>
        <div className="flex flex-row justify-center mx-2 py-4 border-t-2">
          <img src="" className="w-10 h-10" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {user && <MesssageBoard user={user} />}
      </div>
    </div>
  );
};

export default Dashboard;
