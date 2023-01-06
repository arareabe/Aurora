import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import './AllAnswers.css';
import userImg from '../../images/userImg.png'
import { readAnswers, removeAnAnswer } from '../../store/answers';
import EditAnswerForm from '../editanswer/EditAnswer';
import { Modal } from '../../context/Modal';

const AllAnswers = ({ questId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const currUser = useSelector((state) => console.log("STATE -----------", state))

  useEffect(() => {
    dispatch(readAnswers(questId));
  }, [dispatch, questId])

  const [showEditAnsModal, setShowEditAnsModal] = useState(false)

  const allAnswers = useSelector((state) => Object.values(state.answers))

  const showEditAns = e => {
    e.preventDefault();
    setShowEditAnsModal(true)
  }

  const handleDelete = (answerId) => {
    const removedAnswer = dispatch(removeAnAnswer(answerId))

  }

  if (!allAnswers) return "NOT HERE"

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
            <div className='answerButtonsWrapper'>
                <button onClick={showEditAns}>
                  Edit
                </button>
                <button onClick={() => handleDelete(answer.id)}>
                  Delete
                </button>
            </div>
          </div>

          {showEditAnsModal &&
            <Modal onClose={() => setShowEditAnsModal(false)}>
              <EditAnswerForm setShowEditAnsModal={setShowEditAnsModal} answerId={answer.id} questId={questId} />
            </Modal>
          }

          <div className='singleAnsBody'>
            {answer.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllAnswers
