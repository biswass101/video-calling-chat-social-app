import { StreamChat } from "stream-chat";
import { EnvConfig } from "../../../config/env.config";
import { IUser } from "../../users/models/User.model";
import { Types } from "mongoose";
import ApiError from "../../../shared/utils/errors/apiError";
import httpStatus from 'http-status';

export class StreamService {
    private envConfig = new EnvConfig();
    streamClient: StreamChat;
    constructor() {
        this.streamClient = StreamChat.getInstance(
            this.envConfig.getStreamConfig().apiKey!, 
            this.envConfig.getStreamConfig().secret!
        )
    }

    async upsertStreamUser (userData: Partial<IUser>) {
        try {
            await this.streamClient.upsertUsers([{...userData, id: userData._id?.toString()as string}])
            return userData;
        } catch (error) {
            console.error("Error upserting Stream user:", error);
        }
    }

    // Todo: do it later
    async generateStreamToken (userId: string | Types.ObjectId) {
        const userIdStr = userId.toString();
        const token = this.streamClient.createToken(userIdStr);
        if(!token) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Error generating token")
        return token;
    }
}