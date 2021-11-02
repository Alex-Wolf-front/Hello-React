import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [submitName, setSubmitName] = useState("");
  const [email, setEmail] = useState("");
  const [submitEmail, setSubmitEmail] = useState("");
  const [result, setResult] = useState("");
  const onChange = (e) => {
    e.preventDefault();
    setSubmitName(username);
    setSubmitEmail(email);
    sendUserInfo();

    // For clear inputs after submit
    setUsername("");
    setEmail("");
  };

  const sendUserInfo  = () => {
    setResult(
    <div className="UserInfo">
        <p>Your username is <span className="resultInfo">{submitName}</span></p>
        <p>Your email is <span className="resultInfo">{submitEmail}</span></p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onChange}>
      <div className="form-group">
        <input type="text" placeholder="Your Username" value={username} onChange={e => setUsername(e.target.value)} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <button className="subForm" type="submit">Send</button>
      {result}
    </form>
  );
}

export default App;
