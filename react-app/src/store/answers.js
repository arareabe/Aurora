// TYPES
const READ_ANSWERS = 'questions/readAnswers'
const READ_ANSWER = 'questions/readAnswer'
const CREATE_ANSWER = 'questions/createAnswer'
const UPDATE_ANSWER = 'questions/updateAnswer'
const REMOVE_ANSWER = 'questions/removeAnswer'

const normalize = (data) => {
  if (!data || !Array.isArray(data)) {
    return {};
  }
  const obj = {};
  data.forEach((each) => (obj[each.id] = each));
  return obj;
};

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
  console.log('questID ==============>', questId)
  const res = await fetch(`/api/answers/${questId}/answers`)

  if (res.ok) {
    const allAnswers = await res.json();
    console.log("ANSWER ------------------>", allAnswers)
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

const initialState = {}

const answersReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_ANSWERS: {
      const answersState = {}
      action.payload.answers.forEach((answer) => {
        answersState[answer.id] = answer
      })
      return answersState
    }
    case CREATE_ANSWER: {
      const createAnsState =  { ...state }
      createAnsState[action.payload.newAnswer.id] = action.payload.newAnswer
      return createAnsState
    }
    case UPDATE_ANSWER: {
      const updatedAnsState = { ...state }
      updatedAnsState[action.payload.answerId] = action.payload.updatedAnswer
      return updatedAnsState
    }
    case REMOVE_ANSWER: {
      const deletedAnsState = { ...state }
      delete deletedAnsState[action.payload.answerId]
      return deletedAnsState
    }
    default:
      return state
  }
}

export default answersReducer
