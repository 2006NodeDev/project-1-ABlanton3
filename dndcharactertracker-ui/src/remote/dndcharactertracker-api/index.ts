//for setting up base axios client
import axios from 'axios'
import { dndBaseUrl } from '../../environment'



export const dndcharactertrackerClient = axios.create({
    baseURL: dndBaseUrl,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials:true
})