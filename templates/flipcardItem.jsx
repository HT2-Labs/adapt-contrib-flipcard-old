import _ from 'underscore';
import React, { useState, useEffect, useRef } from 'react';
import a11y from 'core/js/a11y';
import { classes, compile } from 'core/js/reactHelpers';

export default function flipcardItem(props) {
  const {
    backBody,
    backTitle,
    forceFront,
    frontImage,
    index,
    performSingleFlip,
    setActiveItem,
    setVisited,
    _flipDirection,
    _flipTime,
    _flipType,
    _hasMultipleItems
  } = props;

  const [isDisplayFront, setIsDisplayFront] = useState(true);
  const flipCardRef = useRef(null);

  // Required for setting focus after flip
  useEffect(() => {
    if (flipCardRef.current) {
      a11y.focus(flipCardRef.current);
    }
  }, [isDisplayFront]);

  if (forceFront && !isDisplayFront) {
    setIsDisplayFront(true);
  }

  const handleKeyPress = (event) => {
    if (event.key !== 'Enter') return;
    onClickFlipItem(event);
  };

  const onClickFlipItem = async (event) => {
    if (event && event.target.tagName.toLowerCase() === 'a') return;

    const closestFace = event.target.closest('.flipcard__item-face');
    $(closestFace).addClass('flipping');

    await new Promise(resolve => setTimeout(resolve, _flipTime));

    if (_flipType === 'singleFlip' && _hasMultipleItems) {
      performSingleFlip(index);
    }

    setVisited(index);
    setActiveItem(index);
    setIsDisplayFront(!isDisplayFront);
  };

  return (
    <div
      className={classes([
        'component__item',
        'flipcard__item',
        `item-${index}`,
        `${_flipDirection}`,
        _hasMultipleItems ? 'flipcard__multiple' : 'flipcard__single'
      ])}
    >
      {isDisplayFront &&
        <div
          ref={flipCardRef}
          className={classes([
            'flipcard__item-face',
            'flipcard__item-front'
          ])}
          role='button'
          tabIndex={0}
          onClick={onClickFlipItem}
          onKeyPress={handleKeyPress}
        >
          <img
            className='flipcard__item-frontImage'
            src={frontImage?.src}
            aria-label={frontImage?.alt}
          >
          </img>
        </div>
      }

      {!isDisplayFront &&
        <div
          ref={flipCardRef}
          className={classes([
            'flipcard__item-face',
            'flipcard__item-back'
          ])}
          role='button'
          tabIndex={0}
          onClick={onClickFlipItem}
          onKeyPress={handleKeyPress}
        >
          {backTitle &&
            <div
              className='flipcard__item-back-title'
              role='heading'
              aria-level={4}
              dangerouslySetInnerHTML={{ __html: compile(backTitle) }}
            >
            </div>
          }

          {backBody &&
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
