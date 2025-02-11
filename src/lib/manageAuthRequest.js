import connection from "./connection";
import { navigate } from "svelte-routing";

const postTo = async (path, data) => {
  try {
    const response = await connection.post(path, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    navigate("/login");
    throw error;
  }
}

const getFrom = async (path) => {
  try {
    const response = await connection.get(path);
    return response;
  } catch (error) {
    navigate("/login");
    throw error;
  }
}

const deleteFrom = async (path) => {
  try {
    const response = await connection.delete(path);
    return response;
  } catch (error) {
    navigate("/login");
    throw error;
  }
}

const putTo = async (path, data) => {
  try {
    const response = await connection.put(path, data);
    return response;
  } catch (error) {
    navigate("/login");
    throw error;
  }
}

export { postTo, getFrom, deleteFrom, putTo };