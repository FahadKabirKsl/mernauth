import React, { useState, useEffect } from "react";
import axios from "axios";
import ReportAgentCompanyScreen from "./ReportAgentCompanyScreen";

const AgentCompanyListScreen = () => {
  const [agentCompanies, setAgentCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  useEffect(() => {
    const fetchAgentCompanies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/agents/agentCompanies");
        setAgentCompanies(data);
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
    const number = company.number ? company.number.toLowerCase() : "";
    return (
      name.includes(searchTerm.toLowerCase()) ||
      id.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      number.includes(searchTerm.toLowerCase())
    );
  });

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
    // Handle the selected company, for example:
    console.log("Selected company data:", company);
  };

  return (
    <>
      <h1>Agent Company List</h1>
      <input
        type="text"
        placeholder="Search by company name, ID, email, or number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : filteredAgentCompanies.length ? (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Company Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgentCompanies.map((company) => (
                <tr
                  key={company._id}
                  onClick={() => handleCompanySelection(company)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{company._id}</td>
                  <td>{company.name}</td>
                  <td>{company.email}</td>
                  <td>{company.number}</td>
                  <td>{company.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Agent company found</div>
        )}
      </div>
      {selectedCompany && (
        <ReportAgentCompanyScreen selectedCompany={selectedCompany} />
      )}
    </>
  );
};

export default AgentCompanyListScreen;
