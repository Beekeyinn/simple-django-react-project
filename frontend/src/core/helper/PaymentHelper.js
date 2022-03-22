import { API } from "../../backend";

export const getMeToken = (userId, token) => {
  return fetch(`${API}payments/gettoken/${userId}/${token}/`, { method: "GET" })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
};

export const processPayment = (userId, token, paymentInfo) => {
  const formData = new FormData();
  for (const name in paymentInfo) {
    formData.append(name, paymentInfo[name]);
  }
  return fetch(`${API}payments/processpayment/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
};
