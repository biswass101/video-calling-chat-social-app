import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface IJwtConfig {
  secret: string;
  expiresIn: string;
}

interface IMyJwtPayload { 
    userId: string | Types.ObjectId; 
    [key : string] : any
};

export class JwtService {
   
    sign(payload: IMyJwtPayload, options: IJwtConfig): string {
        return (jwt as any).sign(
            payload, 
            options.secret, 
            { 
                expiresIn: options.expiresIn
            }
        )
    }

    verify<T = any>(token: string, secret: string): T {
        return jwt.verify(token, secret) as T;
    }
}