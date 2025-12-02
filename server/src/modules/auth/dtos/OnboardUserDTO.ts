import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class OnboardUserDTO {
  @IsNotEmpty({ message: "Full Name is required" })
  @IsString({ message: "Full Name must be a string" })
  fullName: string;

  @IsNotEmpty({ message: "Bio is required" })
  @IsString({ message: "Bio must be a string" })
  bio: string;

  @IsNotEmpty({ message: "Native Language is required" })
  @IsString({ message: "Native Language must be a string" })
  nativeLanguage: string;

  @IsNotEmpty({message: "Learning Language is required"})
  @IsString({ message: "Learning Language must be a string" })
  learningLanguage: string;

  @IsNotEmpty({message: "Region is required"})
  @IsString({ message: "Region must be a string" })
  region: string;
}
