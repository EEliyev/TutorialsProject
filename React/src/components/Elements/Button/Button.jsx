import React from "react";
import "./Button.css";

function Button({ text, width, type, outsideDiv = false , flexEnd=false, margin, minWidth=true,padding, onClick,form}) {
  if (type == "black") {
    return (!outsideDiv) ? (
      <button onClick={onClick} form={form} className="btn-black" style={{ width: `${width}`,margin:margin,minWidth:minWidth?"100px":"none" ,padding:padding}}>
        {text}
      </button>
    ) : (
      <div className="btn-outside" style={{ justifyContent:`${flexEnd?"end":"start"}`,margin:margin}}>
        <button onClick={onClick} form={form}  className="btn-black" style={{ width: `${width}`,minWidth:minWidth?"100px":"none" ,padding:padding}}>
          {text}
        </button>
      </div>
    );
  } else {
    return (!outsideDiv) ? (
      <button onClick={onClick} form={form} className="btn" style={{ width: `${width}`,margin:margin,minWidth:minWidth?"100px":"none",padding:padding }}>
        {text}
      </button>
    ) : (
      <div className="btn-outside" style={{ justifyContent:`${flexEnd?"end":"start"}`,margin:margin}}>
       <button onClick={onClick} form={form}  className="btn" style={{ width: `${width}`,minWidth:minWidth?"100px":"none" ,padding:padding}}>
        {text}
      </button>
      </div>
    );
  }
}

export default React.memo(Button);
