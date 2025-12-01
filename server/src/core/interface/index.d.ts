import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../../modules/users/models/User.Model";

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}