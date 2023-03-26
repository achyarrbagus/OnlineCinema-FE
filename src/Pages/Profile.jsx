import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Transaction from "./Transaction";
import profil from "../Assets/profile.png";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import AlertModalTransaction from "./../Components/AlertModalTransaction";

const Profile = () => {
  const [state, dispatch] = useContext(UserContext);
  console.log(state);

  let { data: transaction } = useQuery("transactionCache", async () => {
    try {
      const response = await API.get("/transaction-user");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  const [showAlertTransaction, setShowAlertTransaction] = useState(false);

  useEffect(() => {
    setShowAlertTransaction(JSON.parse(localStorage.getItem("isSuccess")));
  }, []);
  //   console.log(transaction?.film);

  return (
    <Container fluid style={{ paddingTop: "130px", backgroundColor: "#000000", height: "100vh", overflow: "auto" }}>
      <AlertModalTransaction
        status={showAlertTransaction}
        handleClose={() => {
          setShowAlertTransaction(false);
          localStorage.removeItem("isSuccess");
        }}
      />
      {state?.user && (
        <Container style={{ color: "white" }}>
          <Row className="gap-4 justify-content-evenly">
            <Col className="" md={4}>
              <div>
                <h1>My Profile</h1>
              </div>
              <Row className="d-flex h-100 mt-3">
                <Col md={6}>
                  <div>
                    <img src={profil} className="img-fluid" width={"100%"} />
                  </div>
                </Col>
                <Col md={6} className="">
                  <div>
                    <div className="">
                      <h5 style={{ color: "#CD2E71" }}>Full Name</h5>
                      <h5 style={{ color: "#616161" }}>{state?.user.fullname}</h5>
                    </div>
                    <div className="my-3">
                      <h5 style={{ color: "#CD2E71" }}>Email</h5>
                      <h5 style={{ color: "#616161" }}>{state?.user.email}</h5>
                    </div>
                    <div className="my-3">
                      <h5 style={{ color: "#CD2E71" }}>Phone</h5>
                      <h5 style={{ color: "#616161" }}>{state?.user.phone}</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="" md={4}>
              <div>
                <h1>My Transaction</h1>
              </div>
              {transaction?.map((item) => {
                //   return <div>{JSON.stringify(item)}</div>;
                return (
                  <Row>
                    <Col className="flex-wrap mt-1 p-3" style={{ height: "100%", backgroundColor: "rgba(205, 46, 113, 0.44)" }}>
                      <h5 className="font-1">{item?.film?.title}</h5>
                      <h5 className="font-1" style={{ fontSize: "15px" }}>
                        {item?.order_date}
                      </h5>
                      <h5 className="mt-4" style={{ fontSize: "15px", color: "rgba(205, 46, 113, 1)" }}>
                        Total: {item?.price}
                      </h5>
                      <div className="d-flex mt-1 justify-content-end  align-items-center">
                        {item.status === "success" ? (
                          <h5
                            className="d-flex justify-content-center align-items-center m-0"
                            style={{
                              height: "30px",
                              width: "112px",
                              fontSize: "15px",
                              backgroundColor: "rgba(0, 255, 71, 0.1)",
                              color: "#00FF47",
                            }}
                          >
                            Finished
                          </h5>
                        ) : item.status === "pending" ? (
                          <h5
                            className="d-flex justify-content-center align-items-center m-0"
                            style={{
                              height: "30px",
                              width: "112px",
                              fontSize: "15px",
                              backgroundColor: "rgba(212, 230, 18, 0.1)",
                              color: "#yellow",
                            }}
                          >
                            Waiting
                          </h5>
                        ) : (
                          <h5
                            className="d-flex justify-content-center align-items-center m-0"
                            style={{
                              height: "30px",
                              fontSize: "15px",
                              width: "112px",
                              backgroundColor: "rgba(181, 5, 11, 0.1)",
                              color: "#db2329",
                            }}
                          >
                            Failed
                          </h5>
                        )}
                      </div>
                    </Col>
                  </Row>
                );
              })}
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Profile;
