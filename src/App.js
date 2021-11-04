import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [inValue, sertInValue] = useState({name: "", email: ""});
  const {name, email} = inValue
  const [error, setError] = useState(false);
  const [valueList, setValueList] = useState([]);

  const SendUserInfo = (props) => {
    return (
      <tr>
        <th>{props.name}</th>
        <th>{props.email}</th>
      </tr>
    )
  }

  const updateInput = (e) => {
    const {name, value} = e.target
    sertInValue(inValue => ({ ...inValue, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setValueList(valueList.concat(<SendUserInfo name={name} email={email} key={valueList.length} />));
      setError(false)
      // For clear inputs after submit
      sertInValue({name: "", email: ""})
      console.log("success")
    } else {
      setError(true)
      console.log("oops");
    }
  };

  return (
    <div className="content">
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" placeholder="Your Username" name="name" value={name} onChange={updateInput} />
        {error && !name && <span className="warningMes">Name is required!</span>}
      </div>
      <div className="form-group">
        <input type="email" placeholder="Your Email" name="email" value={email} onChange={updateInput} />
        {error && !email && <span className="warningMes">Email is required!</span>}
      </div>
      <button className="subForm" type="submit">Send</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {valueList}
      </tbody>
    </table>
    </div>
  );
}
