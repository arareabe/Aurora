// TYPES
const READ_ANSWERS = 'questions/readAnswers'
const READ_ANSWER = 'questions/readAnswer'
const CREATE_ANSWER = 'questions/createAnswer'
const UPDATE_ANSWER = 'questions/updateAnswer'
const REMOVE_ANSWER = 'questions/removeAnswer'

// ACTION CREATORS

const loadAnswers = (allAnswers) => {
  return {
    type: READ_ANSWERS,
    payload: allAnswers
  };
};

const loadAnswer = (answer) => {
  return {
    type: READ_ANSWER,
    payload: answer
  };
};

const createAnswer = (questId, newAnswer) => {
  return {
    type: CREATE_ANSWER,
    payload: { questId, newAnswer }
  };
};

const updateAnswer = (questId, answerId, updatedAnswer) => {
  return {
    type: UPDATE_ANSWER,
    payload: { questId, answerId, updatedAnswer }
  };
};

const removeAnswer = (questId, answerId) => {
  return {
    type: REMOVE_ANSWER,
    payload: { questId, answerId }
  };
};

// MY THUNKS

export const readAnswers = (questId) => async dispatch => {
  const res = await fetch(`/api/answers/${questId}/answers`)

  if (res.ok) {
    const allAnswers = await res.json();
    dispatch(loadAnswers(allAnswers));
    return allAnswers
  }
}

export const createAnAnswer = ( questId, answer) => async (dispatch) => {
  const res = await fetch('/api/answers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questId, answer
    })
  })

  if (res.ok) {
    const createdAnswer = await res.json();
    dispatch(createAnswer(createdAnswer));
    return createdAnswer
  }
}

export const updateAnAnswer = ( questId, answerId, answer) => async (dispatch) => {
  const res = await fetch('/api/answers/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questId, answerId, answer
    })
  })

  if (res.ok) {
    const updatedAnswer = await res.json();
    dispatch(updateAnswer(questId, updatedAnswer.answer.id, updatedAnswer.answer.answer));
    return updatedAnswer
  }
}

export const removeAnAnswer = (questId, answerId) => async dispatch => {
  const res = await fetch('/api/answers/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answerId
    })
  })

  if (res.ok) {
    const deletedAnswer = await res.json();
    dispatch(removeAnswer(answerId, questId))
    return deletedAnswer
  }
}


// REDUCE ME

const initialState = {

}

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_ANSWERS: {
      const answersState = { ...state, }
    }
    case CREATE_ANSWER: {
      const createAnsState =  { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } }
      createAnsState.allQuestions[action.payload.questId].answers.push(action.payload.answer)
      return createAnsState
    }
    default:
      return state
  }
}

export default answersReducer
