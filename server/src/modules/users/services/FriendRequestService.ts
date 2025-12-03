import { FriendRequestRepository } from "../repositories/FriendRequestRepository";
import httpStatus from "http-status";
import ApiError from "../../../shared/utils/errors/apiError";
import { UserRepository } from "../repositories/UserRepository";
import { FriendReqEnum } from "../enums/friendRequest.enum";

export class FriendRequestService {

    private friendRequestRepo = new FriendRequestRepository();
    private userRepo = new UserRepository();

    async getReqeusts () {
        
    }

    async sendReqeust(myId: string, recipientId: string) {
    if (myId === recipientId) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You can't send friend request to yourself"
      );
    }

    const recipent = await this.userRepo.findById(recipientId);
    if (!recipent) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Recipient not found"
      );
    }

    if(recipent.friends.includes(myId as string)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "You are already friends with this user"
      );
    }

    const existingRequest = await this.friendRequestRepo.findRequest(myId, recipientId)
    if(existingRequest) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "A friend request already exits between you and this user"
      );
    }

    const friendRequest = await this.friendRequestRepo.createRequest(myId, recipientId);
    return friendRequest;
  }

  async acceptRequest (currUserId: string, requestId: string) {
    const friendRequest = await this.friendRequestRepo.findById(requestId);
    if(!friendRequest) throw new ApiError(
        httpStatus.NOT_FOUND, "Friend request not found"
    )

    if(friendRequest.recipient_id.toString() !== currUserId) {
        throw new ApiError(
            httpStatus.FORBIDDEN, 
            "You are not authorized to accept this request"
        )
    }

    await this.friendRequestRepo.updateRequestStatus(
        requestId, FriendReqEnum.ACCEPTED
    )

    // friend -1
    await this.userRepo.updateFriendList(
        friendRequest.sender_id as string, 
        friendRequest.recipient_id as string
    )

    // friend -2
    await this.userRepo.updateFriendList(
        friendRequest.recipient_id as string,
        friendRequest.sender_id as string
    )

    return friendRequest;
  }

}