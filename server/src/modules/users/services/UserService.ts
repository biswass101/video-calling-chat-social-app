import { UserRepository } from "../repositories/UserRepository";
import ApiError from "../../../shared/utils/errors/apiError";
import httpStatus from "http-status";
import { HashService } from "../../../core/utils/hash.service";
import { IUser } from "../models/User.Model";
import { UserFactory } from "../factories/UserFactory";
import { RandomGenerator } from "../../../shared/utils/random/RandomGenerator";
import { EnvConfig } from "../../../config/env.config";
import { JwtService } from "../../../core/utils/jwt.service";

export class UserService {
    private userRepo: UserRepository;
    private hashService: HashService;
    private userFactory: UserFactory;
    private randomGenerator: RandomGenerator;
    private envConfig: EnvConfig;
    private jwtService: JwtService;
    
  constructor() {
    this.userRepo = new UserRepository();
    this.hashService = new HashService();
    this.userFactory = new UserFactory();
    this.randomGenerator = new RandomGenerator();
    this.envConfig = new EnvConfig();
    this.jwtService = new JwtService();
  }

  async createUser(user: IUser) {
    const isExists = await this.userRepo.findByEmail(user.email);
    if(isExists) throw new ApiError(
      httpStatus.CONFLICT, 
      "Email already exists, please use a different email"
    );

    const hashed = await this.hashService.hash(user.password);
    user.password = hashed

    const idx = this.randomGenerator.generateRandomNumber(1, 100);
    const randomAvatarUrl = `${this.envConfig.getAvatarConfig().url}/${idx}.png`;
    user.profilePic = randomAvatarUrl;

    const result = await this.userRepo.create(user);

    // TODO: create the user in stream as well
    
    const token = this.jwtService.sign(
      { userId: result._id?.toString() as string },
      {
        secret: this.envConfig.getJWTConfig().secret!,
        expiresIn: this.envConfig.getJWTConfig().expiresIn!
      }
    )
    result.token = token;
    return result;
  }

  async getAllUsers() {
    const result = await this.userRepo.findAll();
    return result.map(user => this.userFactory.toResponse(user));
  }

  async getUserById(id: string) {
    const isExists = await this.userRepo.findById(id)
    if(!isExists) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    const result = await this.userRepo.findById(id);
    return this.userFactory.toResponse(result!);
  }

  async getUserByEmail(email: string) {
    const result =  await this.userRepo.findByEmail(email);
    return result;
  }

  async updateUser(id: string, data: Partial<IUser>) {
    const result = await this.userRepo.update(id, data)
    return this.userFactory.toResponse(result!);
  }

  async deleteUser(id: string) {
    const result =  await this.userRepo.delete(id);
    return this.userFactory.toResponse(result!);
  }
}