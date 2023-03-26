import "./App.css";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";
import AddFilm from "./Pages/AddFilm";
import Transaction from "./Pages/Transaction";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./Pages/LandingPage";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SharedLayout from "./Components/SharedLayout";
import PrivateRoute from "./Components/PrivatesRoutes";
import DetailFilm from "./Pages/DetailFilm";
import Profile from "./Pages/Profile";
import ListFilm from "./Pages/ListFilm";
import ListFilmAdmin from "./Pages/ListFilmAdmin";
import EditFilm from "./Pages/EditFilm";

function App() {
  const client = new QueryClient();
  const navigate = useNavigate();
  //
  const [state, dispacth] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  //
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // console.log("check user success", response);
      //get userData
      let payload = response.data.data;
      //get token from localStorage
      payload.token = localStorage.token;
      // send data to useContext
      dispacth({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      // console.log("check user failed : ", error);
      dispacth({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      // console.log(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        console.log("state", state);
        // navigate("/");
      }
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/addfilm" element={<AddFilm />} />
              <Route path="/admin" element={<Transaction />} />
              <Route path="/listfilm" element={<ListFilmAdmin />} />
              <Route path="/edit-film/:id" element={<EditFilm />} />
            </Route>

            <Route index element={<LandingPage />} />
            <Route path="/my-film" element={<ListFilm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/detailfilm/:id" element={<DetailFilm />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
