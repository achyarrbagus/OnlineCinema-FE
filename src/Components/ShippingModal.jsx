import React, { useState } from "react";
import { ContextGlobal } from "../context/Context";
import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Modal, Button, Form } from "react-bootstrap";
import { json, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "./../config/api";
import { useMutation } from "react-query";

const ShippingModal = (props) => {
  // console.log(props);
  const { kumpulanState } = useContext(ContextGlobal);
  const date = new Date();
  const navigate = useNavigate();
  const { showModal, setShowModal, setStateQuantity, showAlertTransaction, setShowAlertTransaction } = kumpulanState;
  const chartData = JSON.parse(localStorage.getItem("CHARTDATA"));
  const [price, setPrice] = useState(props.price);

  let result = [];

  for (let i = 0; i < chartData.length; i++) {
    let newObject = {
      id: chartData[i].id,
      orderQuantity: chartData[i].quantity,
    };
    result.push(newObject);
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: date.getTime(),
    products: result,
    price: props.price,
  });
  // const convertJson = JSON.stringify(formData);

  //   const handleSubmit = useMutation(async (e) => {
  //     try {
  //       e.preventDefault();
  //       const response = await API.post("/createtransaction", {
  //         status: "pending",
  //         order_date: today,
  //         film_id: film?.id,
  //         price: film.price,
  //         title: film.title,
  //       });
  //       const tokenBaru = response.data.data.token;

  //       console.log("habis add : ", response.data);
  //       console.log("habis add transaction tokennnnnn : ", response.data.data.token);

  //       console.log("ini tokennnnn", response);
  //       console.log("ini tokennnnnbaru", tokenBaru);

  //       window.snap.pay(tokenBaru, {
  //         onSuccess: function (result) {
  //           console.log(result);
  //           navigate("/profile");
  //         },
  //         onPending: function (result) {
  //           console.log(result);
  //           navigate("/profile");
  //         },
  //         onError: function (result) {
  //           console.log(result);
  //         },
  //         onClose: function () {
  //           alert("you closed the popup without finishing the payment");
  //         },
  //       });
  //     } catch (error) {
  //       console.log(error);
  //       alert("transaction failed");
  //     }
  //   });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    console.log(formData);
  };
  return (
    <Container>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="fs-2 fw-bolder">Payment Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
          // onSubmit={(e) => {
          //   handleSubmit.mutate(e);
          // }}
          >
            <Form.Group controlId="formBasicName" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nama"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Alamat Email"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Number"
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage" className="p-1">
              <Form.Label></Form.Label>
              <Form.Control
                style={{ backgroundColor: "#613D2B40", border: "solid 2px #613D2B" }}
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Shipping Address"
                required
              />
            </Form.Group>

            <Button type="submit" style={{ backgroundColor: "#613D2B" }} className="w-100 mt-2">
              Pay
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};
export default ShippingModal;
