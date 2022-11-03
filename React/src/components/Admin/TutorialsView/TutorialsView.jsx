import React, { useEffect, useState } from "react";
import "./TutorialsView.css";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-uuid";
import Button from "../../Elements/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Add from "../AddPop/Add";
import { setPopAdd, setPopAddSection, setPopAddTuto, setPopEditSection, setPopEditTuto } from "../../../Redux/popupReducer";
import Edit from "../AddPop/Edit";
import { setData, setSubject } from "../../../Redux/dataReduce";
import { setRender } from "../../../Redux/renderReducer";
import AddSection from "../AddSectionPop/AddSection";
import EditSection from "../AddSectionPop/EditSection";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Fetch from "../../Fetch";


function TutorialsView() {
  const cards = useSelector((state) => state.data.data);
  const subjects= useSelector(state=>state.data.subjects);
  const refresh =useSelector((state)=>state.render.render);
  const popAddActive= useSelector(state=>state.pop.popAddTuto);
  const popEditActive= useSelector(state=>state.pop.popEditTuto);
  const dispatch= useDispatch();

  const[selectedTuto,setSelectedTuto]= useState([]);
  const[selectedSub,setSelectedSub]=useState([]);
  const [selectedTutoName,setSelectedTutoName]= useState(null);
  const[tutorial,setTutorial]=useState([]);

  const navigate=useNavigate();
  const location=useLocation();

  useEffect(() => {
    Fetch("https://localhost:7156/tutorial/GetTutorials","Get")
          .then(json=>{
            dispatch(setData(json)) 
        if(selectedTutoName==null){
          dispatch(setSubject(json[0]?.subjects))
          setSelectedTuto(json[0])
          setSelectedTutoName(json[0]?.name)
        }
        else{
          dispatch(setSubject(json.filter(x=>x.id==selectedTuto.id)[0].subjects))
        }
          })

  }, [popAddActive,refresh]);


  function GetSubjects(x){
    setSelectedTuto(x)
    setSelectedTutoName(x?.row?.name)
    Fetch(`https://localhost:7156/tutorial/getbyid/${x.id}`,"Get")
        .then(x=>{
          dispatch(setSubject(x?.subjects))
        })
 
  }

  
  function DeleteTutorial(id){
    console.log(id)
    Fetch(`https://localhost:7156/tutorial/DeleteTutorial/${id}`,"Delete",null,dispatch)
          .then(json=>{
            if(json?.status==401){
              navigate("/sign-in",{state:{from:location,replace:true}})
            }
            dispatch(setRender(Math.random()))
          })
 
  }
  function DeleteSubject(id){
    console.log(id)
    Fetch(`https://localhost:7156/subject/deleteSubject/${id}`,"Delete",null,dispatch)
          .then(json=>{
            if(json?.status==401){
              navigate("/sign-in",{state:{from:location,replace:true}})
            }
            dispatch(setRender(Math.random()))
          })

    
  }

  return (
    <div className="tutorialsview">
      <div className="colorful-title" style={{ padding: "0" }}>
        Admin Panel
      </div>
      <Button
        text={"Add"}
        outsideDiv={true}
        flexEnd={true}
        margin={"0 0 1.5rem 0"}
        padding={"0.8rem"}
        onClick={()=>dispatch(setPopAddTuto(true))}
      />
      {/* Popups */}

      <Add  />
      <Edit data={tutorial}/>
      <AddSection selectedTuto={selectedTuto}/>
      <EditSection selectedSub={selectedSub}/>


      <DataGrid
        rows={cards}
        getRowId={(row) => row.id}
        onRowClick={(x)=>GetSubjects(x)}
        columns={[
          {field:"id",headerName:"Id"},
          { field: "name", headerName: "Name" },
          { field: "title", width: "200", headerName: "Title" },
          { field: "text", width: "500", headerName: "Text" },
          {
            field: "Edit",
            renderCell: (x) => (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Button
                  onClick={() => {
                    setTutorial(x.row)
                    dispatch(setPopEditTuto(true))
                  }}
                  padding={"0.5rem"}
                  minWidth={false}
                  text="Edit"
                />
                
                <Button
                  onClick={() => {
                    DeleteTutorial(x.row.id)
                  }}
                  type="black"
                  padding={"0.5rem"}
                  minWidth={false}
                  text="X"
                  margin={"0 0 0 0.5rem"}
                />
              </div>
            ),
          },
        ]}
        autoHeight
        pageSize={5}
      />
    
      <div className="" style={{display:"flex",justifyContent:"space-between", alignContent:"center"}}>
        <h1 style={{display:"flex",alignItems:"center",color:"#C8D94D"}}>Subjects of {selectedTutoName}</h1>
      <Button
        text={"Add"}
        margin={"1rem 0 1.5rem 0"}
        padding={"0.8rem"}
        onClick={()=>dispatch(setPopAddSection(true))}
      />
      </div>
     
      <DataGrid
        rows={subjects}
        getRowId={(row) => row.id}
        
        columns={[
          {field:"id",headerName:"Id"},
          { field: "name", headerName: "Name" },
          { field: "title", width: "200", headerName: "Title" },
          { field: "body", width: "300", headerName: "Text" },
          {field:"tutorialId", width:"200"},
          {
            field: "Edit",
            renderCell: (x) => (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Button
                  onClick={() => {
                    setSelectedSub(x.row)
                    dispatch(setPopEditSection(true))
                  }}
                  padding={"0.5rem"}
                  minWidth={false}
                  text="Edit"
                />
                
                <Button
                  onClick={() => {
                    DeleteSubject(x.row.id)
                  }}
                  type="black"
                  padding={"0.5rem"}
                  minWidth={false}
                  text="X"
                  margin={"0 0 0 0.5rem"}
                />
              </div>
            ),
          },
        ]}
        autoHeight
        pageSize={5}
      />
    
    </div>
  );
}

export default React.memo(TutorialsView);
