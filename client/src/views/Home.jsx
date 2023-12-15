import { Card } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import DateTable from "../components/DateTable";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const [list, setList] = useState([]);
  const { username } = useAuthContext();

  const loadList = async () => {
    const url = "http://localhost:3000/posts";

    let response = await fetch(url);

    if (response.status === 200) {
      response = await response.json();
    }
    setList(response);
  };

  useEffect(() => {
    loadList();
  }, []);
  return (
    <>
    <Card.Body>
      {username ? ("Welcome " + username + "!") : "No se inició sesión."}
      <DateTable list={list} username={username} />
    </Card.Body>
    </>
  );
};

export default Home;
