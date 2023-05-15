import React from 'react'
import './FeedQuestion.css'

function FeedQuestion() {

  return (
    <div className='feedQuestionWrapper'>
        <div>
          <i class="fa-solid fa-user-tie"></i>
          <input type='text' placeholder='What do you want to ask or share?' />
        </div>
        <div>
          <button type='submit'>Ask Away</button>
        </div>
    </div>
  )
}

export default FeedQuestion
