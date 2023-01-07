import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createAnAnswer } from '../../store/answers';
import './CreateAnswer.css'

const CreateAnswerForm = ({ setShowAnswerModal, questId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const questionId = questId

  const [answer, setAnswer] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

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

    // const createdAnswer = {
    //   userId: currUser.id,
    //   questionId: questId,
    //   answer: answer
    // }

    setHasSubmitted(true)


    if (!validationErrors.length) {
      const res = await dispatch(createAnAnswer( questId, currUser.id, answer))

      console.log('RES -------------------', res)

      history.push(`/question/${questId}`);
      setShowAnswerModal(false)
    }
  }

  return (
    <div>
      <div className='creQueModalHeader'>
        Add Answer
      </div>
      <div>
        <input
          type='text'
          id='answerField'
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
      <div>
        <button id='createQueButton' onClick={handleSubmit}>Add Answer</button>
        <button id='cancelQueButton' onClick={() => setShowAnswerModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default CreateAnswerForm;
