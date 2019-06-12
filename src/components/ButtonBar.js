import React from 'react';
import classnames from 'classnames';

export default function ButtonBar({ items, currentRef, setCurrentRef }) {
    return (
        <div className="field has-addons">
            {items.map((ref, idx) => {
                const scriptureButtonClassName = classnames('button is-small', {
                    'is-active': ref === currentRef
                });
                return (
                    <p className="control" key={`scripture-button-${idx}`}>
                        <button
                            className={scriptureButtonClassName}
                            onClick={() => setCurrentRef(ref)}
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
