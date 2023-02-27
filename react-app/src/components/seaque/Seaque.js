import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Post from '../post/Post';
import '../mainfeed/Mainfeed.css'

import { getAllSeaque } from '../../store/search';

function Seaque() {
  const dispatch = useDispatch();
  const { searchWord } = useParams();

  const allQuestions = useSelector((state) => Object.values(state.search.allSeaque))

  useEffect(() => {
    dispatch(getAllSeaque(searchWord))
  }, [dispatch])

  if (!allQuestions) return "POOOOOOOOOO";

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

export default Seaque;
