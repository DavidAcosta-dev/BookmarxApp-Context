import React from 'react';
//still need state of course, context is just a representation of state and a means of transporting/delivering data and resourses around the app on behalf of state.
//Creating the shape of context, the vessel that will pass around data, functions, and representation of state.
const BookmarkContext = React.createContext({
    bookmarks: [/*will represent the bookmarks from state*/],
    addBookmarks: ()=> {/* functionality will be provided by a component that uses the .Provider */},
    deleteBookmark: ()=> {/* functionality will be provided by a component that uses the .Provider */},
    forceRender: ()=> {/* functionality will be provided by a component that uses the .Provider */}
});

export default BookmarkContext;