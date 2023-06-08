import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImportExportIcon from '@mui/icons-material/ImportExport';

import styles from './headerApp.module.scss';

import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface HeaderAppProps {
  iconTitle: any;
  title: string;
}

function HeaderApp({ title, iconTitle }: HeaderAppProps) {
  return (
    <div className={cx('header-main')}>
      <div className={cx('title-main-left')}>
        {iconTitle}
        <h2>{title}</h2>
        <button className={cx('button_show-option')}>
          <MoreHorizIcon />
        </button>
      </div>
      <div className={cx('title-main-right')}>
        <ImportExportIcon />
        Sort
      </div>
    </div>
  );
}

export default HeaderApp;
