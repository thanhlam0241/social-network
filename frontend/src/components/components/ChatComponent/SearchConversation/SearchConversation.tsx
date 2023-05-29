import styles from './SearchConversation.module.scss'
import classNames from 'classnames/bind'
import SearchIcon from '@mui/icons-material/Search'
const cx = classNames.bind(styles)

interface SearchBoxProps {
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.toLocaleLowerCase())
  }
  return (
    <section className={cx('search_box')}>
      <input
        onChange={handleChange}
        type='text'
        placeholder='Tìm kiếm trên Messenger'
        className={cx('search_box__input')}
      />
      <span className={cx('search_icon')}>
        <SearchIcon />
      </span>
    </section>
  )
}
