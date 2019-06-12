import React, { useState } from 'react';
import PropTypes from 'prop-types';

function useShowHide(initialState) {
    const [show, setshow] = useState(initialState);
    return [show, () => setshow(!show)];
}

function ShowHide({ children, label = 'Content' }) {
    const [show, toggleShow] = useShowHide(false);
    return (
        <div>
            <button className="button is-small" onClick={toggleShow}>
                {show ? `Hide ${label}` : `Show ${label}`}
            </button>
            {show ? <div>{children}</div> : null}
        </div>
    );
}

ShowHide.propTypes = {
    label: PropTypes.string
};

export default ShowHide;
