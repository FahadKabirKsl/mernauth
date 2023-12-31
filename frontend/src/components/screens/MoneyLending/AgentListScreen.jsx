import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportAgentScreen from "./ReportAgentScreen";
import { Image } from "react-bootstrap";
const AgentListScreen = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/agents/list-agents");
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter((agent) => {
    const name = agent.name ? agent.name.toLowerCase() : "";
    const id = agent._id ? agent._id.toString().toLowerCase() : "";
    const email = agent.email ? agent.email.toLowerCase() : "";
    const nid = typeof agent.nid === "string" ? agent.nid.toLowerCase() : "";
    const number =
      typeof agent.number === "string" ? agent.number.toLowerCase() : "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      nid.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase())
    );
  });
  const handleAgentSelection = (agent) => {
    setSelectedAgent(agent);
    // Handle the selected agent, for example:
    console.log("Selected agent data:", agent);
  };

  return (
    <>
      <h1>Agent List</h1>
      <input
        type="text"
        placeholder="Search by name, ID, email, NID, or number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <div label="Agents">
          {loading ? (
            <div>Loading...</div>
          ) : filteredAgents.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Agent Name</th>
                  <th>Email</th>
                  <th>Image</th>
                  <th>Report status</th>
                  <th>NID</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr
                    key={agent._id}
                    onClick={() => handleAgentSelection(agent)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{agent._id || "No ID provided"}</td>
                    <td>{agent.name || "No Name provided"}</td>
                    <td>{agent.email || "No Email provided"}</td>
                    <td>
                      <Image
                        src={agent.agentAvatar || "No Image provided"}
                        alt={agent.name}
                        style={{ width: "50px", height: "50px" }}
                        rounded
                      />
                    </td>
                    <td>{agent.isGood ? "Safe" : "Fraud"}</td>
                    <td>{agent.nid || "No NID provided"}</td>
                    <td>{agent.number || "No Number provided"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Agent found</div>
          )}
        </div>
      </div>
      {selectedAgent ? (
        <ReportAgentScreen
          selectedAgent={selectedAgent}
          agentID={selectedAgent._id || "No ID provided"}
          agentName={selectedAgent.name || "No Name provided"}
          agentEmail={selectedAgent.email || "No Email provided"}
          agentisGood={selectedAgent.isGood ? "Safe" : "Fraud"}
          agentNumber={selectedAgent.number || "No Number provided"}
          agentAddress={selectedAgent.address || "No Address provided"}
        />
      ) : (
        <div>No Agents selected</div>
      )}
    </>
  );
};

export default AgentListScreen;
