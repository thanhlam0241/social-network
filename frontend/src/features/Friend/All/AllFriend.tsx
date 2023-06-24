import styles from './AllFriend.module.scss'
import classNames from 'classnames/bind'

import MyFriendCard from '~/components/components/Friend/MyFriend'

import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

import { getMyFriend } from '~/service/api/people/peopleApi'

import { useAppSelector } from '~/hooks/storeHook'

const cx = classNames.bind(styles)

const data = [
  {
    id: 1,
    name: 'Kiana',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPmtd-paQ6KhbvekhRReSOfVKjV5kzV2M6sKpElfhsxrTcbP11Y4AzB1LIXOAoKvOLsbE&usqp=CAU',
    title: 'Developer'
  },
  {
    id: 2,
    name: 'Eula',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbA4G7O0mj2UY7Owj3DjOfwF951gPd7HlEQhqytjEvoA&s'
  },
  {
    id: 3,
    name: 'Raiden shogun',
    avatar: 'https://i.redd.it/l6odlw7t1ol71.jpg'
  },
  {
    id: 4,
    name: 'Kokomi',
    avatar: 'https://avatars.githubusercontent.com/u/102026640?v=4'
  }
]

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
            <li key={item._id}>
              <MyFriendCard name={item?.userInformation?.fullName} image={item?.userInformation?.avatar} />
            </li>
          ))}
      </ul>
    </main>
  )
}

export default AllFriend
