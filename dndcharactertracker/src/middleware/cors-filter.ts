import { Request, Response, NextFunction } from "express";


export function corsFilter(req:Request, res:Response, next:NextFunction){
    
    res.header('Access-Control-Allow-Origin', `${req.headers.origin}`)//BAD figure out what to do instead
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization')
    res.header('Access-Control-Expose-Headers', 'Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')


    if(req.method === 'OPTIONS'){
        res.sendStatus(200)
    } else {
        next()
    }

}

//dsa fjlglswerjfgkjalerjsfbwhy doesn't this woooooooork a,jshgltaekjf