//for setting up base axios client
import axios from 'axios'



export const dndcharactertrackerClient = axios.create({
    baseURL: 'http://localhost:2020',
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})