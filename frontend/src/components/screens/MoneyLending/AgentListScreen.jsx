import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportAgentScreen from "./ReportAgentScreen";
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
                  <th>NID</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent._id} onClick={() => handleAgentSelection(agent)}
                  style={{ cursor: "pointer" }}>
                    <td>{agent._id}</td>
                    <td>{agent.name}</td>
                    <td>{agent.email}</td>
                    <td>{agent.nid}</td>
                    <td>{agent.number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>No Agent found</div>
          )}
        </div>
      </div>
      {selectedAgent && (
        <ReportAgentScreen selectedAgent={selectedAgent} />
      )}
    </>
  );
};

export default AgentListScreen;
