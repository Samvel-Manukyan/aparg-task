import {BiCaretDown} from 'react-icons/bi';

import classes from './index.module.scss';

const Header = () => {
    return(
        <div className={classes['header']}>
            <div className={classes['container']}>
                <img
                    className={classes['header-logo']}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyU7u8vUH0VffdBzAU9RM-KA1UcKu2HoDS9E0RMFzNAsw2VwHivS2UyNBt6bYJW0rhlt8&usqp=CAU"
                    alt="city_falcon.jpg"
                />
                <div className={classes['profile']}>
                    <img
                        className={classes['header-icon']}
                        src="https://cdn.iconscout.com/icon/free/png-256/business-woman-1890829-1601135.png"
                        alt="icon.png"
                    />

                    <BiCaretDown/>
                </div>
            </div>
        </div>
    );
}

export default Header;
