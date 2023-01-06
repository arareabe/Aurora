import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import './AllAnswers.css';
import userImg from '../../images/userImg.png'

const AllAnswers = ({ questId }) => {
  const dispatch = useDispatch();

  const currUser = useSelector((state) => console.log("STATE -----------", state))

  const allAnswers = useSelector((state) => state.questions.singleQuestion.question.answers)

  return (
    <div className='allAnswersInner'>
      {allAnswers.map(answer => (
        <div className='singAnsContainer'>
          <div className='singQuestHeader'>
            <img src={userImg} id='singleQuestUserImg' />
            <div className='singleQuestHeadUser'>
              <span id='singleQuestHeadName'>{answer.user.firstName} {' '} {answer.user.lastName}</span>
              <span id='singleQuestHeadDesc'>{answer.user.description}</span>
            </div>
          </div>

          <div className='singleAnsBody'>
            {answer.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllAnswers
