// const baseUrl = 'http://localhost:3500'
const baseUrl = '/api'
export const AccountLoginUrl = baseUrl + '/login'
export const AccountLoginWithFaceIdUrl = baseUrl + '/loginFaceid'
export const AccountRegisterUrl = baseUrl + '/register'
export const AccountLogoutUrl = baseUrl + '/logout'
export const AccountGetNewTokenUrl = baseUrl + '/refresh-token'

export const FaceDetectUrl = baseUrl + '/face/detect'

export const TodoGetAllUrl = baseUrl + '/todo'

//people api
export const PeopleUrl = baseUrl + '/social/people/'
export const MyAllFriendUrl = PeopleUrl + 'your-friend'
export const MyFriendRequestUrl = PeopleUrl + 'your-request-friend'
export const PeopleFriendRequestUrl = PeopleUrl + 'friend-request'
export const PeopleRecommendUrl = PeopleUrl + 'recommend-people'
export const AllRequestFriendUrl = PeopleUrl + 'all-friend-request'

//friend api
export const FriendUrl = baseUrl + '/social/friend/'
export const SendFriendRequestUrl = FriendUrl + 'send-friend-request'
export const AcceptFriendRequestUrl = FriendUrl + 'accept-send-friend-request'
export const RejectFriendRequestUrl = FriendUrl + 'reject-send-friend-request'
export const CancelFriendRequestUrl = FriendUrl + 'cancel-my-request-friend'

//chat api
export const ConversationUrl = baseUrl + '/chat/conversation/'
export const ConversationForUser = ConversationUrl + 'user/'
export const MessageUrl = baseUrl + '/chat/message/'
