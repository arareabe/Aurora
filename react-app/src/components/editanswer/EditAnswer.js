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

  const currUser = useSelector(state => state.session.user)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(updateAnAnswer( questionId, currUser.id, answerId, answer))

    if (res?.errors) {
      setValidationErrors(res.errors)
      return
    } else {
      history.push(`/question/${questId}`);
      setShowEditAnsModal(false)
    }
  }

  return (
    <div>
      <div className='creQueModalHeader'>
        Edit Answer
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
        <button id='editQueButton' onClick={handleSubmit}>Add Answer</button>
        <button id='cancelQueButton' onClick={() => setShowEditAnsModal(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default EditAnswerForm;
