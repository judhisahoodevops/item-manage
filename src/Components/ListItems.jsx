import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListItems() {
    const [allItem, setAllItem] = useState([]);
    useEffect(() => {
        axios
            .get("/api/items")
            .then((Response) => {
                setAllItem(Response.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the items!", error);
            });
    }, []);

    const handleDelete = (id) => {
        axios
            .delete(`/api/items/${id}`)
            .then((response) => {
                setAllItem(allItem.filter((item) => item.id !== id));
            })
            .catch((error) => {
                console.error("There was an error deleting the item!", error);
            });
    };

    return (
        <div>
            <h2>Items List</h2>
            <Link to="/create">Create New Item</Link>
            <ul>
                {allItem.map((item) => (
                    <li key={item.id}>
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        {item.image && (
                            <img
                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                alt={item.name}
                                width="100"
                            />
                        )}
                        <Link to={`/edit/${item.id}`}>Edit</Link>
                        <Link onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>Delete</Link>
                        {/*<button onClick={() => handleDelete(item.id)} style={{ marginLeft: '10px' }}>Delete</button>*/}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListItems;
