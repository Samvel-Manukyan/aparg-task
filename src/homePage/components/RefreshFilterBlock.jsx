import {Context} from '../index';

import {IoIosRefresh} from 'react-icons/io';
import {FaFilter} from 'react-icons/fa';
import {BiCaretUp} from 'react-icons/bi';
import {useEffect, useState, useContext,useRef} from 'react';
import {BiChevronDown} from 'react-icons/bi';

import {REQUESTS} from '../../api/requests';

import classes from '../styles/refreshFilterBlock.module.scss';

const RefreshFilterBlock = () => {
    const [stories, setStories] = useContext(Context);
    const [height, setHeightImg]=useState(46)
    const useBtnRefNav = useRef();
    const [page, setPage] = useState(20);
    const [open, setOpen] = useState(false);
    const [openAccordion, setOpenAccordion] = useState(0);

    const [checkedRefresh, setCheckedRefresh] = useState({
        checkedTenSeconds: false,
        checkedThirtySeconds: false,
        checkedOneMinutes: false,
        checkedTenMinutes: false,
        refresh: ''
    });

    const [checkedOrder, setCheckedOrder] = useState({
            checkedTopRated: false,
            checkedLatest: false,
            checkedMostRead: false,
            checkedPopular: false,
            order: ''
        },
    );

    const [checkedLanguage, setCheckedLanguage] = useState({
        checkedAll: false,
        checkedEnglish: false,
        checkedGerman: false,
        checkedChinese: false,
        checkedItalian: false,
        language: ''
    });

    document.body.onclick = () => {
        setOpenAccordion(0);
    }


    useEffect(() => {
        window.addEventListener("scroll", toggleButtonHandlerNav);

        return () => {
            clearInterval();
            window.removeEventListener("scroll", toggleButtonHandlerNav);
        };
    });

    const toggleButtonHandlerNav = () => {
        if ((useBtnRefNav.current.getBoundingClientRect().y *-1) >= height+900) {
            setHeightImg(height+900)
            setPage(page+20)
        }
    };

    const getStories = () => {
        const query = {
            limit: page,
            order: checkedOrder.order,
            refresh: checkedRefresh.refresh,
            language: checkedLanguage.language,
            page_token:"98807224-712f-4658-9d31-98f77773333"

        }

        function callback(data) {
            setStories(data.stories)
        }

        function errorCallback(error) {}

        REQUESTS.GET_STORIES(query, callback, errorCallback);
    };

    const onOpenAccordion = (number) => {
        setOpenAccordion(number);

        if (openAccordion === number) {
            setOpenAccordion(0);
        }
    };

    const onReset = () => {
        setCheckedOrder({
            checkedTopRated: false,
            checkedLatest: false,
            checkedMostRead: false,
            checkedPopular: false,
            order: ''
        });
        setCheckedRefresh({
            checkedTenSeconds: false,
            checkedThirtySeconds: false,
            checkedOneMinutes: false,
            checkedTenMinutes: false,
            refresh: ''
        });

        setCheckedLanguage({
            checkedAll: false,
            checkedEnglish: false,
            checkedGerman: false,
            checkedChinese: false,
            checkedItalian: false,
            language: ''
        });
    };

    useEffect(() => {
        getStories();
    }, [checkedOrder, page, checkedLanguage]);

    useEffect(() => {
        setInterval(() => {
            if (checkedRefresh.checkedTenSeconds
                || checkedRefresh.checkedThirtySeconds
                || checkedRefresh.checkedTenMinutes
                || checkedRefresh.checkedTenSeconds
            ) {
                getStories();
            }
        }, checkedRefresh.refresh)

        return () => clearInterval();
    }, [checkedRefresh]);

    return(
        <div className={classes['refresh-filter-block'] }
             ref={useBtnRefNav}
        >
            <div className={classes['container']} onClick={event => event.stopPropagation()}>
                <div className={classes['refresh-filter']}>
                    <div
                        onClick={() => {
                            setCheckedOrder({
                                checkedTopRated: false,
                                checkedLatest: false,
                                checkedMostRead: false,
                                checkedPopular: false,
                                order: ''
                            });
                            setCheckedRefresh({
                                checkedTenSeconds: false,
                                checkedThirtySeconds: false,
                                checkedOneMinutes: false,
                                checkedTenMinutes: false,
                                refresh: ''
                            });

                            setCheckedLanguage({
                                checkedAll: false,
                                checkedEnglish: false,
                                checkedGerman: false,
                                checkedChinese: false,
                                checkedItalian: false,
                                language: ''
                            });
                        }}
                        className={classes['refresh']}
                    >
                        <IoIosRefresh style={{color: '#3B73C2'}}/>
                        <span>Refresh</span>
                    </div>

                    <div
                        className={classes[open ? 'open-filter' : 'filter']}
                        onClick={() => {
                            setOpen(!open)

                            if (!open) {
                                setOpenAccordion(0);
                            }
                        }}
                    >
                        <FaFilter style={{color: '#3B73C2'}}/>
                        <span>Filters</span>
                    </div>
                </div>

                {
                    open &&
                    <div className={classes['filter-dropdown']}>
                        <BiCaretUp className={classes['icon']}/>
                        <div className={classes['container']}>
                            <div className={classes['accordion-block']}>
                                <div className={classes['accordion']}>

                                    <div
                                        onClick={() => onOpenAccordion(1)}
                                        className={classes['accordion-title']}
                                    >
                                        <div className={classes['text']}>
                                            <span className={classes['bold-span']}>1min</span>
                                            <span>AUTOREFRESH</span>
                                        </div>

                                        <BiChevronDown
                                            className={
                                                classes[openAccordion === 1 ?
                                                    'accordion-title-icon-rotate' : 'accordion-title-icon']
                                            }/>
                                    </div>

                                    {
                                        openAccordion === 1 &&
                                        <div
                                            className={
                                                classes['accordion-content']
                                            }
                                        >
                                            <span>AUTOREFRESH:</span>
                                            <form>
                                                <input
                                                    type="checkbox" id="second_10"
                                                    name="second" value={`seconds`}
                                                    checked={checkedRefresh.checkedTenSeconds}
                                                    onClick={() => {
                                                        setCheckedRefresh({
                                                            ...checkedRefresh,
                                                            checkedTenSeconds: !checkedRefresh.checkedTenSeconds,
                                                            refresh: 10000
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="second_10">10 Second</label><br/>
                                                <input
                                                    type="checkbox" id="second_30"
                                                    name="second_30" value="second_30"
                                                    checked={checkedRefresh.checkedThirtySeconds}
                                                    onClick={() => {
                                                        setCheckedRefresh({
                                                            ...checkedRefresh,
                                                            checkedThirtySeconds: !checkedRefresh.checkedThirtySeconds,
                                                            refresh: 30000
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="second_30">30 Second</label><br/>
                                                <input
                                                    type="checkbox" id="minute_1"
                                                    name="minute_1" value="minute_1"
                                                    checked={checkedRefresh.checkedOneMinutes}
                                                    onClick={() => {
                                                        setCheckedRefresh({
                                                            ...checkedRefresh,
                                                            checkedOneMinutes: !checkedRefresh.checkedOneMinutes,
                                                            refresh: 60000
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="minute_1">1 Minute</label><br/>
                                                <input
                                                    type="checkbox" id="minute_10"
                                                    name="minute_10" value="minute_10"
                                                    checked={checkedRefresh.checkedTenMinutes}
                                                    onClick={() => {
                                                        setCheckedRefresh({
                                                            ...checkedRefresh,
                                                            checkedTenMinutes: !checkedRefresh.checkedTenMinutes,
                                                            refresh: 600000
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="minute_10">10 Minute</label>
                                            </form>
                                        </div>
                                    }
                                </div>

                                <div className={classes['accordion']}>

                                    <div
                                        onClick={() => onOpenAccordion(2)}
                                        className={classes['accordion-title']}
                                    >
                                        <div className={classes['text']}>
                                            <span className={classes['bold-span']}>1min</span>
                                            <span>ORDER</span>
                                        </div>

                                        <BiChevronDown
                                            className={
                                                classes[openAccordion === 2 ?
                                                    'accordion-title-icon-rotate' : 'accordion-title-icon']
                                            }/>
                                    </div>

                                    {
                                        openAccordion === 2 &&
                                        <div
                                            className={
                                                classes['accordion-content']
                                            }
                                        >
                                            <span>ORDER:</span>
                                            <form>
                                                <input
                                                    onClick={() => {
                                                        setCheckedOrder({
                                                            ...checkedOrder,
                                                            checkedTopRated: !checkedOrder.checkedTopRated,
                                                            order: 'top'
                                                        })
                                                    }}
                                                    type="checkbox" id="top_rated"
                                                    name="top rated" value="top_rated"
                                                    checked={checkedOrder.checkedTopRated}
                                                />
                                                <label htmlFor="top_rated">Top Rated</label><br/>
                                                <input
                                                    type="checkbox" id="latest"
                                                    name="latest" value="latest"
                                                    checked={checkedOrder.checkedLatest}
                                                    onClick={() => {
                                                        setCheckedOrder({
                                                            ...checkedOrder,
                                                            checkedLatest: !checkedOrder.checkedLatest,
                                                            order: 'latest'
                                                        })
                                                    }}

                                                />
                                                <label htmlFor="latest">Latest</label><br/>
                                                <input
                                                    type="checkbox" id="most_read"
                                                    name="most_read" value="most_read"
                                                    checked={checkedOrder.checkedMostRead}
                                                    onClick={() => {
                                                        setCheckedOrder({
                                                            ...checkedOrder,
                                                            checkedMostRead: !checkedOrder.checkedMostRead,
                                                            order: 'most'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="most_read">Most Read</label><br/>
                                                <input
                                                    type="checkbox" id="popular"
                                                    name="popular" value="popular"
                                                    checked={checkedOrder.checkedPopular}
                                                    onClick={() => {
                                                        setCheckedOrder({
                                                            ...checkedOrder,
                                                            checkedPopular: !checkedOrder.checkedPopular,
                                                            order: 'popular'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="popular">Popular</label>
                                            </form>
                                        </div>
                                    }
                                </div>

                                <div className={classes['accordion']}>

                                    <div
                                        onClick={() => onOpenAccordion(3)}
                                        className={classes['accordion-title']}
                                    >
                                        <div className={classes['text']}>
                                            <span className={classes['bold-span']}>1min</span>
                                            <span>LANGUAGES</span>
                                        </div>

                                        <BiChevronDown className={
                                            classes[openAccordion === 3 ?
                                                'accordion-title-icon-rotate' : 'accordion-title-icon']
                                        }/>
                                    </div>

                                    {
                                        openAccordion === 3 &&
                                        <div
                                            className={
                                                classes['accordion-content']
                                            }
                                        >
                                            <span>LANGUAGES:</span>
                                            <form>
                                                <input
                                                    type="checkbox" id="select_unselect"
                                                    name="select_unselect" value="select_unselect"
                                                    checked={checkedLanguage.checkedAll}
                                                    onClick={() => {
                                                        setCheckedLanguage({
                                                            checkedAll: !checkedLanguage.checkedAll,
                                                            checkedEnglish: !checkedLanguage.checkedEnglish,
                                                            checkedGerman: !checkedLanguage.checkedGerman,
                                                            checkedChinese: !checkedLanguage.checkedChinese,
                                                            checkedItalian: !checkedLanguage.checkedItalian,
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="select_unselect">Select/Unselect All</label><br/>
                                                <input
                                                    type="checkbox" id="english"
                                                    name="english" value="english"
                                                    checked={checkedLanguage.checkedAll && checkedLanguage.checkedEnglish}
                                                    onClick={() => {
                                                        setCheckedLanguage({
                                                            checkedEnglish: !checkedLanguage.checkedEnglish,
                                                            language: 'en'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="english">English</label><br/>
                                                <input
                                                    type="checkbox" id="german"
                                                    name="german" value="german"
                                                    checked={checkedLanguage.checkedAll && checkedLanguage.checkedGerman}
                                                    onClick={() => {
                                                        setCheckedLanguage({
                                                            checkedGerman: !checkedLanguage.checkedGerman,
                                                            language: 'ge'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="german">German</label><br/>
                                                <input
                                                    type="checkbox" id="chinese"
                                                    name="chinese" value="chinese"
                                                    checked={checkedLanguage.checkedAll && checkedLanguage.checkedChinese}
                                                    onClick={() => {
                                                        setCheckedLanguage({
                                                            checkedChinese: !checkedLanguage.checkedChinese,
                                                            language: 'chin'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="chinese">Chinese</label><br/>
                                                <input
                                                    type="checkbox" id="italian"
                                                    name="italian" value="italian"
                                                    checked={checkedLanguage.checkedAll && checkedLanguage.checkedItalian}
                                                    onClick={() => {
                                                        setCheckedLanguage({
                                                            checkedItalian: !checkedLanguage.checkedItalian,
                                                            language: 'ita'
                                                        })
                                                    }}
                                                />
                                                <label htmlFor="italian">Italian</label>
                                            </form>
                                        </div>
                                    }
                                </div>

                                <button
                                    onClick={onReset}
                                >
                                    RESET
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default RefreshFilterBlock;
