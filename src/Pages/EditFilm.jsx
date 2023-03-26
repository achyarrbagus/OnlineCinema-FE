import { Form, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminNav from "../Components/adminNav";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { Modal, Button, Spinner } from "react-bootstrap";

const EditFilm = () => {
  //

  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    category: "",
    price: "",
    film_url: "",
    trailer: "",
    description: "",
    hero: "",
  });

  async function getDataUpdate() {
    const responseProduct = await API.get("/film/" + id);
    setPreview(responseProduct.data.data.photo);

    setForm({
      ...form,
      title: responseProduct.data.data.title,
      description: responseProduct.data.data.description,
      thumbnail: responseProduct.data.data.thumbnail,
      category: responseProduct.data.data.category,
      trailer: responseProduct.data.data.trailer,
      film_url: responseProduct.data.data.film_url,
      price: responseProduct.data.data.price,
      hero: responseProduct.data.data.hero,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    getDataUpdate();
  }, []);

  const handleChange = (e) => {
    const { name, type, value } = e.target;
    setForm({ ...form, [name]: type === "file" ? e.target.files : e.target.value });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log("ini data blob", url);
      setPreview(url);
    }
    console.log(form);
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handlerSubmit = useMutation(async (e) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      // configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      //
      console.log("ini data productmu", form);
      const formData = new FormData();
      formData.set("name", form.title);
      formData.set("category", form.category);
      formData.set("price", form.price);
      formData.set("desc", form.description);
      formData.set("url", form.film_url[0]);
      formData.set("photo", form.thumbnail[0]);
      formData.set("trailer", form.trailer[0]);
      formData.set("hero", form.hero[0]);

      const response = await API.patch("/film/" + id, formData, config);
      console.log("berhasil menambahkan product", response);
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Update Film Success",
          text: "Your Progress Has Been Saved",
          showConfirmButton: false,
        });
        navigate("/");
        setIsLoading(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Add Film Failed",
        text: `${error}`,
        showConfirmButton: false,
      });
      console.log(error);
      setIsLoading(false);
    }
  });

  return (
    <>
      <Container fluid className="d-flex justify-content-center" style={{ backgroundColor: "#000000", overflow: "auto" }}>
        <Container className="px-5" style={{ paddingTop: "120px", height: "100vh", backgroundColor: "" }}>
          <Row height={"80%"} className="p-1 justify-content-center">
            <Col md={12} className="">
              <Form onSubmit={(e) => handlerSubmit.mutate(e)}>
                <h1 className="fs-3" style={{ color: "#FFFFFF" }}>
                  Update Film
                </h1>
                <Form.Group className="my-3">
                  <Row className="">
                    <Col md={8}>
                      <Form.Label className="text-light">Title Movie</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        className="bg-dark"
                        onChange={handleChange}
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        style={{
                          backgroundColor: "rgba(210, 210, 210, 0.25)",
                          border: "solid 2px #D2D2D2",
                          color: "white",
                        }}
                      />
                    </Col>

                    <Col>
                      <Form.Group controlId="formFile">
                        <Form.Label className="text-light">Thumbnail Image</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          className="bg-dark"
                          style={{
                            backgroundColor: "rgba(210, 210, 210, 0.25)",
                            border: "solid 2px #D2D2D2",
                            color: "white",
                          }}
                          name="thumbnail"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Label className="text-light">Cathegory</Form.Label>
                  <select
                    className="text-light bg-dark border border-white rounded-lg w-100 "
                    style={{ backgroundColor: "rgba(210, 210, 210, 0.25)", border: "solid 2px #D2D2D2", height: "50px" }}
                    name="category"
                    id="category"
                    required
                    value={form?.category}
                    placeholder="category"
                    onChange={handleChange}
                    type="text"
                  >
                    <option>Category</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Horror">Horror</option>
                  </select>
                </Form.Group>
                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Label className="text-light">Price Movie</Form.Label>
                  <Form.Control
                    className="bg-dark"
                    type="number"
                    required
                    value={form.price}
                    style={{
                      backgroundColor: "rgba(210, 210, 210, 0.25)",
                      border: "solid 2px #D2D2D2",
                      height: "50px",
                      color: "white",
                    }}
                    onChange={handleChange}
                    name="price"
                    placeholder="Price"
                  />
                </Form.Group>
                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Label className="text-light">Hero Image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={handleChange}
                    className="bg-dark"
                    name="hero"
                    placeholder="hero"
                    style={{
                      backgroundColor: "rgba(210, 210, 210, 0.25)",
                      border: "solid 2px #D2D2D2",
                      color: "white",
                    }}
                  />
                </Form.Group>
                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Label className="text-light">Movie</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={handleChange}
                    className="bg-dark"
                    name="film_url"
                    placeholder="Link Film"
                    style={{
                      backgroundColor: "rgba(210, 210, 210, 0.25)",
                      border: "solid 2px #D2D2D2",
                      color: "white",
                    }}
                  />
                </Form.Group>
                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Label className="text-light">Trailer Video</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    onChange={handleChange}
                    className="bg-dark"
                    name="trailer"
                    style={{
                      backgroundColor: "rgba(210, 210, 210, 0.25)",
                      border: "solid 2px #D2D2D2",
                      color: "white",
                    }}
                  />
                </Form.Group>
                <Form.Group className="my-3" controlId="formBasicFullName">
                  <Form.Control
                    as="textarea"
                    rows={10}
                    required
                    onChange={handleChange}
                    className="bg-dark"
                    value={form.description}
                    name="description"
                    placeholder="Description Film"
                    style={{
                      backgroundColor: "rgba(210, 210, 210, 0.25)",
                      border: "solid 2px ##D2D2D2",
                      color: "white",
                    }}
                  />
                </Form.Group>

                <Container className=" d-flex justify-content-end mt-3">
                  <button
                    disabled={isLoading}
                    className="d-flex justify-content-center align-items-center"
                    style={{ border: "none", width: "200px", height: "40px", backgroundColor: "#CD2E71", color: "white" }}
                  >
                    Add Film
                  </button>
                </Container>
              </Form>
            </Col>
          </Row>
        </Container>
        <Modal show={isLoading} aria-labelledby="contained-modal-title-vcenter" centered>
          <Button variant="danger" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
            Loading...
          </Button>
        </Modal>
      </Container>
    </>
  );
};

export default EditFilm;
