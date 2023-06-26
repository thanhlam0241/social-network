import styles from './AllFriend.module.scss'
import classNames from 'classnames/bind'

import MyFriendCard from '~/components/components/Friend/MyFriend'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getMyFriend } from '~/service/api/people/peopleApi'

import { useAppSelector } from '~/hooks/storeHook'

const cx = classNames.bind(styles)

function AllFriend() {
  const auth: any = useAppSelector((state) => state.auth)

  const queryClient = useQueryClient()

  const {
    data: allFriend,
    isLoading,
    error
  } = useQuery({
    queryKey: ['getAllFriend'],
    queryFn: () => getMyFriend(auth.token, 1),
    refetchOnWindowFocus: false
  })

  console.log(allFriend?.data)

  return (
    <main className={cx('friend-all')}>
      <h2>Your friends</h2>
      <ul className={cx('friend-all-content')}>
        {allFriend?.data?.length > 0 &&
          allFriend?.data.map((item: any) => (
            <MyFriendCard key={item._id} name={item?.userInformation?.fullName} image={item?.userInformation?.avatar} />
            // <li key={item._id}>
            // </li>
          ))}
      </ul>
    </main>
  )
}

export default AllFriend
