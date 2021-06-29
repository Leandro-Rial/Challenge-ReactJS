import React, { useState } from "react";
import { Link } from "react-router-dom";
import More from "../../../assets/Vector.png";
import Edit from "../../../assets/edit-solid-24.png";
import Trash from "../../../assets/trash-alt-regular-24.png";

const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="subheader">
        <h1 className="title-subheader">Mi projects</h1>
        <Link className="btn" to="/add">
          + Add Project
        </Link>
      </div>
      <div className="home">
        <input type="text" className="search" placeholder="Search..." onChange={(e) => {setSearchTerm(e.target.value)}} />
        <div className="list">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Project info</th>
                <th scope="col">Project Manager</th>
                <th scope="col">Assigned to</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {props.users.length > 0 ? (
                props.users.filter((user) => {
                  if (searchTerm === "") {
                    return user
                  } else if (user.projectInfo.toLowerCase().includes(searchTerm.toLowerCase())){
                    return user
                  }
                }).map((user) => (
                  <tr key={user.id}>
                    <td className="projectInfo">
                      <p>{user.projectInfo}</p>
                      <span className="createdAt">{user.createdAt}</span>
                    </td>
                    <td className="ProjectManager">{user.ProjectManager}</td>
                    <td className="Assignedto">{user.Assignedto}</td>
                    <td className="Status">
                      <button className="Status">{user.Status}</button>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <img src={More} alt="" />
                        </button>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <Link to={`/edit/${user.id}`}>
                            <button onClick={() => props.editRow(user)}>
                              <img src={Edit} alt="" />
                              Edit
                            </button>
                          </Link>
                          <button onClick={() => props.deleteProject(user.id)}>
                            <img src={Trash} alt="" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No users</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
