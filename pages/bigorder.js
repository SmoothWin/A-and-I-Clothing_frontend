import { useState } from "react";
import axios from 'axios';

export default function bigorder(){
    const [selectedFile, setSelectedFile] = useState(null);

    function onChangeHandler(e){
        setSelectedFile(e.target.files[0])
    }
    function onClickHandler(e){
        const data = new FormData() 
        data.append('file', selectedFile)
        axios.post("http://localhost:8000/upload", data, { 
            // receive two    parameter endpoint url ,form data
        })
    }
    return (
        <>
            <h2>Big Order</h2>
            <a href="/bigorder_template.csv" download> download template </a>
            <br/>
            <label>Submit your big order</label>
            <br/>
            <input type="file" accept=".csv"
                onChange={onChangeHandler}
                
            />
            <br/>
            <button type="button" onClick={onClickHandler}>Upload</button>
        </>
    )
}