import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { Form } from "react-bootstrap";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  //
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
    console.log(inputForm);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("email", inputForm.email);
      formData.set("password", inputForm.password);
      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post("/login", formData);
      // Send data to useContext

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);

      console.log(response);
      if (response.data.data.role === "admin") {
        // window.location.href = "/admin";
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "Login As Admin",
          showConfirmButton: false,
        });
        navigate("/admin");
      } else if (response.data.data.role === "user") {
        // window.location.reload();
        Swal.fire({
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
        });
        navigate("/");
      }
      console.log(state);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Account Not Found!",
        showConfirmButton: false,
      });
      console.log(error);
    }
  });

  return (
    <Modal show={props.show} onHide={props.onHide}>
      <div style={{ backgroundColor: "#0D0D0D" }}>
        <Modal.Header closeButton>
          <Modal.Title className="font-1 fs-2" style={{ color: "#CD2E71" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>Email</Form.Label>
              <Form.Control onChange={handleChange} name="email" type="email" placeholder="name@example.com" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ color: "#CD2E71" }}>Password</Form.Label>
              <Form.Control onChange={handleChange} name="password" type="password" autoFocus />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" className="w-50" style={{ backgroundColor: "#CD2E71" }}>
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center"></Modal.Footer>
      </div>
    </Modal>
  );
};
// onClick={props.onHide}

export default LoginModal;
