import React, { Component } from 'react';
import BookmarkContext from './BookmarkContext';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import { Route } from 'react-router-dom';

const bookmarks = [
  // {
  //   id: 0,
  //   title: 'Google',
  //   url: 'http://www.google.com',
  //   rating: '3',
  //   desc: 'Internet-related services and products.'
  // },
  // {
  //   id: 1,
  //   title: 'Thinkful',
  //   url: 'http://www.thinkful.com',
  //   rating: '5',
  //   desc: '1-on-1 learning to accelerate your way to a new high-growth tech career!'
  // },
  // {
  //   id: 2,
  //   title: 'Github',
  //   url: 'http://www.github.com',
  //   rating: '4',
  //   desc: 'brings together the world\'s largest community of developers.'
  // }
];

class App extends Component {
  state = {
    bookmarks: [],
    error: null,
  };


  setBookmarks = bookmarks => {
    this.setState({
      bookmarks,
      error: null,
    })
  }

  addBookmark = bookmark => {
    this.setState({
      bookmarks: [ ...this.state.bookmarks, bookmark ],
    })
  }

  deleteBookmark = (bmId)=> {
	  console.log(bmId);
	  const bmToDel = this.state.bookmarks.find(bm=> bm.id === bmId); //we only need the id of the bookmark but i am logging the whole bookmark object just to visually make sure it's the right one.
	  console.log(bmToDel);

	  fetch(`${config.API_ENDPOINT}/${bmToDel.id}`, {
		method: 'DELETE',
		headers: {
		  'content-type': 'application/json',
		  'authorization': `bearer ${config.API_KEY}`
		}
	  })
		.then(res => {
		  if (!res.ok) {
			// get the error message from the response,
			return res.json().then(error => {
			  // then throw it
			  throw error
			})
		  }
		  console.log(res);
		  return res.json()
		})
		.catch(error => {
			this.setState({ error })
		}) //------end of fetch
		
		
		this.fetchBookmarks();//after the POST, lets refetch the data from the server
		
  }//--------------end of deleteBookmark


  fetchBookmarks = ()=> {
    fetch(config.API_ENDPOINT, {
		method: 'GET',
		headers: {
		  'content-type': 'application/json',
		  'Authorization': `Bearer ${config.API_KEY}`
		}
	  })
		.then(res => {
		  if (!res.ok) {
			throw new Error(res.status)
		  }
		  return res.json()
		})
		.then(this.setBookmarks)
		.catch(error => this.setState({ error }))
  }

  componentDidMount() {
	this.fetchBookmarks()
  }

  render() {
    
    //Now we are loading up a goodies basket of what we want to supply to the Context craft.
    const contextValue = {
		bookmarks: this.state.bookmarks, //supplying representation of state so anyone can have it.
		addBookmark: this.addBookmark,   //supplying method functionality so that anyone can have access to it.
		forceRender: this.fetchBookmarks,
		deleteBookmark: this.deleteBookmark,
	}

	//notes: BookmarkList props: bookmarks={this.state.bookmarks} {...routeProps},  
	//notes: AddBookmark props: onAddBookmark={this.addBookmark} forceRender={this.fetchBookmarks} {...routeProps}
    return (
      <main className='App'>
        <h1>Bookmarks!</h1>
		<Route exact path={"/"} render={routeProps=> {
			return(
				<Nav {...routeProps} />
			)
		}} />

		<BookmarkContext.Provider value={contextValue}>

			<Route exact path="/" component={BookmarkList} />

			<Route exact path="/add-bookmark" component={AddBookmark} />
			
		</BookmarkContext.Provider>
		
		
      </main>
    );
  }
}

export default App;
