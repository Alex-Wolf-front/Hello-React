import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./App.css";
import Delete from "./delete.png";
import Edit from "./edit.png";

function TableRow(props) {
  const { id, name, email, isChecked, onClick, editClick, deleteClick } = props;

  return (
    <tr
      onClick={() => onClick(id)}
      className={classNames({ string: true, active: isChecked })}
    >
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <img
          onClick={() => editClick(id)}
          className="editImg"
          title="Edit"
          src={Edit}
          alt="Edit"
        ></img>
        <img
          onClick={() => deleteClick(id)}
          className="deleteImg"
          title="Delete"
          src={Delete}
          alt="Delete"
        ></img>
      </td>
    </tr>
  );
}

function Table(props) {
  const [selectedId, setSelectedId] = useState();
  const { valueList, deleteClick, editClick } = props;

  const tableList = valueList.map((tableProps) => {
    return (
      <TableRow
        key={tableProps.id}
        {...tableProps}
        isChecked={selectedId === tableProps.id}
        onClick={setSelectedId}
        deleteClick={deleteClick}
        editClick={editClick}
      ></TableRow>
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
  const { editValue, updateData } = props;

  useEffect(() => {
    if (editValue) {
      setInValue(editValue);
    }
  }, [editValue]);

  const updateInput = (e) => {
    const { name, value } = e.target;
    setInValue((inValue) => ({ ...inValue, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      updateData(name, email);
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
  const [editValue, setEditValue] = useState(null);
  const [id, setId] = useState(0);

  const deleteInfo = (id) => {
    setValueList(
      valueList.filter(function (obj) {
        return obj.id !== id;
      })
    );
  };

  const editInfo = (id) => {
    setEditValue(valueList.find((obj) => obj.id === id));
  };

  const updateData = (name, email) => {
    if (editValue) {
      const editId = editValue.id;
      setValueList(
        valueList.map((item) =>
          item.id === editId ? { ...item, name, email } : item
        )
      );
      setEditValue(null);
    } else {
      setValueList(valueList.concat({ name, email, id }));
      setId(id + 1);
    }
  };

  return (
    <div className="content">
      <Form updateData={updateData} editValue={editValue} />
      <Table
        valueList={valueList}
        deleteClick={deleteInfo}
        editClick={editInfo}
      />
    </div>
  );
}
