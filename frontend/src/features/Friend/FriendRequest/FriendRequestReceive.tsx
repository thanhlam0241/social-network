import styles from './FriendRequest.module.scss'
import classNames from 'classnames/bind'

import FriendRequest from '~/components/components/Friend/FriendRequest'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getPeopleFriendRequest, acceptFriendRequest, rejectFriendRequest } from '~/service/api/people/peopleApi'

import { useAppSelector } from '~/hooks/storeHook'

const cx = classNames.bind(styles)

function FriendRequestPage() {
  const auth = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const {
    data: dataFriendRequest,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getPeopleFriendRequest'],
    queryFn: () => getPeopleFriendRequest(auth.token, 1),
    refetchOnWindowFocus: false
  })

  const acceptFriendRequestMutation = useMutation({
    mutationFn: (id: string) => acceptFriendRequest(auth.token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['getPeopleFriendRequest'])
    }
  })

  const rejectFriendRequestMutation = useMutation({
    mutationFn: (id: string) => rejectFriendRequest(auth.token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['getPeopleFriendRequest'])
    }
  })

  console.log(dataFriendRequest?.data)

  return (
    <main className={cx('friend-request')}>
      <h2>Friend requests to you</h2>
      <ul className={cx('friend-request-content')}>
        {!isLoading &&
          !error &&
          dataFriendRequest?.data?.length > 0 &&
          dataFriendRequest.data.map((item: any) => (
            <FriendRequest
              key={item?.sender?._id}
              type='receive'
              name={item?.sender?.username}
              avatar={item?.sender?.userInformation?.avatar}
              title={item?.text}
              onAccept={() => acceptFriendRequestMutation.mutate(item?.sender?._id)}
              onReject={() => rejectFriendRequestMutation.mutate(item?.sender?._id)}
            />
          ))}
      </ul>
    </main>
  )
}

export default FriendRequestPage
