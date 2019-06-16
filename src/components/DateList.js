import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as utils from '../utils/utilFunctions';

function DateList({ dates, current, handleChange }) {
    return dates.map((date, index) => {
        const dayData = utils.getLocalStorage(date);
        let numEntries = 0;

        if (dayData) {
            for (let scr in dayData) {
                const reapKeyArr = utils.keysToArray(dayData[scr]);
                if (reapKeyArr.some(entry => dayData[scr][entry] !== '')) {
                    numEntries++;
                }
            }
        }

        const dayClassName = classnames('button is-small', {
            'has-entries': numEntries > 0 && date !== current,
            'is-active': date === current
        });

        const [month, day] = date.split('-');
        const formatted = `${month}-${day}`;

        return (
            <button
                className={dayClassName}
                data-date={date}
                id={date}
                key={index}
                onClick={handleChange}
                role="link"
            >
                {formatted} :: {numEntries}
            </button>
        );
    });
}

DateList.propTypes = {
    current: PropTypes.string,
    dates: PropTypes.array
};

export default DateList;
