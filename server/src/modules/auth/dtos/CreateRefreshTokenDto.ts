import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateRefreshTokenDto {
    @IsNotEmpty({message: "User ID is required"})
    userId: string;

    @IsNotEmpty({message: "Token hash is required"})
    tokenHash: string;

    @IsOptional()
    userAgent?: string;

    @IsOptional()
    ipAddress?: string;

    @IsNotEmpty({message: "Expiration date is required"})
    expiresAt: Date;
}