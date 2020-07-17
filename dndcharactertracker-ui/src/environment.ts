


export let dndBaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    dndBaseUrl = 'http://35.237.5.242'
} else{
    dndBaseUrl = 'http://localhost:2020'
}