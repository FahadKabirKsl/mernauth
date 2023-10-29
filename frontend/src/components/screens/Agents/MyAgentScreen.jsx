import React, { useState, useEffect } from "react";
import { Table, Image } from "react-bootstrap";
import Loader from "../../Loader";
import axios from "axios";

const MyAgentScreen = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/agents/myagents");
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);
  return (
    <>
      <h1>My Agents</h1>
      
      {loading ? (
        <Loader />
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>NID</th>
              <th>ADDRESS</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent._id}</td>
                <td>
                  <Image
                    src={agent.agentAvatar}
                    alt={agent.name}
                    style={{ width: "50px", height: "50px" }}
                    rounded
                  />
                </td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.nid}</td>
                <td>{agent.address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyAgentScreen;
