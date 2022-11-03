import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStatusCode, setUser } from "../Redux/authReducer";

function Fetch(url, method, data = {}) {
  if (method.toLowerCase() == "get") {
    return fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        if(res.status==401){
          return res;
        }
        return res.json();
      })
      .then((json) => json)
      .catch((err) => console.log(err));
  } else {
    return fetch(url, {
      method: method,
      mode: "cors",
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("Authorization"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if(res.status==401){
          return res;
        }
        return res.json();
      })
      .then((json) => json)
      .catch((err) => console.log(err));
  }
}
export default Fetch;
