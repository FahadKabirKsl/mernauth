import React, { useState, useEffect } from "react";
import axios from "axios";

const BannedAgentCompanyScreen = () => {
  const [agentCompany, setAgentCompany] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAgentCompany = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/admin/agentCompanies");
        // Make sure data is an array
        if (Array.isArray(data)) {
          setAgentCompany(data);
        } else {
          setAgentCompany([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agent company data:", error);
        setLoading(false);
      }
    };
    fetchAgentCompany();
  }, []);

  const handleBanAgentCompany = async (id) => {
    try {
      await axios.put(`/api/admin/agentCompanies/${id}/ban`);
      // Optionally, you can update the agent company list after banning
    } catch (error) {
      console.error("Error banning agent company:", error);
    }
  };

  const filteredAgentCompanies = Array.isArray(agentCompany)
    ? agentCompany.filter((company) => {
        const name = company.name ? company.name.toLowerCase() : "";
        const id = company._id ? company._id.toLowerCase() : "";
        const email = company.email ? company.email.toLowerCase() : "";
        const number = company.number ? company.number.toLowerCase() : "";
        const cid = company.cid ? company.cid.toLowerCase() : "";
        return (
          name.includes(searchTerm.toLowerCase()) ||
          id.includes(searchTerm.toLowerCase()) ||
          email.includes(searchTerm.toLowerCase()) ||
          number.includes(searchTerm.toLowerCase()) ||
          cid.includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div>
      <h2>Banned Agent Companies</h2>
      <input
        type="text"
        placeholder="Search by name, ID, email, number, or cid"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div>Loading...</div>
      ) : filteredAgentCompanies.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Compnay ID</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
            {filteredAgentCompanies.map((company) => (
              <tr key={company._id}>
                <td>{company._id}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.number}</td>
                <td>{company.cid}</td>
                <td>
                  <button onClick={() => handleBanAgentCompany(company._id)}>
                    Ban
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No Agent Companies found</div>
      )}
      <p>Total Agent Companies: {filteredAgentCompanies.length}</p>
    </div>
  );
};

export default BannedAgentCompanyScreen;
