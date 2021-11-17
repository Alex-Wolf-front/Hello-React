import React, { useState } from "react";
import classNames from "classnames";
import Delete from "./delete.png";
import Edit from "./edit.png";

function TableRow(props) {
  const { id, first_name, last_name, email, isChecked, onClick, editClick, deleteClick } = props;

  return (
    <tr
      onClick={() => onClick(id)}
      className={classNames("string", { active: isChecked })}
    >
      <td>{first_name} {last_name}</td>
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

export default function CustomTable(props) {
  const [selectedId, setSelectedId] = useState();
  const { data, deleteClick, editClick, prevPage, nextPage } =
    props;
  const rowsPerPage = data.per_page || 5;
  const page = data.page - 1;
  const maxRowsValue = page * rowsPerPage + rowsPerPage;

  const IsNotNext = data.total <= maxRowsValue;
  const IsNotPrev = page === 0;

  const UsersInfo = data.data

  const tableList = UsersInfo.map((tableProps) => {
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
      <tfoot>
        <tr>
          <td colSpan="3">
            <div>
              {page * rowsPerPage + 1}-
              {data.total > maxRowsValue ? maxRowsValue : data.total}{" "}
              из {data.total}
            </div>
            <div onClick={prevPage}>
              <i
                className={classNames("fas", "fa-chevron-left", {
                  disabled: IsNotPrev,
                })}
              ></i>
            </div>
            <div onClick={nextPage}>
              <i
                className={classNames("fas", "fa-chevron-right", {
                  disabled: IsNotNext,
                })}
              ></i>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
