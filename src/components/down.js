import React,{useState} from "react";
import axios from 'axios'
import fileDownload from 'js-file-download'
import './file2.css'
import {useNavigate,useLocation} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Down = () => {
  const navigate = useNavigate();
const location = useLocation();
  const {username}  = location.state; 
  const[download,setdow]=useState('')
  function handleDownload () {
    if(download=='')
    {
      toast.error("please write file name")
    }
    else{


    var user={
      download:download,
      username:username
    }
    axios.post('api/text',user);
    axios.get('/api/down', {
      responseType: 'blob',
    })
    .then((res) => {
      toast.success('success')
      fileDownload(res.data, download)
    })
    .catch(()=>
    {
      toast.error("file not found")
    })
  }}
 
    const [files, setFiles] = useState([]);
  function show(){
    var user={
      download:download,
      username:username
    }
    axios.post('api/text',user);
    axios.get('/api/files')
      .then((response) => {
        setFiles(response.data);
      })
  }
 function dow(file){
 
  
  setdow(file);
  
 
    


 }

   
  return(
  <div className="down">
<input type='text' placeholder="enter file name" value={download} onChange={(e)=>{setdow(e.target.value)}} ></input>
<br></br>
  <button onClick={handleDownload}>Download</button>
  <button onClick={show}>Show files:</button>
  <ToastContainer/>
  <div>
        <h1>Files Available:</h1>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file}<button onClick={()=>dow(file)}>download</button></li>
          ))}
        </ul>
      </div>
  </div>
  )
  
}

export default Down;