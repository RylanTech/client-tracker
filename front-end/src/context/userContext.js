import axios from "axios";
import { createContext } from "react";

export const UserContext = createContext()
// let baseUrl = "http://localhost:3001/"
let baseUrl = "http://192.168.1.2:3001/"

export const UserProvider = (props) => {
  
  function signInUser(email, password) {
    let user = { email, password };

    return axios.post(baseUrl + "api/user/signin", user)
      .then(response => {
        localStorage.setItem('CTLogin', response.data)
        return new Promise(resolve => resolve(response.data));
      }
      );
  }

  function createUser(email, password) {
    let user = { email, password };

    return axios.post(baseUrl + "api/user/", user)
      .then(response => {
        localStorage.setItem('CTLogin', response.data)
        return new Promise(resolve => resolve(response.data));
      }
      );
  }

  function verify() {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
    };
    return axios.post(baseUrl + "api/verify", null, {
      headers: myHeaders
    }).then(response => {
        return new Promise(resolve => resolve(response.data));
      })
  }

  return (
    <UserContext.Provider
      value={{
        signInUser,
        createUser,
        verify
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}