import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../Elements/Button/Button";
import Fetch from "../../Fetch";
import "./SignUp.css";

function SignUp() {

  
  const [spanEmail, setSpanEmail] = useState(null);
  const [spanPass, setSpanPass] = useState(null);
  const [spanRePass, setRePass] = useState(null);
  const [spanUserName,setSpanUserName]=useState(null);

  const location= useLocation();
  const from=location.state?.from?.pathname || "/";
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [userName,setUserName]=useState(null);

  const refUserName=useRef(null);
  const refFirstName= useRef(null);
  const refLastName=useRef(null);
  const refEmail=useRef(null);
  const refPassword= useRef(null);

  
  function Submit(e){
    e.preventDefault()

    var data={
      username:refUserName.current.value!=""?refUserName.current.value:null,
      firstname:refFirstName.current.value!=""?refFirstName.current.value:null,
      lastname:refLastName.current.value!=""?refLastName.current.value:null,
      email:refEmail.current.value!=""?refEmail.current.value:null,
      password:refPassword.current.value!=""?refPassword.current.value:null
    }
    console.log(data)

    if(spanRePass==null&&spanEmail==null&&spanPass==null&&spanUserName==null){
      Fetch("https://localhost:7156/api/identity/register","Post",data,dispatch).then(x=>{
        console.log(x);
        if(x.success){
          
          navigate("/sign-in")
        }else{
          setRePass(x.errors[0])
        }
      });
    }
  
   
  }
  useEffect(() => {
    Fetch(`https://localhost:7156/api/identity/checkusernameexist?name=${userName}`,"Get",null,dispatch).then(x=>{
      if(x.success){
        setSpanUserName("This username already is used")
      }
      else{
        setSpanUserName(null)
      }
    });
  }, [userName])
  

  function isValidEmail(item) {
    return /^[a-zA-Z0-9.!]+@+[a-zA-Z0-9]+.+[A-z]/.test(item);
  }

  function isValidPassword(item) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
      item
    );
  }
function OnUserNameChange(e){

if(e.target.value!="")
{
  setUserName(e.target.value)
}else{
  setUserName(null)
}

}
  function HandleChange(e) {

    if (e.target.id == "Email") {
      if (!isValidEmail(e.target.value) && e.target.value != "") {
        setSpanEmail("Not valid email.");
      } else {
        setSpanEmail(null);
      }
    }

    if (e.target.id == "Password") {
      if (!isValidPassword(e.target.value) && e.target.value != "") {
        setSpanPass(
          "Password must cointain at least one number, one upper letter and one character"
        );
      } else {
        setSpanPass(null);
      }
    }
    if (e.target.id == "RePassword") {
      if (refPassword.current.value != e.target.value && e.target.value != "") {
        setRePass("Password does not match");
      } else {
        setRePass(null);
      }
    }
  }
  return (
    <div className="sign-container">
      <div className="sign-inner">
        <form action="">
        <div className="colorful-title">Sign Up</div>
        <div className="sign-inputs">
        <input
        ref={refUserName}
            onChange={(e) => OnUserNameChange(e)}
            id="Username"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Username"
            type="text"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanUserName ? spanUserName : null}
          </span>
          <input
          ref={refFirstName}
            id="Name"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Name"
            type="text"
          />
          <input
          ref={refLastName}
            id="Surname"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Surname"
            type="text"
          />

          <input
          ref={refEmail}
            onChange={(e) => HandleChange(e)}
            id="Email"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Email address"
            type="text"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanEmail ? spanEmail : null}
          </span>

          <input
          ref={refPassword}
            onChange={(e) => HandleChange(e)}
            id="Password"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Password"
            type="password"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanPass ? spanPass : null}
          </span>

          <input
            onChange={(e) => HandleChange(e)}
            id="RePassword"
            className="custom-input"
            style={{ padding: "0.8rem" }}
            placeholder="Repeat password"
            type="password"
          />
          <span style={{ color: "red", fontSize: "0.8rem" }}>
            {spanRePass ? spanRePass : null}
          </span>

          <Link to={"/sign-forgot"}>Forgot password?</Link>
        </div>
        <div className="sign-inputs-footer">
          <Link to={"/sign-in"}>Log In</Link>
          <Button type="submit" onClick={(e)=>Submit(e)} width={"100px"} text={"Register"} />
        </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(SignUp);
