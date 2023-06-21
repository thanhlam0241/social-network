import styles from './AddPost.module.scss'
import classNames from 'classnames/bind'
import CollectionsIcon from '@mui/icons-material/Collections'
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack'
import CelebrationIcon from '@mui/icons-material/Celebration'
const cx = classNames.bind(styles)

function AddPost() {
  return (
    <section className={cx('add-post')}>
      <section className={cx('text-area')}>What are you thinking ?</section>
      <section className={cx('media-area')}>
        <button className={cx('button-add-post')}>
          <CollectionsIcon color='success' />
          Image
        </button>
        <button className={cx('button-add-post')}>
          <VideoCameraBackIcon sx={{ color: 'var(--primary)' }} />
          Video
        </button>
        <button className={cx('button-add-post')}>
          <CelebrationIcon color='primary' />
          Event
        </button>
      </section>
    </section>
  )
}

export default AddPost
