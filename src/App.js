import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
/** 
INSTRUCTIONS 

Fork this codepen.

Use this API
https://jsonplaceholder.typicode.com/
to fetch posts.

Display all the posts titles on the screen however you like.

Clicking on a post should open up a modal, the modal should display
- the post author's name
- the post author's catchPhrase
- the post title
- the post body
- a close button

The modal's close button should close the modal. 
Clicking outside of the modal should also close the modal. 
How you style the modal is up to you. 

HINTS: 
- Keep different screen sizes in mind 
- Leave comments 
- read the API docs -> https://jsonplaceholder.typicode.com/guide/
- keep the styling simple (or go wild)

Good luck!
*/

function App() {
  //local state variables
  const [authors, setAuthors] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [postDetailModalShow, setPostDetailModalShow] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    //fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(postsData => {
      setPosts(postsData);
      //fetch authors
      fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(authorsData => {
        setAuthors(authorsData);
      });
    });
  }, []);

  // helper function to diplay the posts list
  const displayPosts = () => {
    if (!posts.length) {
      return;
    }
    const postsListMarkup = posts.map((post, index) => {
      return (
        <div className="post-title" onClick={(e) => showPostDetail(post.id)} key={index}>
          {post.title}
        </div>
      );
    });

    return postsListMarkup;
  }

  //helper function to set the selectedAuthor and selectedPost when user clicks on a post title
  //from the posts list
  const showPostDetail = (id) => {
    const selectedPost = posts.filter((post) => post.id === id);
    setSelectedPost(selectedPost[0]);
    const selectedAuthorId = selectedPost[0].userId;
    const selectedAuthor = authors.filter((author) => author.id === selectedAuthorId);
    setSelectedAuthor(selectedAuthor[0]);
    setPostDetailModalShow(true);
  }

  //helper function to close the post details modal
  //by setting the corresponding state to false
  const closePostDetail = () => {
    setPostDetailModalShow(false);
  }

  //helper function to stop the propogation from child to parent
  //causing the modal stay up when user clicks inside it
  const keepPostDetailOpen = (e) => {
    e.stopPropagation();
  }

  //This shows content of Modal 
  const postDetailModal = () => {
      if (!postDetailModalShow) {
          return;
      }
      return (
          <div className="modal-container row px-5" onClick={(e) => closePostDetail()}>
              <div className="modal-content p-5 mt-5 bg-white" onClick={(e) => keepPostDetailOpen(e)}>
                <div>
                  <button className="btn close-btn" onClick={(e) => closePostDetail()}>Close</button>
                </div>
                {/*- the post author's name
                - the post author's catchPhrase
                - the post title
                - the post body*/}
                <h2 className="underline">Post Details</h2>
                <h3 className="underline">Author Name: </h3>
                <div>{selectedAuthor.name}</div>

                <h3 className="underline">Author's catchPhrase: </h3>
                <div>{selectedAuthor.company.catchPhrase}</div>

                <h3 className="underline">Post Title: </h3>
                <div>{selectedPost.title}</div>

                <h3 className="underline">Post Body: </h3>
                <div>{selectedPost.body}</div>
              </div>
          </div>
      )
  }

  return (
    <div>
      <h2>Posts List</h2>
      {displayPosts()}

      {/* moda  markup */}
      {postDetailModal()}
    </div>
  );
}

export default App;

