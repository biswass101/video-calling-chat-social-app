import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../modules/users/models/User.model";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}