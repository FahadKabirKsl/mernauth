import React from "react";
import AddAgentScreen from "./screens/Agents/AddAgentScreen";
import MyAgentScreen from "./screens/Agents/MyAgentScreen";
import { useSelector } from "react-redux";
import CustomTabs from "./screens/MoneyLending/CustomTabs";
import AgentListScreen from "./screens/MoneyLending/AgentListScreen";
import AgentCompanyListScreen from "./screens/MoneyLending/AgentCompanyListScreen";


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
      {(userRole === "moneyLendingCompany" ||
        userRole === "moneyLendingIndividual") && (
        <>
          <h2>List Table</h2>
          <div>
            {/* <AgentCompanyListScreen />
            <AgentListScreen /> */}
            <CustomTabs tabs={[
                { title: "Agent List", content: <AgentListScreen /> },
                { title: "Agent Company List", content: <AgentCompanyListScreen /> },
              ]} />
          </div>
          <h2>Report</h2>

          <div>
            <CustomTabs />
            {/* <ReportAgentCompanyScreen />
            <ReportAgentScreen /> */}
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
