import React from 'react';
import { templates, classes, compile } from 'core/js/reactHelpers';

export default function flipcard(props) {
  return (
    <div
      className='component__inner flipcard__inner'
      role='region'
    >

      <templates.header {...props} />

      <div className='component__widget flipcard__widget clearfix'>

        {props._items.map(({ backBody, backTitle, frontImage, _flipDirection }, index) =>

          <div
            className={classes([
              `component__item flipcard__item item-${index} ${_flipDirection}`,
            ])}
            key={index}
          >
            <div
              className='flipcard__item-face flipcard__item-front'
              role='button'
              tabindex='0'
            >
              <img
                className='flipcard__item-frontImage'
                src={frontImage?.src}
                aria-label={frontImage?.alt}>
              </img>
            </div>

            <div
              className='flipcard__item-face flipcard__item-back'
              role='button'
              tabindex='0'
            >
              { backTitle &&
                <div
                  className='flipcard__item-back-title'
                  dangerouslySetInnerHTML={{ __html: compile(backTitle)}}
                >
                </div>
              }

              { backBody &&
                <div
                  className='flipcard__item-back-body'
                  dangerouslySetInnerHTML={{ __html: compile(backBody)}}
                >
                </div>
              }
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
