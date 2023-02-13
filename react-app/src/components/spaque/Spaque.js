import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Post from '../post/Post';
import '../mainfeed/Mainfeed.css'

import { getAllSpaque } from '../../store/spaces';

function Spaque() {
  const dispatch = useDispatch();
  const { spaceId } = useParams();

  const allQuestions = useSelector((state) => Object.values(state.spaces.allSpaque))

  useEffect(() => {
    dispatch(getAllSpaque(spaceId))
  }, [dispatch])

  if (!allQuestions) return null;

  return (
    <div id='spaqueOuterWrapper'>
      <div id='spaqueInnerWrapper'>
        {/* <FeedQuestion /> */}
        {Object.values(allQuestions).map(question => {
          return <NavLink to={`/question/${question.id}`} key={question.id} className={'postWrapper'}>

            <Post question={question}/>
            {question.imageUrl ?
              <img id='mainfeedImg' src={question.imageUrl} alt=''/>
            : null }

          </NavLink>

        })}


      </div>
    </div>
  )
}

export default Spaque;
