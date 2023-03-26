import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

const ListFilm = () => {
  let { data: userFilm } = useQuery("transactionCache", async () => {
    try {
      const response = await API.get("/transaction-user");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container fluid style={{ paddingTop: "130px", backgroundColor: "#000000", height: "100vh", overflow: "auto" }}>
      <Container>
        <Row className="ms-5">
          <Col>
            <h1 className="font-1" style={{ color: "white" }}>
              My Film List
            </h1>
          </Col>
        </Row>
        <Row className="d-flex  text-light justify-content-start gap-2">
          {userFilm?.length !== 0 &&
            userFilm?.map((item, index) => {
              if (item.status === "success") {
                return (
                  <Col className="mt-3 d-flex justify-content-center" md={2}>
                    <Link to={`/DetailFilm/${item.film?.id}`}>
                      <Card style={{ width: "13rem" }}>
                        <Card.Img variant="top" src={item?.film?.thumbnail} />
                      </Card>
                    </Link>
                  </Col>
                );
              }
            })}
        </Row>
      </Container>
    </Container>
  );
};

export default ListFilm;
