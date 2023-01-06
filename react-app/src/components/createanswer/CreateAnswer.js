import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import './CreateAnswer.css'

const CreateAnswerForm = ({ setShowAnswerModal, questId }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
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
