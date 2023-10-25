import React from "react";
import { Tab, TabContainer, Nav } from "react-bootstrap";

const CustomTabContainer = ({ children, tabNames, activeIndex }) => {
  return (
    <>
      <TabContainer defaultActiveKey={tabNames[activeIndex]}>
        <Nav variant="tabs">
          {React.Children.map(children, (child, index) => {
            return (
              <Nav.Item>
                <Nav.Link eventKey={tabNames[index]}>
                  {tabNames[index]}
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </Nav>
        <Tab.Content>
          {React.Children.map(children, (child, index) => {
            return <Tab.Pane eventKey={tabNames[index]}>{child}</Tab.Pane>;
          })}
        </Tab.Content>
      </TabContainer>
    </>
  );
};

export default CustomTabContainer;