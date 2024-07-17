import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateItem from "./Components/CreateItem";
import UpdateItem from "./Components/UpdateItem";
import ListItems from "./Components/ListItems";

import axios from "axios";

// Set the base URL for axios
axios.defaults.baseURL = "http://127.0.0.1:8000";

import { AuthProvider } from "./AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Registration";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <div className="App">
            <nav>
              <ul>
                <li>
                  <Link to="/items">Home</Link>
                </li>
                {/*<li>
                            <Link to="/create">Create Item</Link>
                        </li>*/}
              </ul>
            </nav>
            <Routes>
            <Route path="/login" component={<Login />} />
            <Route path="/register" component={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <ListItems />
                </ProtectedRoute>
                } />
              {/*<Route path="/items" element={<ListItems />} />

              <Route path="/create" element={<CreateItem />} />
              <Route path="/edit/:id" element={<UpdateItem />} />*/}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
