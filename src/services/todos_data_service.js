import axios from "axios";

// host url pythonanywhere server
const TODOS_HOST = "https://derrickyrd.pythonanywhere.com/";
// const TODOS_HOST = "http://localhost:8000/";

class TodoDataService {
  setAxiosDefaultHeaders_Authorizaion_Token(token) {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
  }
  // get the url to request
  url_to_request(suffix_path) {
    return `${TODOS_HOST}${suffix_path}`;
  }
  getAll(token) {
    this.setAxiosDefaultHeaders_Authorizaion_Token(token);
    return axios.get(this.url_to_request("api/todos/"));
  }

  createTodo(data, token) {
    this.setAxiosDefaultHeaders_Authorizaion_Token(token);
    return axios.post(this.url_to_request("api/todos/"), data);
  }

  updateTodo(id, data, token) {
    this.setAxiosDefaultHeaders_Authorizaion_Token(token);
    return axios.put(this.url_to_request(`api/todos/${id}`), data);
  }

  deleteTodo(id, token) {
    this.setAxiosDefaultHeaders_Authorizaion_Token(token);
    return axios.delete(this.url_to_request(`api/todos/${id}`));
  }

  completeTodo(id, token) {
    this.setAxiosDefaultHeaders_Authorizaion_Token(token);
    return axios.put(this.url_to_request(`api/todos/${id}/complete`));
  }

  login(data) {
    return axios.post(this.url_to_request("api/login/"), data);
  }

  signup(data) {
    return axios.post(this.url_to_request("api/signup/"), data);
  }
}

export default new TodoDataService();
