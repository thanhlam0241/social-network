export interface Message {
  id: string
  content: string
  sender: string
  time: Date | null
}

export interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: Message | null
}
export interface UserInfor {
  id: string
  first_name: string
  last_name: string
  avatar: string
}
export interface User {
  id: string
  name: string
  avatar: string
  userInformation: UserInfor
}

export interface ListConservationState {
  listConversation: Conversation[]
  currentConversation: Conversation
}
