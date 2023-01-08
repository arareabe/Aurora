import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { updateAnAnswer } from '../../store/answers';
import './EditAnswer.css'

const EditAnswerForm = ({ setShowEditAnsModal, answerId, questId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const questionId= questId

  const [answer, setAnswer] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currUser = useSelector(state => state.session.user)

  useEffect(() => {
    const errors = [];

    if (!answer.length) errors.push('Answer cannot be blank')
    if (answer.length < 10) errors.push('Your answer must be at least 10 characters long')
    if (answer.length > 3000) errors.push('Your answer cannot exceed 3000 characters')

  setValidationErrors(errors)
  }, [answer])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    if (!validationErrors.length) {
      const res = await dispatch(updateAnAnswer( questionId, currUser.id, answerId, answer))

      history.push(`/question/${questId}`);

      setShowEditAnsModal(false)
      window.location.reload(false)
    }
  }

  return (
    <div className='createQueModalWrapper'>
      <div className='createQueModalContainer'>
        <div className='creQueModalHeader'>
          Edit Answer
        </div>
        <div>
          <input
            type='text'
            id='answerField'
            className='creQueModalBody'
            placeholder='Leave your answer here!'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
        <div className='validErrs'>
          {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div className='answerModalButtons'>
          <button id='createQueButton' onClick={handleSubmit}>Add Answer</button>
          <button id='cancelQueButton' onClick={() => setShowEditAnsModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EditAnswerForm;
