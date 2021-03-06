import React, { useEffect, useState } from 'react';
import plan from './reap-plan';
import format from 'date-fns/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import Guide from './components/Guide';
import TextArea from './components/TextArea';
import ButtonBar from './components/ButtonBar';
import DateList from './components/DateList';
import * as utils from './utils/utilFunctions';
import throttle from 'lodash/throttle';

export default function App() {
    const REAP = 'REAP';
    const todayObj = new Date();
    const today = format(todayObj, 'MM-DD-YYYY');
    const [currentDate, setCurrentDate] = useState(today);
    const [currentScrRef, setCurrentScrRef] = useState('');
    const [scripture, setScripture] = useState('');
    const blankReap = {
        read: '',
        examine: '',
        apply: '',
        pray: ''
    };
    const storedReap = utils.getLocalStorage(REAP);
    const initialReap =
        utils.getSafe(() => storedReap[currentDate][currentScrRef]) ||
        blankReap;
    const [reap, setReap] = useState(initialReap);
    const [loadingState, setLoadingState] = useState(false);
    const altCurrentDate = currentDate.substring(0, 5);

    useEffect(() => {
        setCurrentScrRef(plan[altCurrentDate][0]);
    }, [altCurrentDate]);

    useEffect(() => {
        const fetch = async () => {
            const response = await utils.axiosInstance(
                `?q=${encodeURIComponent(
                    currentScrRef
                )}&include-passage-references=false&include-footnotes=false&include-footnote-body=false`
            );
            const [fetchedScripture] = response.data.passages;
            setScripture(fetchedScripture);
            setLoadingState(false);
        };

        if (currentScrRef) {
            setLoadingState(true);
            fetch();
        }

        const storedDailyReap = utils.getLocalStorage(REAP);
        const storedReap =
            utils.getSafe(() => storedDailyReap[currentDate][currentScrRef]) ||
            blankReap;

        setReap(storedReap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentScrRef]);

    useEffect(() => {
        const entireReapFromLocalStorage =
            utils.getSafe(() => utils.getLocalStorage(REAP)) || {};
        const storedDailyReap = entireReapFromLocalStorage[currentDate] || {};
        if (storedDailyReap && currentScrRef) {
            const dailyReap = {
                ...entireReapFromLocalStorage,
                [currentDate]: {
                    ...storedDailyReap,
                    [currentScrRef]: reap
                }
            };
            utils.setLocalStorage(REAP, dailyReap);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reap.read, reap.examine, reap.apply, reap.pray]);

    function handleDayChange(e) {
        setCurrentDate(e.target.value);
    }

    const throttledSetReap = throttle(setReap, 5000);

    function handleTextChange(e) {
        const text = e.target.value;
        const name = e.target.name;

        const entry = { [name]: text };
        throttledSetReap({
            ...reap,
            ...entry
        });
    }

    const dateArr = utils.keysToArray(plan);
    const fullDate = format(todayObj, 'MMMM D, YYYY');

    return (
        <div className="columns is-centered">
            <div className="column is-10">
                <div className="columns scroll-parent">
                    <div className="column is-8 scroll-child">
                        <DateList
                            dates={dateArr}
                            current={altCurrentDate}
                            handleChange={handleDayChange}
                        />
                        <p>
                            <strong>{fullDate}</strong>
                        </p>
                        <h3 className="title is-3">Scripture</h3>
                        <ButtonBar
                            currentScrRef={currentScrRef}
                            setCurrentScrRef={setCurrentScrRef}
                            items={plan[altCurrentDate]}
                        />
                        <hr />
                        <div className="content">
                            <h6 className="title is-6">{currentScrRef}</h6>
                            {loadingState ? (
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    size="2x"
                                    spin
                                />
                            ) : (
                                <p>
                                    {scripture ||
                                        'Choose scripture from above.'}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="column is-4 scroll-child">
                        <h3 className="title is-3">REAP</h3>
                        <Guide />
                        <hr />
                        <TextArea
                            handleChange={handleTextChange}
                            id="readId"
                            label="Read"
                            name="read"
                            value={reap.read}
                        />
                        <TextArea
                            handleChange={handleTextChange}
                            id="examineId"
                            label="Examine"
                            name="examine"
                            value={reap.examine}
                        />
                        <TextArea
                            handleChange={handleTextChange}
                            id="applyId"
                            label="Apply"
                            name="apply"
                            value={reap.apply}
                        />
                        <TextArea
                            handleChange={handleTextChange}
                            id="prayId"
                            label="Pray"
                            name="pray"
                            value={reap.pray}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
