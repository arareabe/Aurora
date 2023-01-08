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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      userId: currUser.id,
      question,
      imageUrl
    }

    const res = await dispatch(createAQuestion(newQuestion))

    if (res?.errors) {
      setValidationErrors(res.errors)
      return
    } else {
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
        <input
          type='text'
          id='imgUrlField'
          className='creQueModalImgUrl'
          placeholder='(Optional) Drop an image URL to go with your question!'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <div className='validErrs'>
          {validationErrors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div>
          <button id='createQueButton' onClick={handleSubmit}>Add Question</button>
          <button id='cancelQueButton' onClick={() => setShowPostQueModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )

}

export default CreateQuestion
