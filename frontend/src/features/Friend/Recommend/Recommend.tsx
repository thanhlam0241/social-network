import styles from './Recommend.module.scss'
import classNames from 'classnames/bind'
import { useState, useCallback } from 'react'
import FriendCard from '~/components/components/Friend/FriendCard'
import { Snackbar, Alert } from '@mui/material'

import SendFriendRequestForm from '~/components/components/Friend/SendRequestDialog'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getPeopleRecommend, sendFriendRequest, allFriendRequest } from '~/service/api/people/peopleApi'

import { useAppSelector } from '~/hooks/storeHook'

const cx = classNames.bind(styles)

function Recommend() {
  const auth: any = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const [idToSendFriendRequest, setIdToSendFriendRequest] = useState<string>('' as string)

  const [success, setSuccess] = useState(false)

  const [open, setOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['getPeopleRecommend'],
    queryFn: () => getPeopleRecommend(auth.token, 1),
    refetchOnWindowFocus: false
  })

  //console.log(data?.data)

  // const {
  //   data: myFriendRequest,
  //   isLoading: loadingMyFriendRequest,
  //   error: errorMyFriendRequest
  // } = useQuery({
  //   queryKey: ['getAllMyFriendRequest'],
  //   queryFn: () => allFriendRequest(auth.token),
  //   refetchOnWindowFocus: false
  // })

  const friendRequestMutation = useMutation({
    mutationFn: (newTodo: { receiver: string; text: string }) => {
      return sendFriendRequest(auth.token, newTodo)
    },
    onSuccess: () => {
      setSuccess(true)
      queryClient.invalidateQueries(['getAllMyFriendRequest'])
    },
    onError: (error) => {
      console.log(error)
    },
    onSettled: () => {
      //queryClient.invalidateQueries('getPeopleRecommend')
      setOpen(false)
    }
  })

  const startFriendRequest = (id: string) => {
    setIdToSendFriendRequest(id)
    setOpen(true)
  }

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setSuccess(false)
  }
  const handleSendFriendRequest = useCallback(
    (text: string) => {
      if (!idToSendFriendRequest && !friendRequestMutation) return
      friendRequestMutation.mutate({ receiver: idToSendFriendRequest, text: text })
    },
    [friendRequestMutation, idToSendFriendRequest]
  )
  return (
    <main className={cx('friend-recommend')}>
      <Snackbar open={success} autoHideDuration={2000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity='success' sx={{ width: '100%' }}>
          Send friend request successfully
        </Alert>
      </Snackbar>
      <SendFriendRequestForm onSend={handleSendFriendRequest} open={open} handleClose={() => setOpen(false)} />
      <h2>Someone you can know</h2>
      <ul className={cx('friend-recommend-content')}>
        {!isLoading && !error && data?.data ? (
          data?.data.map((item: any) => (
            <li className={cx('friend-item')} key={item?._id}>
              <FriendCard
                onClick={() => startFriendRequest(item?._id)}
                id={item?._id}
                name={item?.username}
                avatar={item?.userInformation?.avatar}
                //isSend={myFriendRequest?.data?.includes(item._id)}
              />
            </li>
          ))
        ) : (
          <p>Loading</p>
        )}
      </ul>
    </main>
  )
}

export default Recommend
