/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { showAlert } from "./alert";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "post",
      url: "/users/signup",
      data: { name, email, password, passwordConfirm },
    });
    if (res.data.status === "success") {
      showAlert("success", "sign up success! please check your email");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
    console.log(err.response.data.message);
  }
};
