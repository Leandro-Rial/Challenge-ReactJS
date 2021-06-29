import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Flecha from "../../../assets/flecha.png";
import { useHistory } from "react-router-dom";

const Edit = (props) => {
  const [user, setUser] = useState(props.currentUser);

  const history = useHistory();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      user.projectInfo === "" ||
      user.description === "" ||
      user.ProjectManager === "" ||
      user.Assignedto === "" ||
      user.Status === ""
    ) {
      alert("All the fields are mandatory!");
      return;
    }

    props.updateUser(user.id, user);
    history.push("/");
  };

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return (
    <div>
      <div className="subheader-back">
        <Link className="btn-back" to="/">
          <img src={Flecha} alt="" />
          <p>Back</p>
        </Link>
        <h1 className="title-subheader">Edit project</h1>
      </div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="rows">
            <label htmlFor="ProjectName">Project Name</label>
            <input
              type="text"
              name="projectInfo"
              value={user.projectInfo}
              onChange={handleInputChange}
            />
          </div>

          <div className="rows">
            <label htmlFor="Description">Description</label>
            <input
              type="text"
              name="description"
              value={user.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="rows">
            <label htmlFor="ProjectManager">Project Manager</label>
            <select name="ProjectManager">
              <option value="">Please select a person</option>
              <option value={user.ProjectManager}>Walt Cosani</option>
            </select>
          </div>

          <div className="rows">
            <label htmlFor="Assignedto">Assigned to</label>
            <select name="Assignedto">
              <option value="">Please select a person</option>
              <option value={user.Assignedto}>Ignacio Truffa</option>
            </select>
          </div>

          <div className="rows">
            <label htmlFor="Status">Status</label>
            <select name="Status">
              <option value={user.Status}>Enabled</option>
            </select>
          </div>

          <button>Update user</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
