import React, { useState } from "react";
import { useQuery } from "react-query";

import Form from "./Form";
import CustomTable from "./Table";
import axios from "axios";
import "./App.css";

const fetchData = async (page) => {
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return res.data;
};

export default function App() {
  const [valueList, setValueList] = useState([]);
  const [editValue, setEditValue] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ["fetchUserInfo", page],
    () => fetchData(page)
  );

  const nextPage = () => {
    if (page < data.total_pages) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const deleteInfo = (id) => {
    axios.delete(`https://reqres.in/api/users/${id}`);
  };

  const editInfo = (id) => {
    setEditValue(data.data.find((obj) => obj.id === id));
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
    }
  };

  return (
    <div className="content">
      <Form
        updateData={updateData}
        editValue={editValue}
        setEditValue={setEditValue}
      />

      {isError && <div>{error.message}</div>}

      {isLoading && <div>Loading...</div>}

      {isSuccess && (
        <CustomTable
          data={data}
          deleteClick={deleteInfo}
          editClick={editInfo}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}
