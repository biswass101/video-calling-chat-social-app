import { IsArray, IsBoolean, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDTO  {
  @IsNotEmpty({ message: "Full Name is required" })
  @IsString({ message: "Full Name must be a string"})
  fullName: string;

  @IsEmail({}, { message: "Email must be valid" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @MinLength(6, { message: "Password must be at least 6 characters" })
  @IsNotEmpty({ message: "Password is required" })
  @IsString({ message: "Password must be a string"})
  password: string;


  @IsOptional()
  @IsString({ message: "Profile Picture must be a string"})
  profilePic: string;

  @IsOptional()
  @IsString({ message: "Bio must be a string"})
  bio: string;

  @IsOptional()
  @IsString({ message: "Native Language must be a string"})
  nativeLanguage: string;
  
  @IsOptional()
  @IsBoolean({ message: "isOnBoarding must be a boolean"})
  isOnBoarding: boolean;

  @IsOptional()
  @IsArray({ message: "Friends must be an array"})
  @IsMongoId({ each: true, message: "Each friend ID must be a valid Mongo ID"})
  friends: Types.ObjectId[];
}