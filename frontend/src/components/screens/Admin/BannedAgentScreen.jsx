import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BannedAgentScreen = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/agents");
        setAgents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const handleBanAgent = async (id) => {
    try {
      await axios.put(`/api/admin/agents/${id}/ban`);
      toast.success("Agent banned successfully");
      window.location.reload(); // Reloading the page after a successful ban
    } catch (error) {
      console.error("Error banning agent:", error);
      toast.error("Error banning agent");
    }
  };

  const filteredAgents = agents.filter((agent) => {
    const name = agent.name ? agent.name.toLowerCase() : "";
    const id = agent._id ? agent._id.toLowerCase() : "";
    const email = agent.email ? agent.email.toLowerCase() : "";
    const number =
      typeof agent.number === "string" ? agent.number.toLowerCase() : "";
    const nid = typeof agent.nid === "string" ? agent.nid.toLowerCase() : "";

    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase()) ||
      nid.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h2>Banned Agent Screen</h2>
      <input
        type="text"
        placeholder="Search by name, ID, email, number, or NID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredAgents.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>NID</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent._id}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.number}</td>
                <td>{agent.nid}</td>
                <td>
                  <button onClick={() => handleBanAgent(agent._id)}>
                    Ban Agent
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No agents found</div>
      )}
      <p>Total Agents: {filteredAgents.length}</p>
    </div>
  );
};

export default BannedAgentScreen;
