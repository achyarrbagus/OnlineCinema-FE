import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import Iframe from "react-iframe";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import moment from "moment/";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const DetailFilm = () => {
  const today = moment().format(" D MMMM YYYY");
  const navigate = useNavigate();
  const getToken = localStorage.getItem("token");
  const route = getToken == null ? "film" : "userfilm";
  const [state, dispacth] = useContext(UserContext);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  //

  // const formattedNumber = formatter.format()
  const { id } = useParams();
  let { data: film } = useQuery("filmCache", async () => {
    try {
      const response = await API.get(`/${route}/` + id);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });
  const play = () => {
    getToken == null && alert("silakan login dulu");
  };
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

  const [show, setShow] = useState(false);

  const handleTransaction = useMutation(async () => {
    try {
      const response = await API.post("/createtransaction", {
        status: "pending",
        order_date: today,
        film_id: film?.id,
        price: film?.price,
        title: film?.title,
      });
      const token = response.data.data.token;

      console.log("habis add : ", response.data);
      console.log("habis add transaction tokennnnnn : ", response.data.data.token);

      console.log("ini tokennnnn", response);
      console.log("ini tokennnnnbaru", token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          localStorage.setItem("DATA", JSON.stringify(film));
          localStorage.setItem("isSuccess", true);
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
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container fluid style={{ paddingTop: "60px", backgroundColor: "#000000", height: "100vh", overflow: "auto" }}>
      <Container style={{ color: "white", marginTop: "50px" }}>
        {film && (
          <Row className="">
            <Col md={4}>
              <div>
                <img width={"349px"} height={"485px"} src={film?.thumbnail} />
              </div>
            </Col>
            <Col md={7}>
              <div className="d-flex justify-content-between  align-items-center" style={{ height: "80px" }}>
                <div>
                  <h1 className="font-1" style={{ fontSize: "40px", textTransform: "capitalize" }}>
                    {film?.title}
                  </h1>
                </div>

                {getToken === null || film?.price === 0 || state.user.role === "admin" ? (
                  <div></div>
                ) : (
                  <div>
                    <Button
                      onClick={() => setShow(true)}
                      style={{ backgroundColor: "#CD2E71", border: "none", fontSize: "13px", width: "100px", height: "40px" }}
                    >
                      Buy Now
                    </Button>
                  </div>
                )}
              </div>
              {film?.price === 0 || state.user.role === "admin" ? (
                <div>
                  {film?.film_url && (
                    <ReactPlayer
                      url={film?.film_url}
                      playing={true}
                      controls={true}
                      width="100%"
                      height="100%"
                      loop={true}
                      onReady={() => console.log("Video siap dimainkan")}
                      onStart={() => console.log("Video dimulai")}
                    />
                  )}
                </div>
              ) : (
                <div>
                  {film?.trailer && (
                    <ReactPlayer
                      url={film?.trailer}
                      playing={true}
                      controls={true}
                      width="100%"
                      height="100%"
                      loop={true}
                      onReady={() => console.log("Video siap dimainkan")}
                      onStart={() => console.log("Video dimulai")}
                    />
                  )}
                </div>
              )}

              <div style={{ paddingTop: "15px" }}>
                <h2 className="fs-3" style={{ color: "#7E7E7E" }}>
                  {film?.category}
                </h2>
              </div>
              {film?.price == 0 ? (
                <div></div>
              ) : (
                <div>
                  <h2 className="fs-5" style={{ color: "#CD2E71" }}>
                    {formatter.format(film?.price)}
                  </h2>
                </div>
              )}

              <div style={{ height: "336px", width: "836px", textAlign: "justify" }}>
                <p>{film?.description}</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
      <Modal size="sm" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={() => setShow(false)}>
        <Modal.Header style={{ backgroundColor: "#0D0D0D", color: "white" }} closeButton>
          <Modal.Title style={{ fontSize: "20px" }} className="font-1">
            Confirmed <span style={{ color: "#CD2E71" }}>Payment</span>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#0D0D0D", color: "white" }}>
          <div>
            <div className="font-1" style={{ fontSize: "20px" }}>
              {film?.title}
            </div>
            <div style={{ fontSize: "17px" }}>
              Total: <span style={{ color: "#CD2E71" }}>{film?.price.toLocaleString()}</span>{" "}
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
            style={{ backgroundColor: "#CD2E71", border: "none" }}
            onClick={() => handleTransaction.mutate()}
          >
            Pay
          </Button>
        </div>
      </Modal>
    </Container>
  );
};

export default DetailFilm;
