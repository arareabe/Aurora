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

  const currUser = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const createdAnswer = {
    //   userId: currUser.id,
    //   questionId: questId,
    //   answer: answer
    // }

    const res = await dispatch(createAnAnswer( questId, currUser.id, answer))

    console.log('RES -------------------', res)

    if (res?.errors) {
      setValidationErrors(res.errors)
      return
    } else {
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
        {validationErrors.map((error, idx) => (
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
