import axios from "axios";
import { createContext } from "react";

export const ClientContext = createContext()
let baseUrl = "http://localhost:3001/"

export const ClientProvider = (props) => {

    function addClient(client) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.post(baseUrl + "api/client/add-client", client, {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function getClients() {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.get(baseUrl + `api/client/`, {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function getClient(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.get(baseUrl + `api/client/${id}`, {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    return (
        <ClientContext.Provider
            value={{
                addClient,
                getClient,
                getClients
            }}
        >
            {props.children}
        </ClientContext.Provider>
    )
}