import React, { useEffect, useState } from 'react';
import { useHistory } from'react-router-dom';
import { useDispatch } from 'react-redux';
import './CreateQuestion.css'
import { createAQuestion } from '../../store/questions';

function CreateQuestion({ setShowPostQueModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [question, setQuestion] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // const res = await dispatch(createAQuestion({question, imageUrl}))

  //   if (res.errors) {
  //     setValidationErrors(res.errors)
  //   } else {
  //     history.push('/')
  //     setShowPostQueModal(false)
  //   }

  // }

  return (
    <div className='createQueModalWrapper'>
      <div className='creQueModalHeader'>
        Add Question
      </div>
      <div>
        <input
          type='text'
          id='questionField'
          placeholder='Start your question with "What", "How", "Why", etc.'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>
      <div className='validErrs'>
        {validationErrors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <button id='createQueButton' onClick={{}}>Add Question</button>
        <button id='cancelQueButton' onClick={() => setShowPostQueModal(false)}>Cancel</button>
      </div>
    </div>
  )

}

export default CreateQuestion
