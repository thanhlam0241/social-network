import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ListConservationState, Conversation } from '~/service/interface/chat'

const initialState: ListConservationState = {
  listConversation: [],
  currentConversation: {
    id: '',
    name: '',
    avatar: '',
    lastMessage: {
      id: '',
      content: '',
      sender: '',
      time: null
    }
  }
}

export const listConservationSlice = createSlice({
  name: 'listConservation',
  initialState,
  reducers: {
    addListConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.listConversation = state.listConversation.concat(action.payload)
    },
    setCurrentConversation: (state, action: PayloadAction<Conversation>) => {
      state.currentConversation = action.payload
    }
  }
})

export const { addListConversations, setCurrentConversation } = listConservationSlice.actions

export default listConservationSlice.reducer
