import React, { useRef, useState } from "react";
import "./Add.css";
import Button from "../../Elements/Button/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setPopAddTuto, setPopEditTuto } from "../../../Redux/popupReducer";
import { setRender } from "../../../Redux/renderReducer";

function Edit({ data }) { 
  const active= useSelector(state=>state.pop.popEditTuto);
  const dispatch=useDispatch();

  const refName= useRef(null);
  const refTitle= useRef(null); 
  const refUrl=useRef(null);
  const refText=useRef(null);

  function Submit(e){
    e.preventDefault()

    var model={
      name:refName.current?.value!=""?refName.current?.value:null,
      title:refTitle.current?.value!=""?refTitle.current?.value:null,
      text:refText.current?.value!=""?refText.current?.value:null,
      url:refUrl.current.value!=""?refUrl.current?.value:null
    }

      fetch(`https://localhost:7156/tutorial/EditTutorial/${data.id}`, {
        method: "Put",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Origin": "*",
        },
        body:JSON.stringify(model)
      })
        .then((res) =>res.json())
        .then((json) => {
          console.log(json);
          dispatch(setPopEditTuto(false))
          dispatch(setRender(Math.random()))
        })
        .catch((err) => console.log(err));


  }



  function onClickInner(e){
    e.stopPropagation();
  }


  return active ? (
    <div className="addpop" onClick={()=>dispatch(setPopEditTuto(false))}>
      <form action="" id="add" onSubmit={(e)=>Submit(e)}>
        <div onClick={(e)=>onClickInner(e)}  className="add-container">
          <div className="colorful-title" style={{ padding: "0" }}>
            Edit Tutorial
          </div>

          <div className="add-inner">
            <div className="half-form-group">
              <div className="half-form-group">
                <label htmlFor="">Tutorial Name(Icon)</label>
                <input defaultValue={data.name} ref={refName} type="text" className="custom-input" />
              </div>
              <div className="half-form-group">
                <label htmlFor="">Tutorial Title</label>
                <input defaultValue={data.title} ref={refTitle} type="text" className="custom-input" />
              </div>
              <div className="half-form-group">
                <label htmlFor="">Url</label>
                <input defaultValue={data.url}  ref={refUrl} type="text" className="custom-input" />
              </div>
            </div>
            <div className="half-form-group">
              <label htmlFor="">About</label>
              <textarea
              defaultValue={data.text}
                ref={refText}
                type="text"
                className="custom-input"
                rows={10}
                cols={30}
              ></textarea>
            </div>
          </div>

          <Button
            form="add"
            outsideDiv={true}
            margin={"1.5rem 0"}
            flexEnd={true}
            text={"Edit"}
            width={"150px"}
          />
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}

export default Edit;
