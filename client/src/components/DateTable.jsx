import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
const DateTable = ({ list, username }) => {
  const navigate = useNavigate();

  const view = (id) => {
    navigate(`/view/${id}`);
  };

  const edit = (id) => {
    navigate(`/edit/${id}`);
  };

  const eliminate = (id) => {
    navigate(`/eliminate/${id}`);
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Autor</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, key) => (
          <tr key={key}>
            <td>{key + 1}</td>
            <td>{item.title}</td>
            <td>{item.autor.username}</td>
            <td>
              <ButtonGroup style={{ maxWidth: "50px" }}>
                <Button variant="primary" onClick={() => view(item._id)}>
                  View
                </Button>
                {username && username.id === item.autor._id}
                <>
                  <Button variant="success" onClick={() => edit(item._id)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => eliminate(item._id)}>
                    Eliminate
                  </Button>
                </>
              </ButtonGroup>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DateTable;
