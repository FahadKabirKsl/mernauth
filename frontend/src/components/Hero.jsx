import React from "react";
import AddAgentScreen from "./screens/Agents/AddAgentScreen";
import MyAgentScreen from "./screens/Agents/MyAgentScreen";
import { useSelector } from "react-redux";
import CustomTabs from "./screens/MoneyLending/CustomTabs";
import AgentListScreen from "./screens/MoneyLending/AgentListScreen";
import AgentCompanyListScreen from "./screens/MoneyLending/AgentCompanyListScreen";
import AllAgentCompaniesScreen from "./screens/Admin/AllAgentCompaniesScreen";
import AllAgentsScreen from "./screens/Admin/AllAgentsScreen";
import AllMoneyLendingEntitiesScreen from "./screens/Admin/AllMoneyLendingEntitiesScreen ";
import BannedAgentCompanyScreen from "./screens/Admin/BannedAgentCompanyScreen";
import BannedAgentScreen from "./screens/Admin/BannedAgentScreen";
import AllBannedEntitiesScreen from "./screens/Admin/AllBannedEntitiesScreen";

const Hero = () => {
  const user = useSelector((state) => state.auth.userInfo);
  const userRole = user ? user.role : "";
  return (
    <>
      {userRole === "admin" && (
        <>
          <AllAgentCompaniesScreen />
          <AllAgentsScreen />
          <AllMoneyLendingEntitiesScreen />
          <BannedAgentCompanyScreen />
          <BannedAgentScreen />
          <AllBannedEntitiesScreen />
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
            <CustomTabs
              tabs={[
                { title: "Agent List", content: <AgentListScreen /> },
                {
                  title: "Agent Company List",
                  content: <AgentCompanyListScreen />,
                },
              ]}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
