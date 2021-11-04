import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [inValue, sertInValue] = useState({name: "", email: ""});
  let userName = inValue.name;
  let userEmail = inValue.email;
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
    let name = e.target.name;
    let value = e.target.value;
    sertInValue(inValue => ({ ...inValue, [name]: value}));
  }

  const onChange = (e) => {
    e.preventDefault();
    if (userName && userEmail) {
      setValueList(valueList.concat(<SendUserInfo name={userName} email={userEmail} key={valueList.length} />));
      setError(false)
      // For clear inputs after submit
      sertInValue({...inValue, name: "", email: ""})
      console.log("success")
    } else {
      setError(true)
      console.log("oops");
    }
  };

  return (
    <div className="content">
    <form className="form" onSubmit={onChange}>
      <div className="form-group">
        <input type="text" placeholder="Your Username" name="name" value={userName} onChange={updateInput} />
        {error && !userName && <span className="warningMes">Name is required!</span>}
      </div>
      <div className="form-group">
        <input type="email" placeholder="Your Email" name="email" value={userEmail} onChange={updateInput} />
        {error && !userEmail && <span className="warningMes">Email is required!</span>}
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
