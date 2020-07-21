


export let dndBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    dndBaseUrl = 'http://34.120.147.114'
} else{
    dndBaseUrl = 'http://localhost:2020'
}