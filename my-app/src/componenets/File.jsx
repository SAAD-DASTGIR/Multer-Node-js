import React, { useState } from 'react'

import axios from 'axios';


const File = () => {
    const [file,setFiles]=useState();
    const handleUpload=()=>{
        const formData=new FormData();
        formData.append('file',file);
        console.log(file);
        axios.post('http://localhost:5000/upload', formData, { responseType: 'arraybuffer' })
        .then(res => {
          // Handle the response appropriately, e.g., open the file
          const blob = new Blob([res.data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        })
        .catch(err => console.log("error in file upload", err));
    }
    const handleFileChange = (event) => {
      setFiles(event.target.files[0]);
    };

  return (
    <div>
      <form  encType="multipart/form-data" >

      <input type="file" name="file" onChange={handleFileChange} />
     <button 
     type='submit'
     onClick={handleUpload}
     className='upload-btn'
     >Upload</button>
     </form>
    </div>
  )
}

export default File
