import {IoIosRefresh} from 'react-icons/io';
import {FaFilter} from 'react-icons/fa';
import classes from '../styles/refreshFilterBlock.module.scss';

const RefreshFilterBlock = () => {

  return(
      <div className={classes['refresh-filter-block'] }>
            <div className={classes['container']}>
                <div className={classes['refresh']}>
                    <IoIosRefresh style={{color: '#3B73C2'}}/>
                    <span>Refresh</span>
                </div>

                <div className={classes['filter']}>
                    <FaFilter style={{color: '#3B73C2'}}/>
                    <span>Filters</span>
                </div>
            </div>
      </div>
  );
};

export default RefreshFilterBlock;
