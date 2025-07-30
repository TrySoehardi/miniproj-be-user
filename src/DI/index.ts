import { IDI } from "../interface/Idi";
import { AuthenticationService } from "../services/authenticationService";

export const theDi: IDI = {
    authenticationService: undefined
}

theDi.authenticationService = new AuthenticationService(theDi)