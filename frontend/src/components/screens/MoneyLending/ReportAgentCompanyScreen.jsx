import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../../Loader";

const ReportAgentCompanyScreen = ({
  selectedCompany,
  companyID,
  companyName,
  companyEmail,
  companyNumber,
  companyAddress,
}) => {
  const [incident, setIncident] = useState("");
  const [isGood, setIsGood] = useState(selectedCompany.isGood);
  const [isLoading, setIsLoading] = useState(false);

  const handleReportSubmission = async () => {
    try {
      setIsLoading(true);
      if (!selectedCompany || !selectedCompany._id) {
        throw new Error("Invalid company selected");
      }

      const response = await axios.put(
        `/api/agents/reportAgentCompany/${selectedCompany._id}`,
        {
          incident: incident || "This company is fraud",
          isGood,
        }
      );

      if (response.status === 200) {
        toast.success("Agent company reported successfully");
        // Reload the page here
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to report agent company");
    } finally {
      setIsLoading(false);
    }
  };

  if (!selectedCompany) {
    return <div>No company selected</div>;
  }

  const handleCheckboxChange = () => {
    if (!selectedCompany.isGood) {
      toast.error(`${selectedCompany.name} is a fraud company`, {
        type: "error",
      });
    } else {
      setIsGood(!isGood);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Report Agent Company</h2>
      <Form>
        <h3>Company Details</h3>
        <Form.Group controlId="companyId">
          <Form.Label>Company ID</Form.Label>
          <Form.Control type="text" value={companyID} readOnly />
        </Form.Group>

        <Form.Group controlId="companyName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={companyName} readOnly />
        </Form.Group>

        <Form.Group controlId="companyEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" value={companyEmail} readOnly />
        </Form.Group>

        <Form.Group controlId="companyNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control type="text" value={companyNumber} readOnly />
        </Form.Group>

        <Form.Group controlId="companyAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={companyAddress} readOnly />
        </Form.Group>

        {selectedCompany.isGood ? (
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
                label="Company is Good"
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
                value={selectedCompany.incident}
                readOnly
              />
            </Form.Group>
            <p>{`${selectedCompany.name} is a fraud company`}</p>
          </div>
        )}
      </Form>
    </div>
  );
};

export default ReportAgentCompanyScreen;
