import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FeedQuestion from '../feedquestion/FeedQuestion';
import Post from '../post/Post';
import './Mainfeed.css'

import { getAllQuestions } from '../../store/questions';

function Mainfeed() {
  const dispatch = useDispatch();

  const allQuestions = useSelector((state) => Object.values(state.questions.allQuestions))

  useEffect(() => {
    dispatch(getAllQuestions())
  }, [dispatch])

  useEffect(() => {
    console.log('AWWWWWWWWWWWWWW ', allQuestions);
  })

  if (!allQuestions) return null;

  return (
    <div className='mainfeedWrapper'>
      <FeedQuestion />
      {Object.values(allQuestions).map(question => {
        return <NavLink to={`/question/${question.id}`} key={question.id} className={'postWrapper'}>

          <Post question={question}/>
          {question.imageUrl ?
            <img id='mainfeedImg' src={question.imageUrl} alt=''/>
          : null }

        </NavLink>

      })}


    </div>
  )
}

export default Mainfeed;
