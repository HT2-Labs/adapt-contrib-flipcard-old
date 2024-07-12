import React, { useState } from 'react';
import { templates } from 'core/js/reactHelpers';

export default function flipcard(props) {
  const {
    setVisited,
    _flipTime,
    _flipType,
    _items
  } = props;

  const [forceFront, setForceFront] = useState(false);
  const [ignoreIndex, setIgnoreIndex] = useState(null);

  const performSingleFlip = (index) => {
    setForceFront(true);
    setIgnoreIndex(index);
  }

  return (
    <div
      className='component__inner flipcard__inner'
      role='region'
    >

      <templates.header {...props} />

      <div className='component__widget flipcard__widget clearfix'>

        {_items.map(({ backBody, backTitle, frontImage, _flipDirection }, index) =>
          <templates.flipcardItem
            backBody={backBody}
            backTitle={backTitle}
            frontImage={frontImage}
            key={index}
            index={index}
            forceFront={forceFront && index !== ignoreIndex}
            performSingleFlip={performSingleFlip}
            setVisited={setVisited}
            _flipDirection={_flipDirection}
            _flipTime={_flipTime}
            _flipType={_flipType}
            _hasMultipleItems={_items.length > 1}
          />
        )}
      </div>

    </div>
  );
}
