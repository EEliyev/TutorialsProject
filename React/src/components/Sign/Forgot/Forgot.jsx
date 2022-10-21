import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Elements/Button/Button";
import "./Forgot.css";

function Forgot() {
  const [data, setData] = useState(null);
  const [spanEmail, setSpanEmail] = useState(null);

  function isValidEmail(item) {
    return /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(item);
  }

  function HandleChange(e) {
    if (e.target.id == "Email") {
      if (!isValidEmail(e.target.value) && e.target.value != "") {
        setSpanEmail("Not valid email.");
      } else {
        setData(e.target.value);
        setSpanEmail(null);
      }
    }
  }
  console.log(data);
  return (
    <div className="sign-container">
      <div className="sign-inner">
        <div className="colorful-title">Find your email</div>
        <div className="sign-inputs">
          <input
            onChange={(e) => HandleChange(e)}
            className="custom-input"
            style={{ padding: "0.8rem" }}
            id="Email"
            placeholder="Email address"
            type="text"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanEmail ? spanEmail : null}
          </span>
        </div>
        <div className="sign-inputs-footer">
          <Link to={"/sign-up"}>Create account</Link>
          <Button width={"150px"} text={"Send Link"} />
        </div>
      </div>
    </div>
  );
}

export default Forgot;
