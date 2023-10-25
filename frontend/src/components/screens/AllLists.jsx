import React from "react";
import CustomTabContainer from "../CustomTabContainer";
import AgentList from "../Table/AgentList";
import AgentCompanyList from "../Table/AgentCompanyList";

const AllLists = () => {
  const tabNames = ["Agent", "Agent Company"];
  const activeIndex = 0;
  return (
    <>
      <CustomTabContainer tabNames={tabNames} activeIndex={activeIndex}>
        <AgentList />
        <AgentCompanyList />
      </CustomTabContainer>
    </>
  );
};

export default AllLists;
