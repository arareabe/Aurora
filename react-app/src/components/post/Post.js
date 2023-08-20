import React from 'react';
import './Post.css';
import placeholder from '../../images/placeholder.png'
import { NavLink } from 'react-router-dom';
import userImg from '../../images/userImg.png';
import { useSelector } from 'react-redux';

function Post({ question }) {
  if (!question) return 'No question here'

  console.log("POOP", question)

  return (
    <div className='postContainer'>
      <div className='postHeader'>
        <img src={question.user.avatar} id='postUserImg'></img>
        <div className='postHeadUser'>
          <span id='postHeadName'>{question.user?.firstName} {' '} {question.user?.lastName}</span>
          <span id='postHeadDesc'>{question.user?.description}</span>
        </div>
      </div>

      <div className='postBody'>
        <div>{question.question}</div>
      </div>
    </div>
  )
}

export default Post;
