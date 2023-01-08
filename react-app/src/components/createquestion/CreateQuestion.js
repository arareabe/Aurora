import React, { useEffect, useState } from 'react';
import { useHistory } from'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CreateQuestion.css'
import { createAQuestion } from '../../store/questions';

function CreateQuestion({ setShowPostQueModal }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currUser = useSelector(state => state.session.user)

  const [question, setQuestion] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];

    if (!question.length) errors.push('Question cannot be blank')
    if (question.length < 10) errors.push('Your question must be at least 10 characters')
    if (question.length > 340) errors.push('Your question cannot exceed 340 characters')

    setValidationErrors(errors)
  }, [question])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true)

    const newQuestion = {
      userId: currUser.id,
      question,
      imageUrl
    }

    if (!validationErrors.length) {
      const res = await dispatch(createAQuestion(newQuestion))

      history.push('/')
      setShowPostQueModal(false)
    }

  }

  return (
    <div className='createQueModalWrapper'>
      <div className='createQueModalContainer'>
        <div className='creQueModalHeader'>
          Add Question
        </div>
        <input
            type='textarea'
            id='questionField'
            className='creQueModalBody'
            placeholder='Start your question with "What", "How", "Why", etc.'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
        />
        <div className='validErrs'>
          {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <input
          type='text'
          id='imgUrlField'
          className='creQueModalImgUrl'
          placeholder='(Optional) Drop an image URL to go with your question!'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div>
          <button id='createQueButton' onClick={handleSubmit}>Add Question</button>
          <button id='cancelQueButton' onClick={() => setShowPostQueModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )

}

export default CreateQuestion
