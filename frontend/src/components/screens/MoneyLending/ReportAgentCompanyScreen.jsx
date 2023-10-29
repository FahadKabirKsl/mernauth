import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ReportAgentCompanyScreen = ({ selectedCompany }) => {
  const [incident, setIncident] = useState("");
  const [isGood, setIsGood] = useState(true); // Default value

  const handleReportSubmission = async () => {
    try {
      if (!selectedCompany || !selectedCompany._id) {
        throw new Error("Invalid company selected");
      }
  
      const finalIncident = incident || "This company is fraud"; // Setting default incident
      const response = await axios.put(
        `/api/agents/reportAgentCompany/${selectedCompany._id}`,
        {
          incident: finalIncident,
          isGood,
        }
      );
  
      if (response.status === 200) {
        toast.success("Agent company reported successfully");
      }
    } catch (error) {
      toast.error("Failed to report agent company");
    }
  };

  if (!selectedCompany) {
    return <div>No company selected</div>;
  }

  return (
    <div>
      <h2>Report Agent Company</h2>
      <Form>
        <h3>Company Details</h3>
        <Form.Group controlId="companyId">
          <Form.Label>Company ID</Form.Label>
          <Form.Control type="text" value={selectedCompany._id} readOnly />
        </Form.Group>

        <Form.Group controlId="companyName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={selectedCompany.name} readOnly />
        </Form.Group>

        <Form.Group controlId="companyEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={selectedCompany.email} readOnly />
        </Form.Group>

        <Form.Group controlId="companyNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" value={selectedCompany.number} readOnly />
        </Form.Group>

        <Form.Group controlId="companyAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={selectedCompany.address} readOnly />
        </Form.Group>

        <Form.Group controlId="incident">
          <Form.Label>Incident Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={incident}
            onChange={(e) => setIncident(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="isGood">
          <Form.Check
            type="checkbox"
            label="Company is Good"
            checked={isGood}
            onChange={() => setIsGood(!isGood)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleReportSubmission}>
          Submit Report
        </Button>
      </Form>
    </div>
  );
};

export default ReportAgentCompanyScreen;
