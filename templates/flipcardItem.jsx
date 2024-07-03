import React from 'react';
import { classes, compile } from 'core/js/reactHelpers';

export default function flipcardItem(props) {
  const {
      backBody,
      backTitle,
      frontImage,
      index
      isAllFront,
      performSingleFlip,
      setVisited,
      _flipDirection,
      _flipType,
      _hasMultipleItems
    } = props;

  const [isDisplayFront, setIsDisplayFront] = useState(true);

  if (isAllFront) {
    setIsDisplayFront(true);
  }

  const onClickFlipItem = (event) => {
    if (event && event.target.tagName.toLowerCase() === 'a') return;

    if (_flipType === 'singleFlip' && _hasMultipleItems) {
      performSingleFlip();
    }

    setIsDisplayFront(!isDisplayFront);
    setVisited(index);
    toggleFocusedFace();
  };

  const toggleFocusedFace = () => {
    const focusItem = this.find('.flipcard__item-face');
    a11y.focus(focusItem);
  }

  return (
    <div
      className={classes([
        'component__item',
        'flipcard__item',
        `item-${index}`
        `${_flipDirection}`,
        _hasMultipleItems ? 'flipcard__multiple' : 'flipcard__single';
      ])}
      key={index}
      onClick={onClickFlipItem}
    >
      { isDisplayFront &&
        <div
          className='flipcard__item-face flipcard__item-front'
          role='button'
          tabIndex='0'
          a11y-focus
        >
          <img
            className='flipcard__item-frontImage'
            src={frontImage?.src}
            aria-label={frontImage?.alt}>
          </img>
        </div>
      }

      { !isDisplayFront &&
        <div
          className='flipcard__item-face flipcard__item-back'
          tabIndex='-1'
        >
          <button
            className='flipcard__item-back-button'
          />
          { backTitle &&
            <div
              className='flipcard__item-back-title'
              role='heading'
              aria-level={4}
              dangerouslySetInnerHTML={{ __html: compile(backTitle) }}
            >
            </div>
          }

          { backBody &&
            <div
              className='flipcard__item-back-body'
              dangerouslySetInnerHTML={{ __html: compile(backBody) }}
            >
            </div>
          }
        </div>
      }
    </div>
  );
}
