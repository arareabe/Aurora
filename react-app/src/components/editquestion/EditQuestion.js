import React, { useEffect, useState } from 'react';
import { useHistory } from'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './EditQuestion.css'
import { updatedAQuestion } from '../../store/questions';

function EditQuestion({ setShowPostQueModal, questId }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const currUser = useSelector(state => state.session.user)

  const [question, setQuestion] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [validationErrors, setValidationErrors] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const editedQuestion = {
      userId: currUser.id,
      question,
      imageUrl
    }

    const res = await dispatch(updatedAQuestion(questId, editedQuestion))

    if (res?.errors) {
      setValidationErrors(res.errors)
      return
    } else {
      history.push('/')
      setShowPostQueModal(false)
    }

  }

  return (
    <div className='EditQueModalWrapper'>
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
      <div>
        <input
          type='text'
          id='imgUrlField'
          placeholder='(Optional) Drop an image URL to go with your question!'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className='validErrs'>
        {validationErrors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <button id='EditQueButton' onClick={handleSubmit}>Add Question</button>
        <button id='cancelQueButton' onClick={() => setShowPostQueModal(false)}>Cancel</button>
      </div>
    </div>
  )

}

export default EditQuestion
