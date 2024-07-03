import React from 'react';
import a11y from 'core/js/a11y';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function flipcard(props) {
  const {
    setVisited,
    _flipType,
    _items
  } = props;

  const [isAllFront, setIsAllFront] = useState(false);

  const performSingleFlip = () => {
    setIsAllFront(true);
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
            index={index}
            isAllFront={isAllFront}
            performSingleFlip={performSingleFlip}
            setVisited={setVisited}
            _flipDirection={_flipDirection}
            _flipType={_flipType}
            _hasMultipleItems={_items.length > 1}
          />
        )}
      </div>

    </div>
  );
}
