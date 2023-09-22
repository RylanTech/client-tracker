import axios from "axios";
import { createContext } from "react";

export const GigContext = createContext()
let baseUrl = "http://localhost:3001/"
// let baseUrl = "http://192.168.1.2:3001/"

export const GigProvider = (props) => {

    function addGig(gig) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.post(baseUrl + "api/gig/add-gig", gig, {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function getGig(id) {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.get(baseUrl + `api/gig/${id}`, {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    function getGigs() {
        let myHeaders = {
            Authorization: `Bearer ${localStorage.getItem('CTLogin')}`
        };

        return axios.get(baseUrl + "api/gig/", {headers: myHeaders})
        .then(response => {
            return new Promise(resolve => resolve(response.data))
        })
    }

    return (
        <GigContext.Provider
            value={{
                addGig,
                getGig,
                getGigs
            }}
        >
            {props.children}
        </GigContext.Provider>
    )
}