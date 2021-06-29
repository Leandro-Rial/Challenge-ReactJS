import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Add from "./Add/Add";
import api from "../../api/users";
import { v4 as uuidv4 } from "uuid";
import Edit from "./EditProject/Edit";
import axios from "axios";

const Pages = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      await fetch("http://localhost:3006/users")
        .then((response) => response.json())
        .then((json) => setUsers(json))
        .catch((error) => console.log(error));
    };

    getUsers();
  }, []);

  const addUsers = async (user) => {
    const request = {
      id: uuidv4(),
      ...user,
    };

    const response = await api.post("/users", request);
    setUsers([...users, response.data]);
  };

  const projectState = {
    id: null,
    projectInfo: "",
    description: "",
    ProjectManager: "",
    Assignedto: "",
    Status: "",
  };

  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(projectState);

  const deleteProject = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };


  const editRow = (user) => {
    setEditing(true);

    setCurrentUser({
      id: user.id,
      projectInfo: user.projectInfo,
      description: user.description,
      ProjectManager: user.ProjectManager,
      Assignedto: user.Assignedto,
      Status: user.Status,
    });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false);

    setUsers(users.map((user) => (user.id === id ? updateUser : user)));
  };

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Home users={users} deleteProject={deleteProject} editRow={editRow} />}
      />
      <Route
        path="/add"
        render={() => <Add addUsers={addUsers} />}
      />
      <Route
        path="/edit/:id"
        render={() => (
          <Edit
            setEditing={setEditing}
            currentUser={currentUser}
            updateUser={updateUser}
          />
        )}
      />
    </Switch>
  );
};

export default Pages;
