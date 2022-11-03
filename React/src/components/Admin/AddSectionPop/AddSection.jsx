import React, { useRef, useState } from "react";
import "./AddSection.css";
import Button from "../../Elements/Button/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setPopAddSection, setPopAddTuto } from "../../../Redux/popupReducer";
import { addData } from "../../../Redux/dataReduce";
import { setRender } from "../../../Redux/renderReducer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Fetch from "../../Fetch";
import { useLocation, useNavigate } from "react-router-dom";




function AddSection({ selectedTuto }) {
  const active = useSelector((state) => state.pop.popAddSection);
  const dispatch = useDispatch();
  const location=useLocation();
  const navigate=useNavigate(); 

  const [errSpan, setErrSpan] = useState(null);

  const [editor, setEditor] = useState(null);

  const refName = useRef(null);
  const refTitle = useRef(null);

  function Submit(e) {
    e.preventDefault();

    var model = {
      tutorialId: selectedTuto?.id,
      name: refName.current?.value != "" ? refName.current?.value : null,
      title: refTitle.current?.value != "" ? refTitle.current?.value : null,
      body: editor != "" ? editor : null,
    };
   

    Fetch("https://localhost:7156/subject/createSubject","Post",model)
          .then(json=>{
            if(json?.status==401){
              dispatch(setPopAddSection(false))
              navigate("/sign-in",{state:{from:location,replace:true}})
            }else{
              if (json?.errors != null) {
                setErrSpan(json?.errors);
                setEditor(null);
              }
              console.log(json);
              // dispatch(setPopAddSection(false))
              dispatch(setRender(Math.random()));
              setEditor(null);
            }
           
          })
   
  }
  function onChangeEditor(e, editor) {
    setEditor(editor.getData());
  }

  function onClickInner(e) {
    e.stopPropagation();
  }

  return active ? (
    <div
      className="addsectionpop"
      onClick={() => {
        dispatch(setPopAddSection(false));
        setErrSpan(null);
      }}
    >
      <form action="" id="add" onSubmit={(e) => Submit(e)}>
        <div onClick={(e) => onClickInner(e)} className="addsection-container">
          <div className="colorful-title" style={{ padding: "0" }}>
            Add new Subject
          </div>

          <div className="addsection-inner">
            <div className="form-group">
              <div className="half-form-group">
                <label htmlFor="">Tutorial Name(Icon)</label>
                <input
                  ref={refName}
                  id="name"
                  type="text"
                  className="custom-input"
                />
              </div>
              <div className="half-form-group">
                <label htmlFor="">Tutorial Title</label>
                <input
                  ref={refTitle}
                  id="title"
                  type="text"
                  className="custom-input"
                />
              </div>
            </div>
            <div className="form-group">
          <CKEditor
            id="body"
            editor={ClassicEditor}
            // onReady={ editor => {
            //     // You can store the "editor" and use when it is needed.
            //     console.log( 'Editor is ready to use!', editor );
            // } }
            onChange={(e, editor) => onChangeEditor(e, editor)}
            // onChange={ ( event, editor ) => {
            //     const data = editor.getData();
            //     console.log( { event, editor, data } );
            // } }
            // onBlur={ ( event, editor ) => {
            //     console.log( 'Blur.', editor );
            // } }
            // onFocus={ ( event, editor ) => {
            //     console.log( 'Focus.', editor );
            // } }
          />
          </div>
          </div>
    
   
          {errSpan != null
            ? Object.keys(errSpan).map((x, i) => {
                return (
                  <p key={i} style={{ color: "red" }}>
                    {errSpan[x]}
                  </p>
                );
              })
            : null}
          <Button
            form="add"
            outsideDiv={true}
            margin={"1.5rem 0"}
            flexEnd={true}
            text={"Add"}
            width={"150px"}
          />
        </div>
      </form>
    </div>
  ) : (
    ""
  );
}

export default React.memo(AddSection);
