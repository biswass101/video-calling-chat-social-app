import { IUser } from "../models/User.Model";

export class UserFactory {
    toResponse(user: IUser) {
        return {
           fullName: user.fullName,
           email: user.email,
           profilePic: user.profilePic,
           bio: user.bio,
           nativeLanguage: user.nativeLanguage,
           isOnBoarding: user.isOnBoarding,
           _id: user._id,
           friends: user.friends,
           token: "",
           createdAt: user.createdAt,
           updatedAt: user.updatedAt,
        }
    }
}