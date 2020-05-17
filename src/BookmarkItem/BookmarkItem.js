import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import PropTypes from 'prop-types';
import BookmarkContext from '../BookmarkContext';

export default function BookmarkItem(props) { 

//   <li className='BookmarkItem'>
//   <div className='BookmarkItem__row'>
//     <h3 className='BookmarkItem__title'>
//       <a
//         href={props.url}
//         target='_blank'
//         rel='noopener noreferrer'>
//         {props.title}
//       </a>
//     </h3>
//     <Rating value={props.rating} />
//   </div>
//   <p className='BookmarkItem__description'>
//     {props.description}
//   </p>
//   <div className='BookmarkItem__buttons'>
//     <button
//       className='BookmarkItem__description'
//       onClick={() => props.onClickDelete(props.id)}
      
//     >
//       Delete
//     </button>
//   </div>
// </li>


  console.log(props)
  return (
    <BookmarkContext.Consumer>
      {
        (value)=> {
          return(
            <li className='BookmarkItem'>
            <div className='BookmarkItem__row'>
              <h3 className='BookmarkItem__title'>
                <a
                  href={props.url}
                  target='_blank'
                  rel='noopener noreferrer'>
                  {props.title}
                </a>
              </h3>
              <Rating value={props.rating} />
            </div>
            <p className='BookmarkItem__description'>
              {props.description}
            </p>
            <div className='BookmarkItem__buttons'>
              <button
                className='BookmarkItem__description'
                onClick={() => value.deleteBookmark(props.id)}
                
              >
                Delete
              </button>
            </div>
          </li>
          )
        }
      }
    </BookmarkContext.Consumer>
  )
}

BookmarkItem.defaultProps = {
  onClickDelete: () => {},
  rating: 1,
  description: "hello world"
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  rating: PropTypes.number,
  description: PropTypes.string
}
