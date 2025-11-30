import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsOptional()
  @IsEmail({}, { message: "Email must be valid" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsOptional()
  @MinLength(6, { message: "Password must be at least 6 characters" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @IsOptional({ message: "Image must be in string" })
  img: string;

  @IsOptional({ message: "Designation must be in string" })
  designation: string;

  @IsOptional({ message: "Summary must be in string" })
  summary: string;
}