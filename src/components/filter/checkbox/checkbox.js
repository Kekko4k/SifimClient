import { useState } from "react";
import "./checkbox.css"

const Checkbox = ({ actualData, check,id, max, string}) => {
    let defaultChecked=false;
    if(check>-1){
        defaultChecked=true
    }
    const [isChecked, setIsChecked] = useState(defaultChecked);


    const setChecked = ({ currentTarget: input }) => {
        setIsChecked((prev) => !prev)
        id(input.value)
        
    }

    return (
        <label  className="inputDiv">
          <input type="checkbox" checked={isChecked} value={actualData<max?actualData:-1}  onChange={setChecked} />
          <span className="inputDescription" >{actualData<max?actualData:string}</span>
        </label>
    );
  };
  export default Checkbox;