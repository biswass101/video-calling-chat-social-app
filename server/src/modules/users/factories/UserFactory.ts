import { IUser } from "../models/User.Model";

export class UserFactory {
    toResponse(user: Partial<IUser>) {
        return {
           fullName: user.fullName,
           email: user.email,
           profilePic: user.profilePic,
           bio: user.bio,
           nativeLanguage: user.nativeLanguage,
           learningLanguage: user.learningLanguage,
           region: user.region,
           isOnBoarding: user.isOnBoarding,
           _id: user._id,
           friends: user.friends,
           createdAt: user.createdAt,
           updatedAt: user.updatedAt,
        }
    }
}