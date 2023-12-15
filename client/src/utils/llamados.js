import axios from "axios";

const url = "http://localhost:3000";

const fetchPostDataByID = async (id) => {
  const endpoint = `${url}/post/${id}`;

  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const fetchCommentsByPostID = async (idPosteo) => {
  const endpoint = `${url}comments/${idPosteo}`;

  try {
    const response = await axios.get(endpoint);

    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export { fetchPostDataByID, fetchCommentsByPostID };
