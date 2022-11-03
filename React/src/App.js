import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import TutorialsView from "./components/Admin/TutorialsView/TutorialsView";
import Banner from "./components/Banner/Banner";
import Fetch from "./components/Fetch";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar/Sidebar";
import Forgot from "./components/Sign/Forgot/Forgot";
import SignIn from "./components/Sign/SignIn/SignIn";
import SignUp from "./components/Sign/SignUp/SignUp";
import Tutorials from "./components/Tutorials/Tutorials";
import { setData, addData } from "./Redux/dataReduce";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cards = useSelector((state) => state.data.data);
  const refresh = useSelector((state) => state.render.render);

  const [statusCode, setStatusCode] = useState(null);
  const dispatch = useDispatch();

  const [tutorials, setTutorials] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("first");
    Fetch("https://localhost:7156/tutorial/GetTutorials","Get",null)
                .then((res) => setTutorials(res));
  }, [refresh]);

  return (
    <div className="App">
      <Nav data={tutorials} />

      <Routes>
        <Route element={<ProtectedRoute allowedRole={["User","Admin"]} />}>
          <Route path="/" element={<Home cards={tutorials} />} />
          <Route
            path="/tutorials"
            element={
              <Tutorials data={tutorials != null ? tutorials[0] : null} />
            }
          />
          {tutorials?.map((x, i) => {
            return (
              <Route
                key={i}
                path={`/tutorials/${x.url}`}
                element={<Tutorials data={x} />}
              />
            );
          })}
        </Route>

        <Route element={<ProtectedRoute allowedRole={["Admin"]} />}>
          <Route path="/tutorialsview" element={<TutorialsView />} />
          
        </Route>

        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-forgot" element={<Forgot />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
