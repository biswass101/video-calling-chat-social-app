import { IUser } from "../models/User.model";

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
           isOnBoarded: user.isOnboarded,
           _id: user._id,
           friends: user.friends,
           createdAt: user.createdAt,
           updatedAt: user.updatedAt,
        }
    }
}