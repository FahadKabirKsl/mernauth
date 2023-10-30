import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../Loader";

const ReportAgentScreen = ({
  selectedAgent,
  agentID,
  agentName,
  agentEmail,
  agentNumber,
  agentAddress,
}) => {
  const [incident, setIncident] = useState("");
  const [isGood, setIsGood] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleReportSubmission = async () => {
    try {
      if (!selectedAgent || !selectedAgent._id) {
        throw new Error("Invalid agent selected");
      }

      setIsLoading(true);

      const response = await axios.put(
        `/api/agents/reportAgent/${selectedAgent._id}`,
        {
          incident: incident || "This Agent is fraud",
          isGood,
        }
      );

      if (response.status === 200) {
        toast.success("Agent reported successfully");
        // Reload the page here
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to report agent");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAgent && !selectedAgent.isGood) {
      setIsGood(false);
    }
  }, [selectedAgent]);

  const handleCheckboxChange = () => {
    if (!selectedAgent.isGood) {
      toast.error(`${selectedAgent.name} is a fraud agent`, { type: "error" });
    } else {
      setIsGood(!isGood);
    }
  };

  if (!selectedAgent) {
    return <div>No Agent selected</div>;
  }

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Report Agent</h2>
      <Form>
        <Form.Group controlId="agentId">
          <Form.Label>Agent ID</Form.Label>
          <Form.Control type="text" value={agentID} readOnly />
        </Form.Group>

        <Form.Group controlId="agentName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={agentName} readOnly />
        </Form.Group>

        <Form.Group controlId="agentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={agentEmail} readOnly />
        </Form.Group>

        <Form.Group controlId="agentNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" value={agentNumber} readOnly />
        </Form.Group>

        <Form.Group controlId="agentAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={agentAddress} readOnly />
        </Form.Group>

        {selectedAgent.isGood ? (
          <div>
            <Form.Group controlId="incident">
              <Form.Label>Incident Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={incident}
                onChange={(e) => setIncident(e.target.value)}
                readOnly={!isGood}
              />
            </Form.Group>

            <Form.Group controlId="isGood">
              <Form.Check
                type="checkbox"
                label="Agent is Good"
                checked={isGood}
                onChange={handleCheckboxChange}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleReportSubmission}>
              Submit Report
            </Button>
          </div>
        ) : (
          <div>
            <Form.Group controlId="incident">
              <Form.Label>Incident Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={selectedAgent.incident}
                readOnly
              />
            </Form.Group>
            <p>{`${selectedAgent.name} is a fraud agent`}</p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ReportAgentScreen;
