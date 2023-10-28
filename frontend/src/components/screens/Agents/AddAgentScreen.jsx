import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { toast } from "react-toastify";
import Loader from "../../Loader";
import axios from "axios";
import { useAddAgentMutation } from "../../../slices/agentCompanyApiSlice";

const AddAgentScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState(0);
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [agentAvatar, setAgentAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("nid", nid);
    formData.append("number", number);
    formData.append("address", address);
    if (agentAvatar) {
      formData.append("agentAvatar", agentAvatar, agentAvatar.name);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "/api/agents/add-agent",
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("Agent added successfully");
        // Reset the form fields after successful addition
        setName("");
        setEmail("");
        setNid("");
        setNumber("");
        setAddress("");
        setAgentAvatar(null);
      } else {
        const errorMessage = response.data.message;
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <>
        <h1>Add agent</h1>
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="nid">
                <Form.Label>NID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter NID"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="agentAvatar">
                <Form.Label>Avatar (Image)</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setAgentAvatar(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="my-3">
            {loading ? <Loader /> : "Submit"}
          </Button>
        </Form>
      </>
    </>
  );
};

export default AddAgentScreen;

{
  /* <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Row> */
}

{
  /* <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group> */
}
