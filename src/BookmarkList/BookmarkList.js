import React, { Component } from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'
import PropTypes from 'prop-types';
import BookmarkContext from '../BookmarkContext';

class BookmarkList extends Component {
  static defaultProps = {
    bookmarks: []
  };

  static propTypes = {
    bookmarks: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      rating: PropTypes.number,
      description: PropTypes.string
    }))
  }

  renderBookmarks = ()=> {
    
    return(
      this.props.bookmarks.map((bm,index)=> {
        return(
          <BookmarkItem key={bm.id} {...bm} />
        )
      })
    )
  }

  render() {
    console.log(this.props);
    // const { bookmarks } = this.props

    return (
      
      <BookmarkContext.Consumer>
        {
          (value)=> {
            console.log(value.bookmarks);
            const bookMarksList = value.bookmarks.map((bm,index)=> {
              return <BookmarkItem key={bm.id} {...bm}  />
            })
            return(
              <section className='BookmarkList'>
                <h2>Your bookmarks</h2>
                <ul className='BookmarkList__list' aria-live='polite'>
                  {bookMarksList}
                </ul>
            </section>
            )
          }
        }
      </BookmarkContext.Consumer>

    );
  }
}

export default BookmarkList;
