import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Form, FormGroup } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

const RegisterModal = (props) => {
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("name", formRegister.name);
      formData.set("email", formRegister.email);
      formData.set("password", formRegister.password);
      formData.set("phone", formRegister.phone);
      const response = await API.post("/register", formData);
      console.log(response.data.data);

      // console.log("register succeess", response);

      setFormRegister({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
      props.onHide();

      Swal.fire({
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
      });
      console.log(error);
    }
  });
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
    console.log(formRegister);
  };

  // onHide={handleClose}
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <div style={{ backgroundColor: "#0D0D0D" }}>
        <Modal.Header closeButton>
          <Modal.Title className="font-1 fs-2" style={{ color: "#CD2E71" }}>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>FullName</Form.Label>
              <Form.Control type="text" onChange={handleChange} name="name" required placeholder="Jhon Doe" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>Email</Form.Label>
              <Form.Control type="email" onChange={handleChange} name="email" required placeholder="name@example.com" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>Password</Form.Label>
              <Form.Control type="password" name="password" onChange={handleChange} required autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>Number Phone</Form.Label>
              <Form.Control type="number" onChange={handleChange} name="phone" placeholder="089777*" required autoFocus />
            </Form.Group>
            <siv className="d-flex justify-content-center">
              <Button type="submit" className="w-50" style={{ backgroundColor: "#CD2E71" }}>
                Register
              </Button>
            </siv>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </div>
    </Modal>
  );
};

export default RegisterModal;
