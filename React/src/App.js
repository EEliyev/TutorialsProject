import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import TutorialsView from "./components/Admin/TutorialsView/TutorialsView";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
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
  const refresh= useSelector(state=>state.render.render);
  const dispatch = useDispatch();

  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7156/tutorial/GetTutorials", {
      method: "Get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch(setData(json))
        setTutorials(json);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <div className="App">
      <Nav data={tutorials} />
      <Routes>
        <Route path="/" element={<Home cards={tutorials} />} />
        <Route path="/tutorialsview" element={<TutorialsView />} />
        <Route path="/tutorials" element={<Tutorials data={tutorials[0]!=null?tutorials[0]:[]} />} />
        {tutorials.map((x, i) => {
          console.log(x)
          return (
            <Route
              key={i}
              path={`/tutorials/${x.url}`}
              element={<Tutorials data={x} />}
            />
          );
        })}
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-forgot" element={<Forgot />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
