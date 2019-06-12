import React from 'react';
import PropTypes from 'prop-types';

function TextArea({ handleChange, id, label, name, value }) {
    return (
        <div className="field">
            <div className="control">
                <label htmlFor={id}>{label}</label>
                <textarea
                    className="textarea is-small"
                    id={id}
                    name={name}
                    onChange={handleChange}
                    value={value}
                />
            </div>
        </div>
    );
}

TextArea.propTypes = {
    handleChange: PropTypes.func,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string
};

export default TextArea;
