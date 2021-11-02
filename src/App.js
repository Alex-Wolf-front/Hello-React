import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('tets');
  const [SubmitName, setSubmitName] = useState("");
  const [email, setEmail] = useState('test@tet.et');
  const [SubmitEmail, setSubmitEmail] = useState("");
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
        <p>Your username is <span className="resultInfo">{SubmitName}</span></p>
        <p>Your email is <span className="resultInfo">{SubmitEmail}</span></p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onChange}>
      <div className="form-group">
        <input type="text" placeholder="Your Username" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button className="subForm" type="submit">Send</button>
      {result}
    </form>
  );
}

export default App;
