import React from 'react';
import './Post.css';
import placeholder from '../../images/placeholder.png'

function Post() {

  return (
    <div className='postWrapper'>
      <div className='postHeader'>
        <i class="fa-solid fa-user-tie"></i>
        <div>
          <span>Username</span>
          <span>User Description · Timestamp</span>
        </div>
      </div>

      <div className='postBody'>
        <div>Post Question</div>
        <div>Post answer</div>
        <img src={placeholder} />
      </div>

      <div className='postFooter'>
        <button>Comments icon</button>
      </div>
    </div>
  )
}

export default Post;
