import React, { useState, useEffect } from "react";
import axios from "axios";

const AllAgentsScreen = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAgents, setTotalAgents] = useState(0);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/agents");
        setAgents(data);
        setTotalAgents(data.length);
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
    const id = agent._id ? agent._id.toLowerCase() : "";
    const email = agent.email ? agent.email.toLowerCase() : "";
    const nid = typeof agent.nid === "string" ? agent.nid.toLowerCase() : "";
    const number =
      typeof agent.number === "string" ? agent.number.toLowerCase() : "";
    // Add other fields as needed for the search functionality

    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      nid.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>All Agents</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, ID, email, or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p>Total Agents: {totalAgents}</p>
      {loading ? (
        <div>Loading...</div>
      ) : filteredAgents.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              {/* Add other required fields here */}
            </tr>
          </thead>
          <tbody>
            {filteredAgents.map((agent) => (
              <tr key={agent._id}>
                <td>{agent._id}</td>
                <td>{agent.name}</td>
                <td>{agent.email}</td>
                <td>{agent.number}</td>
                {/* Add other required fields here */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No agents found</div>
      )}
    </div>
  );
};

export default AllAgentsScreen;
