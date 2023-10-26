import React from "react";
import AddAgentScreen from "./screens/Agents/AddAgentScreen";
import MyAgentScreen from "./screens/Agents/MyAgentScreen";
import { useSelector } from "react-redux";

const Hero = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const userRole = user ? user.role : "";
  return (
    <>
      {userRole === "admin" && (
        <>
          {/* Show all agent table */}
          {/* Show all agent company table */}
          {/* Show banned agent or company form */}
        </>
      )}
      {userRole === "agentCompany" && (
        <>
          <MyAgentScreen />
          <AddAgentScreen />
        </>
      )}
      {userRole === "moneyLendingCompany" && (
        <>
          {/* Show my agent/agent company table */}
          {/* Show report agent form */}
        </>
      )}
    </>
  );
};

export default Hero;
