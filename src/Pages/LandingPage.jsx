import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import IsLoginNav from "../Components/IsloginNav";
import Content from "./../Components/Content";

const LandingPage = () => {
  return (
    <Container fluid style={{ backgroundColor: "#0D0D0D", height: "100vh", overflow: "auto" }}>
      <Content />
    </Container>
  );
};

export default LandingPage;
