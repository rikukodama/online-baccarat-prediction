import axios, { AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import store from "../redux/store";
import { logOut } from "../redux/userSlice";
// import { NotificationManager } from "react-notifications";

const checkAuth = (): string | void => {
  const TOKEN = localStorage.getItem("token");
  const PUBLIC_ROUTES = [
    "login",
    "forgot-password",
    "register",
    "documentation",
  ];

  const isPublicPage = PUBLIC_ROUTES.some((route) =>
    window.location.href.includes(route)
  );

  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      // Show global loading indicator (optional)
      // document.body.classList.add("loading-indicator");
      return config;
    },
    (error: AxiosError) => {
      // NotificationManager.error(error.message, 'Error');
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      // Hide global loading indicator (optional)
      // document.body.classList.remove("loading-indicator");
      return response;
    },
    (error: AxiosError) => {
      // document.body.classList.remove("loading-indicator");
      if (error.response?.status === 401) {
        store.dispatch(logOut());
      }
      return Promise.reject(error);
    }
  );

  if (!TOKEN && !isPublicPage) {
    // navigate('/login');
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `${TOKEN}`;
    return TOKEN;
  }
};

export default checkAuth;
