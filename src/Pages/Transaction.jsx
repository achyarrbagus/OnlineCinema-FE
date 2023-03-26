import React from "react";
import { Container } from "react-bootstrap";
import AdminNav from "../Components/adminNav";
import { API } from "../config/api";
import { useQuery } from "react-query";

const Transaction = () => {
  let { data: TransactionData } = useQuery("transactionCache", async () => {
    try {
      const response = await API.get("/transactions");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  });

  console.log(TransactionData);

  return (
    <Container fluid className="" style={{ backgroundColor: "#000000", height: "100vh", overflow: "auto" }}>
      <Container style={{ paddingTop: "130px" }}>
        <table className=" table table-dark table-hover">
          <thead>
            <tr style={{ color: "#E50914" }}>
              <th scope="col">No</th>
              <th scope="col">Users</th>
              <th scope="col">Film</th>
              <th scope="col">Order Id</th>
              <th scope="col">Status Payment</th>
            </tr>
          </thead>
          <tbody>
            {TransactionData &&
              TransactionData.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <th>{item.user.fullname}</th>
                    <td>{item.film.title}</td>
                    <td>{item.id}</td>
                    {item.status === "success" ? (
                      <td style={{ color: "#0ACF83" }}>Approved</td>
                    ) : item.status === "pending" ? (
                      <td style={{ color: "#F7941E" }}>Waiting</td>
                    ) : (
                      <td style={{ color: "#F7941E" }}>Failed</td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
        ;
      </Container>
    </Container>
  );
};

export default Transaction;
