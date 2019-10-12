import React from 'react';
import PropTypes from 'prop-types';

function DateList({ dates, current, handleChange }) {
    const mappedDates = dates.map((date, index) => {
        return <option key={index}>{date}</option>;
    });
    return (
        <div class="select is-expanded">
            <select value={current} onChange={handleChange}>
                {mappedDates}
            </select>
        </div>
    );
}

DateList.propTypes = {
    current: PropTypes.string,
    dates: PropTypes.array
};

export default DateList;
