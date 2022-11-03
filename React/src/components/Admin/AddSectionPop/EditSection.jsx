import React, { useRef, useState } from "react";
import "./AddSection.css";
import Button from "../../Elements/Button/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setPopAddSection, setPopAddTuto, setPopEditSection } from "../../../Redux/popupReducer";
import { addData } from "../../../Redux/dataReduce";
import { setRender } from "../../../Redux/renderReducer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import  ClassicEditor  from "@ckeditor/ckeditor5-build-classic";
import Fetch from "../../Fetch";
import { useLocation, useNavigate } from "react-router-dom";

function EditSection({ selectedSub }) {
  const active = useSelector((state) => state.pop.popEditSection);
  const dispatch = useDispatch();
  const location=useLocation();
  const navigate=useNavigate();

  const [errSpan, setErrSpan] = useState(null);


  const [editor, setEditor] = useState(null);
  const refName = useRef(null);
  const refTitle = useRef(null);
  const refEditor= useRef(null);

  function Submit(e) {

    e.preventDefault();
    var model = {
      name: refName.current?.value != "" ? refName.current?.value : null,
      title: refTitle.current?.value != "" ? refTitle.current?.value : null,
      body: editor != "" ? editor : null,    };
    // console.log(model);

    Fetch(`https://localhost:7156/subject/EditSubject/${selectedSub?.id}`,"Put",model)
          .then(json=>{
            if(json?.status==401){
              dispatch(setPopEditSection(false))
              navigate("/sign-in",{state:{from:location,replace:true}})
            }else{
            if (json?.errors != null) {
              setErrSpan(json?.errors);
            }else{
              console.log(json);
              dispatch(setPopEditSection(false))
              dispatch(setRender(Math.random()));
            }
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
        dispatch(setPopEditSection(false));
        setErrSpan(null);
      }}
    >
      <form action="" id="add" onSubmit={(e) => Submit(e)}>
        <div onClick={(e) => onClickInner(e)} className="addsection-container">
          <div className="colorful-title" style={{ padding: "0" }}>
            Edit Subject
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
                  defaultValue={selectedSub?.name}
                />
              </div>
              <div className="half-form-group">
                <label htmlFor="">Tutorial Title</label>
                <input
                  ref={refTitle}
                  id="title"
                  type="text"
                  className="custom-input"
                  defaultValue={selectedSub?.title}
                />
              </div>
            </div>
            <div className="form-group">
          <CKEditor
          ref={refEditor}
            id="body"
            editor={ ClassicEditor }
            data={selectedSub?.body}
            onChange={(e, editor) => onChangeEditor(e, editor)}
            // onReady={ editor => {
            //     // You can store the "editor" and use when it is needed.
            //     console.log( 'Editor is ready to use!', editor );
            // } }
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

export default React.memo(EditSection);
