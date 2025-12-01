import { StreamChat } from "stream-chat";
import { EnvConfig } from "../../../config/env.config";
import { IUser } from "../../users/models/User.Model";
import { Types } from "mongoose";

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

    }
}