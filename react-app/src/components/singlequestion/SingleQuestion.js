import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userImg from '../../images/userImg.png'
import { getSingularQuestion } from '../../store/questions';
import AllAnswers from '../answers/AllAnswers';
import './SingleQuestion.css'

function SingleQuestion() {
  const { questId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getSingularQuestion(questId));
  }, [dispatch, questId])

  const theQuestion = useSelector((state)=> state.questions.singleQuestion.question)

  useEffect(() => {
    console.log('QUESTION----->', theQuestion)
  }, [dispatch])

  if (!theQuestion) return 'None found'

  return (
    <div className='singleQuestionWrapper'>
      <div className='singleQuestionContainer'>
        <div className='singleQuestHeader'>
          <img src={userImg} id='singleQuestUserImg'></img>
          <div className='singleQuestHeadUser'>
            <span id='singleQuestHeadName'>{theQuestion.user.firstName} {' '} {theQuestion.user.lastName}</span>
            <span id='singleQuestHeadDesc'>{theQuestion.user.description}</span>
          </div>
        </div>

        <div className='singleQuestPostBody'>
          <div>{theQuestion.question}</div>
        </div>

        <img src={theQuestion.imageUrl} />
      </div>

      <div className='AllAnswersWrapper'>
        <AllAnswers questId={questId} />
      </div>
    </div>
  )
}

export default SingleQuestion;
