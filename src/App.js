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

export default function App() {
    const todayObj = new Date();
    const today = format(todayObj, 'MM-DD-YYYY');
    const [currentDate, setCurrentDate] = useState(today);
    const [currentRef, setCurrentRef] = useState('');
    const [scripture, setScripture] = useState('');
    const blankReap = {
        read: '',
        examine: '',
        apply: '',
        pray: ''
    };
    const storedReap = utils.getLocalStorage(today);
    const initialReap = (storedReap && storedReap[currentRef]) || blankReap;
    const [reap, setReap] = useState(initialReap);
    const [loadingState, setLoadingState] = useState(false);

    useEffect(() => {
        setCurrentRef(plan[currentDate][0]);
    }, [currentDate]);

    useEffect(() => {
        const fetch = async () => {
            const response = await utils.axiosInstance(
                `?q=${encodeURIComponent(
                    currentRef
                )}&include-passage-references=false&include-footnotes=false&include-footnote-body=false`
            );
            const [fetchedScripture] = response.data.passages;
            setScripture(fetchedScripture);
            setLoadingState(false);
        };

        if (currentRef) {
            setLoadingState(true);
            fetch();
        }

        const storedDailyReap = utils.getLocalStorage(currentDate);
        const storedReap =
            (storedDailyReap && storedDailyReap[currentRef]) || blankReap;

        setReap(storedReap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentRef]);

    useEffect(() => {
        const storedDailyReap = utils.getLocalStorage(currentDate) || {};
        const dailyReap = {
            ...storedDailyReap,
            [currentRef]: reap
        };
        if (currentRef) utils.setLocalStorage(currentDate, dailyReap);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reap]);

    function handleDayChange(e) {
        setCurrentDate(e.target.dataset.date);
    }

    function handleTextChange(e) {
        const text = e.target.value;
        const name = e.target.name;

        const entry = { [name]: text };
        setReap({
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
                    <div className="column is-2 scroll-child calendar">
                        <DateList
                            dates={dateArr}
                            current={currentDate}
                            handleChange={handleDayChange}
                        />
                    </div>
                    <div className="column is-6 scroll-child">
                        <p>
                            <strong>{fullDate}</strong>
                        </p>
                        <h3 className="title is-3">Scripture</h3>
                        <ButtonBar
                            currentRef={currentRef}
                            setCurrentRef={setCurrentRef}
                            items={plan[currentDate]}
                        />
                        <hr />
                        <div className="content">
                            <h6 className="title is-6">{currentRef}</h6>
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
