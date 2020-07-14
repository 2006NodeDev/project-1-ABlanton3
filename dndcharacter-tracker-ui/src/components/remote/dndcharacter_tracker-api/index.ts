//for setting up base axios client
import axios from 'axios'



export const dndcharacter_teackerClient = axios.create({
    baseURL: 'http://localhost:2020',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})