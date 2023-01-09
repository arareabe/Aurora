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

  const currUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(readAnswers(questId));
  }, [dispatch])

  const [showEditAnsModal, setShowEditAnsModal] = useState(false)
  const [answerId, setAnswerId] = useState(0)

  const allAnswers = useSelector((state) => Object.values(state.answers))

  useEffect(() => {
    console.log("ALLLLLLLLL eeeeeeeeeeeeeeeeeeee", allAnswers)
    console.log("CURRRRRRRRRRRRRRRRRRRRRRRR", currUser)
  })

  const showEditAns = (e, answerId) => {
    e.preventDefault();
    setAnswerId(answerId)
    console.log("THIS IS THE ANSWER IDDDDDDDDDDDD", answerId)
    setShowEditAnsModal(true)
  }

  const handleDelete = async (e, answerId) => {
    e.preventDefault();

    const removedAnswer = dispatch(removeAnAnswer(answerId))

    // if (removedAnswer) history.push(`/question/${questId}`)
    // window.location.reload(false)
  }

  if (!allAnswers) return "NOT HERE"

  return (
    <div className='allAnswersInner'>
      {allAnswers?.map(answer => (
        <div className='singAnsContainer'>
          <div className='singAnswerHeader'>
            <img src={userImg} id='singleQuestUserImg' />
            <div className='singleAnswerHeadUser'>
              <span id='singleQuestHeadName'>{answer?.user?.firstName} {' '} {answer?.user?.lastName}</span>
              <span id='singleQuestHeadDesc'>{answer?.user?.description}</span>
            </div>
            </div>
            {currUser && currUser.id === answer?.user?.id && (
              <div className='answerButtonsWrapper'>
                <button className='singAnsButton' onClick={(e) => showEditAns(e, answer?.id)}>
                  Edit
                </button>
                <button className='singAnsButton' onClick={(e) => handleDelete(e, answer?.id)}>
                  Delete
                </button>
             </div>
            )}
          {showEditAnsModal &&
            <Modal onClose={() => setShowEditAnsModal(false)}>
              <EditAnswerForm setShowEditAnsModal={setShowEditAnsModal} answerId={answerId} questId={questId} />
            </Modal>
          }

          <div className='singleAnsBody'>
            {answer?.answer}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllAnswers
