import React, { useState } from 'react';
import './App.css';
import Delete from './delete.png';

function Table(props) {
  const name = props.name;
  const email = props.email;

  const [valueList, setValueList] = useState([]);

  let id = valueList.length
  setValueList(valueList.concat({name, email, id}))

  const deleteInfo = (id) => {
    setValueList(valueList.filter(function(obj) {return obj.id !== id }));
  }

  const tableList = valueList.map(({name, email, id}) => {
    return (
      <tr key={id}>
        <th>{name}</th>
        <th>{email}</th>
        <th onClick={() => deleteInfo(id)}><img className="deleteImg" src={Delete}></img></th>
      </tr>
    )
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
      <tbody>
        {tableList}
      </tbody>
    </table>
  );
}

export default function App() {
  const [inValue, setInValue] = useState({name: "", email: ""});
  const {name, email} = inValue;
  const [subValue, setSubValue] = useState({sendName: "", sendEmail: ""});
  const {sendName, sendEmail} = subValue;
  const [error, setError] = useState(false);

  const updateInput = (e) => {
    const {name, value} = e.target
    setInValue(inValue => ({ ...inValue, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      setSubValue({sendName: name, sendEmail: email});
      setError(false);

      // For clear inputs after submit
      setInValue({name: "", email: ""});
      console.log("success");
    } else {
      setError(true);
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
    {sendName && <Table name={sendName} email={sendEmail}/> }
    </div>
  );
}
