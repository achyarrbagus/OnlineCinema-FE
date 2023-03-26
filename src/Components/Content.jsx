import React from "react";
import { Container, Col, Row, Carousel, Button, Card, Modal } from "react-bootstrap";
import HeroImg from "../Assets/jumbotron.png";
import { useContext } from "react";
import { useQuery, useMutation } from "react-query";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "../config/api";
import { Link } from "react-router-dom";
import { json, useNavigate } from "react-router";
import LoginModal from "./LoginModal";
import moment from "moment";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const Content = () => {
  const [dataFilm, setDataFilm] = useState([]);
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const [fon, setfon] = useState(JSON.parse(localStorage.getItem("FOUND")) || null);
  const today = moment().format(" D MMMM YYYY");
  const [state, dispacth] = useContext(UserContext);

  // const route = getToken == null ? "film" : "userfilm";
  useEffect(() => {
    //
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  let { data: film, isFetched: isFetchedFilm } = useQuery("productsChace", async () => {
    try {
      const response = await API.get("/film");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  let { data: transaction, isFetched } = useQuery("transactionCache", async () => {
    try {
      const response = await API.get("/transaction-user");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  const latestData = film?.slice(-1)[0];
  console.log(latestData);

  useEffect(() => {
    if (transaction && film) {
      const found = transaction.find((item) => item.film.id === latestData.id);
      console.log(found);
      if (found) {
        localStorage.setItem("FOUND", JSON.stringify(found));
        setfon(found);
        console.log(found);
      }
    }
  }, [isFetched, isFetchedFilm]);

  useEffect(() => {
    setDataFilm(film);
  }, [dataFilm]);

  const [show, setShow] = useState(false);
  const [loginShow, setLoginShow] = useState(false);

  function handleBuy() {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const found = localStorage.getItem("FOUND");
      console.log(found);
      if (found) {
        if (found.status === "success")
          return Swal.fire({
            icon: "eror",
            title: "You Have This Purchased",
            showConfirmButton: false,
          });
      } else {
        setShow(true);
      }
    } else {
      setLoginShow(true);
    }
  }
  const found = JSON.parse(localStorage.getItem("FOUND") ?? null);

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/createtransaction", {
        status: "pending",
        order_date: today,
        film_id: latestData?.id,
        price: latestData?.price,
        title: latestData?.title,
      });
      const token = response.data.data.token;

      console.log("habis add : ", response.data);
      console.log("habis add transaction tokennnnnn : ", response.data.data.token);

      console.log("ini tokennnnn", response);
      console.log("ini tokennnnnbaru", token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          alert("transaction success");
          localStorage.setItem("DATA", JSON.stringify(film));
          localStorage.setItem("IsSuccess", true);
          navigate("/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/");
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          Swal.fire({
            icon: "error",
            title: "you closed the popup without finishing the payment",
            showConfirmButton: false,
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <Container style={{ paddingTop: "100px" }}>
      <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
      <Row className="" style={{ height: "40vh" }}>
        <Link style={{ textDecoration: "none" }} to={`DetailFilm/${latestData?.id}`}>
          <Col
            className="p-0"
            style={{
              backgroundImage: `url(${latestData?.hero})`,
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "auto",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="text-light p-5"
              // onClick={() => {
              //   navigate(`DetailFilm/${latestData.id}`);
              // }}
            >
              {latestData && (
                <div className="font-1" style={{ color: "#A52620 ", fontSize: "48px" }}>
                  <p>
                    {latestData?.title
                      .split(" ")
                      .map((item, index) => index < Math.ceil(latestData?.title.split(" ").length / 2) && item + " ")}
                  </p>
                  {latestData.title.split(" ").length > 1 && (
                    <p style={{ marginTop: "-40px", color: "#FFFFFF" }}>
                      {latestData?.title
                        .split(" ")
                        .map((item, index) => index >= Math.ceil(latestData?.title.split(" ").length / 2) && item + " ")}
                    </p>
                  )}
                </div>
              )}
              <div className="font-bold text-[1.2rem]">
                <p className="fs-5 font-1">Action</p>
                <p className="fs-5 font-1" style={{ color: "#CD2E71" }}>
                  {formatter.format(latestData?.price)}
                </p>
              </div>
              <article className="w-[50rem] text-white leading-[2rem]">{latestData?.description}</article>
              <div className="mt-3">
                {getToken === null || state.user.role === "admin" || fon?.status === "success" ? (
                  <div></div>
                ) : (
                  <Button onClick={handleBuy} style={{ backgroundColor: "#CD2E71", border: "none", fontSize: "20px" }}>
                    Buy Now
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Link>
      </Row>
      <Row style={{ height: "30vh", paddingTop: "100px" }}>
        <Col className="">
          <h1 className="font-1 text-light fs-3 mb-3">List Film</h1>
          <Row className="my-3">
            {film?.map((item) => {
              return (
                <Col className="mt-3 hero" md={3}>
                  <Card style={{ width: "20rem", height: "100%" }}>
                    <Link to={`DetailFilm/${item.id}`}>
                      <Card.Img variant="top" fluid src={item?.thumbnail} alt="ini gambar" />
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={() => setShow(false)}>
        <Modal.Header style={{ backgroundColor: "#0D0D0D", color: "white" }} closeButton>
          <Modal.Title style={{ fontSize: "20px" }} className="font-1">
            Confirmed <span style={{ color: "#CD2E71" }}>Payment</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#0D0D0D", color: "white" }}>
          <div>
            <div className="font-1" style={{ fontSize: "20px" }}></div>
            <div style={{ fontSize: "17px" }}>
              Total: <span style={{ color: "#CD2E71" }}></span>{" "}
            </div>
            <div style={{ height: "20px" }} className="font-1">
              {" "}
              Are You Sure Buy This Movie ?
            </div>
          </div>
        </Modal.Body>
        <div style={{ backgroundColor: "#0D0D0D" }} className="d-flex justify-content-around h-25 pt-3  w-100">
          <Button
            className="w-100"
            onClick={() => handleTransaction.mutate()}
            style={{ backgroundColor: "#CD2E71", border: "none" }}
          >
            Pay
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default Content;
