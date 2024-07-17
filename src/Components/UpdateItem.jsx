import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate(); // Updated from useHistory to useNavigate
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    axios.get(`/api/items/${id}`)
      .then(response => {
        setName(response.data.name);
        setDescription(response.data.description);
        setCurrentImage(response.data.image); // Set the current image path
      })
      .catch(error => {
        console.error('There was an error fetching the item!', error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('_method', 'PUT');
        if (image) {
            formData.append('image', image);
        }
        axios.post(`/api/items/${id}`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          console.log(response.data);
          navigate('/');
      })
      .catch(error => {
          console.error('There was an error updating the item!', error);
      });
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        { currentImage && (
          <div>
              <img src={`http://127.0.0.1:8000/storage/${currentImage}`} alt={name} width="100" />
          </div>
        )

        }
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateItem;
