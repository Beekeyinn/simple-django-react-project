import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}products`, { method: "GET" })
    .then((res) => {
      console.log(res.json);
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
