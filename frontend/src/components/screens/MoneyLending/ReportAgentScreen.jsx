import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ReportAgentScreen = ({ selectedAgent }) => {
  const [incident, setIncident] = useState("");
  const [isGood, setIsGood] = useState(true);

  const handleReportSubmission = async () => {
    try {
      if (!selectedAgent || !selectedAgent._id) {
        throw new Error("Invalid agent selected");
      }
  
      const finalIncident = incident || "This agent is fraud"; // Setting default incident
      const response = await axios.put(
        `/api/agents/reportAgent/${selectedAgent._id}`,
        {
          incident: finalIncident,
          isGood,
        }
      );
  
      if (response.status === 200) {
        toast.success("Agent agent reported successfully");
      }
    } catch (error) {
      toast.error("Failed to report agent agent");
    }
  };

  if (!selectedAgent) {
    return <div>No Agent selected</div>;
  }

  return (
    <div>
      <h2>Report Agent</h2>
      <Form>
        <h3>Agent Details</h3>
        <Form.Group controlId="agentId">
          <Form.Label>Agent ID</Form.Label>
          <Form.Control type="text" value={selectedAgent._id} readOnly />
        </Form.Group>

        <Form.Group controlId="agentName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={selectedAgent.name} readOnly />
        </Form.Group>

        <Form.Group controlId="agentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={selectedAgent.email} readOnly />
        </Form.Group>

        <Form.Group controlId="agentNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" value={selectedAgent.number} readOnly />
        </Form.Group>

        <Form.Group controlId="agentAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={selectedAgent.address} readOnly />
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
            label="Agent is Good"
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

export default ReportAgentScreen;
