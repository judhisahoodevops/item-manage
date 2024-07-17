import axios from "axios";
import React, {useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateItem() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name',name);
      formData.append('description',description);
      if(image){
        console.log('cImage',image);
        formData.append('image',image);
      }
      axios.post('/api/items',formData,{
        headers : {
          "Content-Type": "multipart/form-data"
        }
      }).then((Response)=>{
        console.log(Response.data);
        navigate("/");
      }).catch((error)=>{
        console.error("There was an error creating the item!", error);
      })
    };

    

    return (
        <div>
            <h2>Create Item</h2>
            <form onSubmit={handleSubmit}> 
                <label> Name : </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label> Description </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <label>Image</label>
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateItem;
