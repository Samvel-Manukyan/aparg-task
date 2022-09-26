import classes from '../styles/stories.module.scss';
import {useContext, useState} from 'react';
import {BiChevronDown} from 'react-icons/bi';
import {Context} from '../index';

const Stories = () => {
    const [stories, setStories] = useContext(Context);
    const [openText, setOpenText] = useState('');

    const onOpen = (index) => {
        setOpenText(index);

        if (openText === index) {
            setOpenText('');
        }
    };

   return(
       <div
           className={classes['stories']}
       >
           {
               stories?.map((item, index) => {
                   return(
                       <div
                           key={index}
                           className={classes['card']}
                       >
                           <div className={classes['img-block']}>
                               <img src={item?.domain_cached_large_logo_url} alt="logo"/>
                           </div>

                           <div className={classes['text-block']}>
                               <div>
                                   <span className={classes['text-block-title']}>{item?.title}</span>
                               </div>

                               {
                                   <span
                                       className={classes[openText === index + 1 ? 'open' : 'close']}
                                   >
                                       {item?.description}
                                   </span>
                               }
                           </div>

                           <div className={classes['percent-icon']}>
                               <div className={classes['percent']}>
                                   {item.score}%
                               </div>

                               <BiChevronDown
                                   className={classes[openText === index + 1 ? 'rotate-icon' : 'icon']}
                                   onClick={() => {
                                       onOpen(index+1);
                                   }}
                               />
                           </div>
                       </div>
                   );
               })
           }
       </div>
   );
};

export default Stories;
