import React, { useState } from "react";
import "./App.css";
import Delete from "./delete.png";

function Table(props) {
  const tableList = props.valueList.map(({ name, email, id }) => {
    console.log(props.valueList, props.valueList.length);
    return (
      <tr key={id}>
        <th>{name}</th>
        <th>{email}</th>
        <th onClick={() => props.onClick(id)}>
          <img className="deleteImg" src={Delete} alt=""></img>
        </th>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Act</th>
        </tr>
      </thead>
      <tbody>{tableList}</tbody>
    </table>
  );
}

function Form(props) {
  const [inValue, setInValue] = useState({ name: "", email: "" });
  const { name, email } = inValue;
  const [error, setError] = useState(false);

  const updateInput = (e) => {
    const { name, value } = e.target;
    setInValue((inValue) => ({ ...inValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      props.updateData(name, email);
      setError(false);

      // For clear inputs after submit
      setInValue({ name: "", email: "" });
    } else {
      setError(true);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Your Username"
          name="name"
          value={name}
          onChange={updateInput}
        />
        {error && !name && (
          <span className="warningMes">Name is required!</span>
        )}
      </div>
      <div className="form-group">
        <input
          type="email"
          placeholder="Your Email"
          name="email"
          value={email}
          onChange={updateInput}
        />
        {error && !email && (
          <span className="warningMes">Email is required!</span>
        )}
      </div>
      <button className="subForm" type="submit">
        Send
      </button>
    </form>
  );
}

export default function App() {
  const [valueList, setValueList] = useState([]);
  const [id, setId] = useState(0);

  const deleteInfo = (id) => {
    setValueList(
      valueList.filter(function (obj) {
        return obj.id !== id;
      })
    );
  };

  const updateData = (name, email) => {
    setValueList(valueList.concat({ name, email, id }));
    setId(id + 1);
  };

  return (
    <div className="content">
      <Form updateData={updateData} />
      <Table valueList={valueList} onClick={deleteInfo} />
    </div>
  );
}
