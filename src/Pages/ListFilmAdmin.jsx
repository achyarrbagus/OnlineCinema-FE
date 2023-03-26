import { Container, Button } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { Modal, Spinner } from "react-bootstrap";

const ListFilmAdmin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useMutation(async (id) => {
    setIsLoading(true);
    try {
      const response = await API.delete(`/film/${id}`);
      console.log(response);
      Swal.fire({
        icon: "success",
        title: "Delete Film Success",
        showConfirmButton: false,
      });
      refetch();
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add Film Failed",
        text: `${error}`,
        showConfirmButton: false,
      });
      navigate("/");
      console.log(error);
      setIsLoading(false);
    }
  });

  let { data: film, refetch } = useQuery("productChace", async () => {
    const response = await API.get("/film");
    return response.data.data;
  });

  return (
    <Container fluid className="" style={{ backgroundColor: "#000000", height: "100vh", overflow: "auto" }}>
      <Container style={{ paddingTop: "130px" }}>
        <table className=" table table-dark table-hover">
          <thead>
            <tr style={{ color: "#E50914" }}>
              <th scope="col">No</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Film</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {film &&
              film.map((item, index) => {
                console.log(item);
                return (
                  <tr style={{ color: "white" }}>
                    <th scope="row">{index + 1}</th>
                    <th>
                      <img src={item.thumbnail} alt="ini gambar" width={"100%"} />
                    </th>
                    <td>{item.title}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button className="btn-success" disabled={isLoading} onClick={() => navigate(`/edit-film/${item.id}`)}>
                          Update
                        </Button>
                        <Button
                          disabled={isLoading}
                          className="btn-danger"
                          onClick={() => {
                            handleDelete.mutate(item.id);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        ;
      </Container>
      <Modal show={isLoading} onHide={isLoading} aria-labelledby="contained-modal-title-vcenter" centered>
        <Button variant="danger" disabled>
          <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
          Loading...
        </Button>
      </Modal>
    </Container>
  );
};

export default ListFilmAdmin;
