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
                <th>Report status</th>
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
                  <td>{company._id || "No ID provided"}</td>
                  <td>{company.name || "No Company Name provided"}</td>
                  <td>{company.email || "No Email provided"}</td>
                  <td>{company.isGood ? "Safe" : "Fraud"}</td>
                  <td>{company.number || "No Number provided"}</td>
                  <td>{company.address || "No Address provided"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No Agent company found</div>
        )}
      </div>
      {selectedCompany ? (
        <ReportAgentCompanyScreen
          selectedCompany={selectedCompany}
          companyID={selectedCompany._id || "No ID provided"}
          companyName={selectedCompany.name || "No Company Name provided"}
          companyEmail={selectedCompany.email || "No Email provided"}
          companyisGood={selectedCompany.isGood ? "Safe" : "Fraud"}
          companyNumber={selectedCompany.number || "No Number provided"}
          companyAddress={selectedCompany.address || "No Address provided"}
        />
      ) : (
        <div>No company selected</div>
      )}
    </>
  );
};

export default AgentCompanyListScreen;
