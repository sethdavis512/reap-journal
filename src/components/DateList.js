import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import * as utils from '../utils/utilFunctions';
import format from 'date-fns/format';

function DateList({ dates, current, handleChange }) {
    return dates.map((date, index) => {
        const storedData = utils.getLocalStorage(date);
        const numEntries = utils.keysToArray(storedData).length;

        const isActive = date === current;
        const dayClassName = classnames('tag', {
            'has-entries': !!storedData && date !== current,
            'is-active': isActive
        });

        const [month, day] = date.split('-');
        const formatted = `${month}-${day}`;

        return (
            <Fragment key={index}>
                <span
                    className={dayClassName}
                    data-date={date}
                    id={date}
                    onClick={handleChange}
                    role="link"
                >
                    {formatted} :: {numEntries}
                </span>
            </Fragment>
        );
    });
}

DateList.propTypes = {
    current: PropTypes.string,
    dates: PropTypes.array
};

export default DateList;
