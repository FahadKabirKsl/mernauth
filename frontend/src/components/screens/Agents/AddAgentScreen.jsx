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
  const [nid, setNid] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [addAgent, { isLoading }] = useAddAgentMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/agents/add-agent", {
        name,
        email,
        nid,
        number,
        address,
      });
      if (response.status === 201) {
        toast.success("Agent added successfully");
        setName("");
        setEmail(""), setNid("");
        setNumber("");
        setAddress("");
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
        {isLoading ? (
          <Loader />
        ) : (
          <Form onSubmit={submitHandler}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridnid">
                <Form.Label>NID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="nid number"
                  required
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridnumber">
                <Form.Label>number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="number"
                  required
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder="1234 Main St"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        )}
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
