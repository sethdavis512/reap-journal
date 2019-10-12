import React from 'react';
import classnames from 'classnames';

export default function ButtonBar({ items, currentScrRef, setCurrentScrRef }) {
    return (
        <div className="field has-addons">
            {items.map((ref, idx) => {
                const scriptureButtonClassName = classnames('button is-small', {
                    'is-active': ref === currentScrRef
                });
                return (
                    <p className="control" key={`scripture-button-${idx}`}>
                        <button
                            className={scriptureButtonClassName}
                            onClick={() => setCurrentScrRef(ref)}
                        >
                            {ref}
                        </button>
                    </p>
                );
            })}
        </div>
    );
}

ButtonBar.propTypes = {};
