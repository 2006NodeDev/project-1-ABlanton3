import { HttpError } from "./HttpError";

export class CharacterNotFoundError extends HttpError {
    constructor(){
        super(404, 'Character Not Found')
    }
}