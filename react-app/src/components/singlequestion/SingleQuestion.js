import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userImg from '../../images/userImg.png'
import { getSingularQuestion, removeAQuestion } from '../../store/questions';
import AllAnswers from '../answers/AllAnswers';
import './SingleQuestion.css'
import pen from '../../images/pen.PNG'
import { Modal } from '../../context/Modal';
import CreateAnswerForm from '../createanswer/CreateAnswer';
import EditQuestion from '../editquestion/EditQuestion';

function SingleQuestion() {
  const { questId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const currUser = useSelector(state => state.session.user)

  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const [showEditQueModal, setShowEditQueModal] = useState(false)

  useEffect(() => {
    dispatch(getSingularQuestion(questId));
  }, [dispatch, questId])

  const theQuestion = useSelector((state)=> state.questions.singleQuestion.question)

  const showAnswer = e => {
    e.preventDefault()
    setShowAnswerModal(true)
  }
  const showEditQue = e => {
    e.preventDefault()
    setShowEditQueModal(true)
  }

  const removeQuestion = async (e) => {
    e.preventDefault();

    const removedQuestion = dispatch(removeAQuestion(questId))

    if (removedQuestion) history.push(`/`)
  }

  useEffect(() => {
    console.log('QUESTION----->', theQuestion)
    console.log("CURR USER --------------", currUser)
  }, [dispatch])

  if (!theQuestion) return 'None found'

  return (
    <div className='singleQuestionWrapper'>
      <div className='singleQuestionContainer'>
        <div className='singleQuestHeader'>
          <img src={userImg} id='singleQuestUserImg'></img>
          <div className='singleQuestHeadUser'>
            <span id='singleQuestHeadName'>{theQuestion.user?.firstName} {' '} {theQuestion.user?.lastName}</span>
            <span id='singleQuestHeadDesc'>{theQuestion.user?.description}</span>
          </div>
        </div>

        <div className='singleQuestPostBody'>
          <div>{theQuestion.question}</div>
        </div>

        <div className='singQueButtonsWrapper'>
          <button className='singQueAddAnswer' onClick={showAnswer}>
            <img src={pen} />
            <span>Answer</span>
          </button>

          <button className='singQueEditQues' onClick={showEditQue}>
            <span>Edit</span>
          </button>

          <button className='singQueDeleteQue' onClick={removeQuestion}>
            <span>Delete</span>
          </button>

        </div>


        <img src={theQuestion.imageUrl} />

        {showAnswerModal &&
          <Modal onClose={() => setShowAnswerModal(false)}>
            <CreateAnswerForm setShowAnswerModal={setShowAnswerModal} questId={questId} />
          </Modal>
        }

        {showEditQueModal &&
          <Modal onClose={() => setShowEditQueModal(false)}>
            <EditQuestion setShowEditQueModal={setShowEditQueModal} questId={questId} />
          </Modal>
        }
      </div>

      <div className='AllAnswersWrapper'>
        <AllAnswers questId={questId} />
      </div>
    </div>
  )
}

export default SingleQuestion;
