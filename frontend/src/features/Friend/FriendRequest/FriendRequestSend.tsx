import styles from './FriendRequest.module.scss'
import classNames from 'classnames/bind'

import FriendRequest from '~/components/components/Friend/FriendRequest'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { cancelFriendRequest, getMyFriendRequest } from '~/service/api/people/peopleApi'

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
    queryKey: ['getMyFriendRequest'],
    queryFn: () => getMyFriendRequest(auth.token, 1),
    refetchOnWindowFocus: false
  })

  console.log(dataFriendRequest?.data)

  const cancelFriendRequestMutation = useMutation({
    mutationFn: (id: string) => cancelFriendRequest(auth.token, id),
    onSuccess: () => {
      queryClient.invalidateQueries(['getMyFriendRequest'])
    }
  })
  return (
    <main className={cx('friend-request')}>
      <h2>Friend requests to you</h2>
      <ul className={cx('friend-request-content')}>
        {dataFriendRequest?.data?.length > 0 &&
          dataFriendRequest?.data.map((item: any) => (
            <FriendRequest
              type='send'
              key={item?.receiver?._id}
              name={item?.receiver?.username}
              avatar={item?.receiver?.userInformation?.avatar}
              title={item?.text}
              onCancel={() => cancelFriendRequestMutation.mutate(item?.receiver?._id)}
            />
          ))}
      </ul>
    </main>
  )
}

export default FriendRequestPage
