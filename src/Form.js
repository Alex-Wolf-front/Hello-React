import React, { useState, useEffect } from "react";
import axios from "axios";

const sendInfo = (method, email, name, id) => {
  let url =
    method === "post"
      ? `https://reqres.in/api/users`
      : `https://reqres.in/api/users/${id}`;
  axios({
    method: method,
    url: url,
    data: {
      first_name: name,
      last_name: "",
      email: email,
    },
  })
    .then(function (response) {
      console.log(response, "response");
    })
    .catch(function (error) {
      console.log(error, "error");
    });
};

export default function Form(props) {
  const [inValue, setInValue] = useState({ name: "", email: "" });
  const { name, email } = inValue;
  const [error, setError] = useState(false);
  const { editValue, setEditValue } = props;

  useEffect(() => {
    if (editValue) {
      setInValue({
        name: editValue.first_name + " " + editValue.last_name,
        email: editValue.email,
      });
    }
  }, [editValue]);

  const updateInput = (e) => {
    const { name, value } = e.target;
    setInValue((inValue) => ({ ...inValue, [name]: value }));
  };

  const postData = (email, name) => {
    if (editValue) {
      sendInfo('put', email, name, editValue.id);
      setEditValue(null);
    } else {
      sendInfo('post', email, name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      postData(name, email);
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
