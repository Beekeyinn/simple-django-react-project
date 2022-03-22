import { API } from "../../backend";
import { emptyCart } from "../../core/helper/CartHelper";

export const register = (user) => {
  console.log(user);
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Media-Type":"application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const logOut = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    emptyCart();
    return fetch(`${API}user/${userId}/logout/`, {
      method: "GET",
    })
      .then((res) => {
        if (res.status === 404) {
          throw new Error("Woops, Page cannot be Found");
        } else {
          console.log(res.status);
          console.log("Sign out Success");
          next();
          console.log("run it");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
