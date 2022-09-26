import classes from './index.module.scss';
import RefreshFilterBlock from './components/RefreshFilterBlock';
import Stories from './components/Stories';
import {createContext, useState} from 'react';

export const Context = createContext('');

const HomePage = () => {
    const [stories, setStories] = useState([]);

    return(
        <div className={classes['hom-page']}>
            <div style={{marginTop: 70, marginLeft: 100, padding: '0 0 30px 0'}}>
                <Context.Provider value={[stories, setStories]}>
                    <RefreshFilterBlock/>
                    <Stories/>
                </Context.Provider>
            </div>
        </div>
    );
};

export default HomePage;
