import React from 'react';
import {useNavigate,useLocation} from "react-router-dom"
import './file.css'
import axios from 'axios'
import  { useState } from "react";
import {useDropzone} from 'react-dropzone'
import Dropzone from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Detail = () => {
const navigate = useNavigate();
const location = useLocation();
  const {username}  = location.state;  
  const[backenddata,setbackenddata]=useState([])
var name;
var user = {
  username:username
}
axios.post('/api/site',user)
.then(res=>{
  console.log(res)
  setbackenddata(res.data);
  });
  const {getRootProps, getInputProps} = useDropzone()
 
    const [selectedFile, setSelectedFile] = useState([]);
    const handleFileUpload = () => {
      const formData = new FormData();
      selectedFile.forEach((file2)=>{
        formData.append('file',file2)
      })
      // formData.append('file', selectedFile);
  axios.post('api/upload/user',user);
      axios
        .post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          
          toast.success(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
      }
      const filePreviews = selectedFile.map((file, index) => (
        <div key={index}>
          {file.type.startsWith('image/') ? (
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ maxWidth: '200px' }}
            />
          ) : (
            <p>{file.name}</p>
          )}
        </div>
      ));

return (
	<>
		
    <div className='dropzone'>
      <Dropzone onDrop={(acceptedFiles) => setSelectedFile(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps({multiple:true}) }/>
            <p>Drag and drop a file here, or click to select a file</p>
          </div>
          
        )}
      </Dropzone>
      <button onClick={handleFileUpload}>Upload File</button>
     
    </div>
    {filePreviews}

  <h1>Hello {backenddata}</h1><br>
  </br>
  <h1>How can I help u???</h1>
<ToastContainer/>
	</>
)
};

export default Detail;
