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

const createAnswer = (newAnswer) => {
  return {
    type: CREATE_ANSWER,
    payload: { newAnswer }
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

export const createAnAnswer = ( questionId, userId, answer ) => async (dispatch) => {
  console.log("CREATED ANSWER ============> ", answer)
  const res = await fetch('/api/answers/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answer,
      userId,
      questionId
    })
  })

  if (res.ok) {
    const createdAnswer = await res.json();
    dispatch(createAnswer(createdAnswer));
    return createdAnswer
  }
}

export const updateAnAnswer = ( questionId, userId, answer_id, answer) => async (dispatch) => {
  const res = await fetch('/api/answers/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionId, userId, answer_id, answer
    })
  })

  if (res.ok) {
    const updatedAnswer = await res.json();
    dispatch(updateAnswer(questionId, updatedAnswer.answer.id, updatedAnswer.answer.answer));
    return updatedAnswer
  }
}

export const removeAnAnswer = (answer_id, questId ) => async dispatch => {
  const res = await fetch('/api/answers/', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answer_id
    })
  })

  if (res.ok) {
    const deletedAnswer = await res.json();
    console.log("DELETED ANSWER =================", deletedAnswer)
    dispatch(removeAnswer(answer_id, questId))
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
      console.log('ACTION ----------------------', action)
      const deletedAnsState = { ...state }
      delete deletedAnsState[action.payload.answerId]
      console.log('DELETED STATE -------------------------', deletedAnsState)
      return deletedAnsState
    }
    default:
      return state
  }
}

export default answersReducer
