import React, { useState, useEffect } from "react";
import axios from "axios";

const AllAgentCompaniesScreen = () => {
  const [agentCompanies, setAgentCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAgentCompanies, setTotalAgentCompanies] = useState(0);

  useEffect(() => {
    const fetchAgentCompanies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/agents/agentCompanies");
        setAgentCompanies(data);
        setTotalAgentCompanies(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agent companies:", error);
        setLoading(false);
      }
    };
    fetchAgentCompanies();
  }, []);

  const filteredAgentCompanies = agentCompanies.filter((company) => {
    const name = company.name ? company.name.toLowerCase() : "";
    const id = company._id ? company._id.toLowerCase() : "";
    const email = company.email ? company.email.toLowerCase() : "";
    // const number = company.number ? company.number.toLowerCase() : '';
    const number =
      typeof company.number === "string" ? company.number.toLowerCase() : "";
    // Add other fields as needed for the search functionality

    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>All Agent Companies</h1>
      <div>
        <input
          type="text"
          placeholder="Search by name, ID, email, or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <p>Total Agent Companies: {totalAgentCompanies}</p>
      {loading ? (
        <div>Loading...</div>
      ) : filteredAgentCompanies.length ? (
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
            {filteredAgentCompanies.map((company) => (
              <tr key={company._id}>
                <td>{company._id}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.number}</td>
                {/* Add other required fields here */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Agent companies found</div>
      )}
    </div>
  );
};

export default AllAgentCompaniesScreen;
