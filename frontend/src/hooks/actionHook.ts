import { setAuth } from '~/service/redux/slice/authSlice'

import { addListConversations, setCurrentConversation } from '~/service/redux/slice/listConservationSlice'

const actionHook = {
  auth: {
    setAuth
  },
  listConversation: {
    addListConversations,
    setCurrentConversation
  }
}

export function useActionHook(name: 'auth' | 'listConversation') {
  return actionHook[name]
}
