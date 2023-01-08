import React, { useEffect, useState } from 'react';
import { useHistory } from'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../createquestion/CreateQuestion.css'
import { updatedAQuestion } from '../../store/questions';

function EditQuestion({ setShowEditQueModal, questId }) {
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

    setHasSubmitted(true);

    const question_id = questId

    const editedQuestion = {
      userId: currUser.id,
      question,
      imageUrl,
      question_id
    }

    if (!validationErrors.length) {
      const res = await dispatch(updatedAQuestion(editedQuestion))

      console.log("UPDATED QUESTION ====================", res)

      history.push(`/question/${questId}`)
      window.location.reload(false)
      setShowEditQueModal(false)
    }

  }

  return (
    <div className='createQueModalWrapper'>
      <div className='createQueModalContainer'>
        <div className='creQueModalHeader'>
          Edit Question
        </div>
        <div>
          <input
            type='text'
            id='questionField'
            className='creQueModalBody'
            placeholder='Start your question with "What", "How", "Why", etc.'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className='validErrs'>
          {hasSubmitted && validationErrors.length > 0 && validationErrors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <div>
          <input
            type='text'
            id='imgUrlField'
            className='creQueModalImgUrl'
            placeholder='(Optional) Drop an image URL to go with your question!'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <button id='createQueButton' onClick={handleSubmit}>Edit Question</button>
          <button id='cancelQueButton' onClick={() => setShowEditQueModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  )

}

export default EditQuestion
