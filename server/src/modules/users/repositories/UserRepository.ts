import { IRepository } from "../../../core/repositories/BaseRepository";
import { IUser, UserModel } from "../models/User.Model";

export class UserRepository implements IRepository<IUser> {
 private userModel: UserModel;
 
 constructor() {
   this.userModel = new UserModel();
 }

  async create(user: IUser): Promise<IUser> {
    return await this.userModel.model.create(user);
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.model.find();
  }

  async findRecommended(currUserId: string, currentUser: IUser) {
    return await this.userModel.model.find({
      $and: [
        {_id: {$ne: currUserId}},
        {_id: {$nin: currentUser.friends}},
        {isOnboarded: true}
      ]
    })
  }

  async findFriends(currUserId: string) {
    return await this.userModel.model.findById(currUserId)
      .select("friends")
      .populate("friends", "fullName profilePic nativeLanguage learningLanguage")
  }

  async findById(id: string): Promise<IUser | null> {
    return await this.userModel.model.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userModel.model.findOne({ email });
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await this.userModel.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return await this.userModel.model.findByIdAndDelete(id);
  }
}