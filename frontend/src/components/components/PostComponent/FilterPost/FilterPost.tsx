import styles from './FilterPost.module.scss'
import { useState } from 'react'

import classNames from 'classnames/bind'

import TuneIcon from '@mui/icons-material/Tune'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import ReorderIcon from '@mui/icons-material/Reorder'
import WindowIcon from '@mui/icons-material/Window'

const cx = classNames.bind(styles)

function FilterPost() {
  const [viewMode, setViewMode] = useState<number>(0)

  const handleViewModeList = () => {
    setViewMode(0)
  }

  const handleViewModeGrid = () => {
    setViewMode(1)
  }

  return (
    <section className={cx('filter-post')}>
      <section className={cx('manager-post')}>
        <h3>Post</h3>
        <section className={cx('action')}>
          <button className={cx('action-button')}>
            <TuneIcon /> Filter
          </button>
          <button className={cx('action-button')}>
            <SettingsSuggestIcon /> Manage
          </button>
        </section>
      </section>
      <hr />
      <section className={cx('view-mode-post')}>
        <button
          onClick={handleViewModeList}
          className={viewMode === 0 ? cx('view-mode-button', 'view-mode-button-active') : cx('view-mode-button')}
        >
          <ReorderIcon />
          View by list
        </button>
        <button
          onClick={handleViewModeGrid}
          className={viewMode === 1 ? cx('view-mode-button', 'view-mode-button-active') : cx('view-mode-button')}
        >
          <WindowIcon />
          Grid mode
        </button>
      </section>
    </section>
  )
}

export default FilterPost
