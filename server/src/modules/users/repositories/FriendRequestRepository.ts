import { FriendRequestModel } from "../models/FriendRequest.model"

export class FriendRequestRepository {

    private friendRequestModel = new FriendRequestModel();

    async findRequest (myId: string, recipientId: string) {
        return await this.friendRequestModel.model.findOne({
            $or: [
                { sender_id: myId, recipient_id: recipientId },
                { sender_id: recipientId, recipient_id: myId}
            ]
        })
    }

    async createRequest (myId: string, recipientId: string) {
        return await this.friendRequestModel.model.create({
            sender_id: myId,
            recipient_id: recipientId
        })
    }
}