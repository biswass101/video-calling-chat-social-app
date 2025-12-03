import { FriendRequestModel } from "../models/FriendRequest.model";

export class FriendRequestRepository {
  private friendRequestModel = new FriendRequestModel();

  async findById(id: string) {
    return await this.friendRequestModel.model.findById(id);
  }

  async findManyRequest(myId: string, status: {accecpted: string , pending: string}) {
    const incomingReqs =  await this.friendRequestModel.model.find(
        {
            recipient_id: myId,
            status: status.pending
        }
    ).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await this.friendRequestModel.model.find(
      {
        sender_id: myId,
        status: status.accecpted
      }
    ).populate("recipient", "fullName profilePic");

    return {incomingReqs, acceptedReqs};
  }


  async findOutgoingRequests (myId: string) {
    return await this.friendRequestModel.model.find(
      {
        sender_id: myId,
        status: "pending"
      }
    ).populate("recipent", "fullName profilePic nativeLanguage learningLanguage")
  }

  async findRequest(myId: string, recipientId: string) {
    return await this.friendRequestModel.model.findOne({
      $or: [
        { sender_id: myId, recipient_id: recipientId },
        { sender_id: recipientId, recipient_id: myId },
      ],
    });
  }

  async createRequest(myId: string, recipientId: string) {
    return await this.friendRequestModel.model.create({
      sender_id: myId,
      recipient_id: recipientId,
    });
  }

  async updateRequestStatus(id: string, status: "accepted" | "pending") {
    return await this.friendRequestModel.model.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}
