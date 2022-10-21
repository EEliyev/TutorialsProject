import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Elements/Button/Button";
import "./SignIn.css";

function SignIn() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [spanEmail, setSpanEmail] = useState(null);
  const [spanPass, setSpanPass] = useState(null);

  function isValidEmail(item) {
    return /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(item);
  }

  function isValidPassword(item) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
      item
    );
  }
  console.log(data);
  function HandleChange(e) {
    if (e.target.id == "Email") {
      if (!isValidEmail(e.target.value) && e.target.value != "") {
        setSpanEmail("Not valid email.");
        setData((x) => ({ ...x, email: "" }));
      } else {
        setData((x) => ({ ...x, email: e.target.value }));
        setSpanEmail(null);
      }
    }
    if (e.target.id == "Password") {
      if (!isValidPassword(e.target.value) && e.target.value != "") {
        setSpanPass(
          "Password must cointain at least one number, one upper letter and one character"
        );
        setData((x) => ({ ...x, password: "" }));
      } else {
        setData((x) => ({ ...x, password: e.target.value }));
        setSpanPass(null);
      }
    }
  }
  return (
    <div className="sign-container">
      <div className="sign-inner">
        <div className="colorful-title">Sign In</div>
        <div className="sign-inputs">
          <input
            onChange={(e) => HandleChange(e)}
            id="Email"
            className="custom-input"
            placeholder="Email address"
            style={{ padding: "0.8rem" }}
            type="text"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanEmail ? spanEmail : null}
          </span>
          <input
            onChange={(e) => HandleChange(e)}
            id="Password"
            className="custom-input"
            placeholder="Password"
            style={{ padding: "0.8rem" }}
            type="password"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanPass ? spanPass : null}
          </span>
          <Link to={"/sign-forgot"}>Forgot password?</Link>
        </div>
        <div className="sign-inputs-footer">
          <Link to={"/sign-up"}>Create account</Link>
          <Button width={"100px"} text={"Log in"} />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
