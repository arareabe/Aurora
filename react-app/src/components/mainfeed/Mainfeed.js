import React from 'react';
import FeedQuestion from '../feedquestion/FeedQuestion';
import Post from '../post/Post';
import './Mainfeed.css'

function Mainfeed() {
  

  return (
    <div className='mainfeedWrapper'>
      <FeedQuestion />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  )
}

export default Mainfeed;
