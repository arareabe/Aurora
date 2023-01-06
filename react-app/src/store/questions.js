// import { csrfFetch } from '.csrf';

// TYPES
const READ_QUESTIONS = 'questions/readQuestions'
const READ_QUESTION = 'questions/readQuestion'
const CREATE_QUESTION = 'questions/createQuestion'
const UPDATE_QUESTION = 'questions/updateQuestion'
const REMOVE_QUESTION = 'questions/removeQuestion'

const READ_ANSWERS = 'questions/readAnswers'
const READ_ANSWER = 'questions/readAnswer'
const CREATE_ANSWER = 'questions/createAnswer'
const UPDATE_ANSWER = 'questions/updateAnswer'
const REMOVE_ANSWER = 'questions/removeAnswer'


// ACTION CREATORS
const loadQuestions = (allQuestions) => {
  return {
    type: READ_QUESTIONS,
    payload: allQuestions
  };
};

const loadQuestion = (question) => {
  return {
    type: READ_QUESTION,
    payload: question
  };
};

const createQuestion = (newQuestion) => {
  return {
    type: CREATE_QUESTION,
    payload: newQuestion
  };
};

const updateQuestion = (updatedQuestion) => {
  return {
    type: UPDATE_QUESTION,
    payload: updatedQuestion
  };
};

const removeQuestion = (toDeleteQuestion) => {
  return {
    type: REMOVE_QUESTION,
    payload: toDeleteQuestion
  };
};

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
export const getAllQuestions = () => async (dispatch) => {
  const res = await fetch('/api/questions');

  if (res.ok) {
    const allQuestions = await res.json();
    console.log(allQuestions);
    dispatch(loadQuestions(allQuestions));
    return allQuestions;
  }
}

export const getSingularQuestion = (questId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questId}`)

  if (res.ok) {
    const singularQuestion = await res.json();
    console.log('SINGULARITY ---------->', singularQuestion)
    dispatch(loadQuestion(singularQuestion))
    return singularQuestion;
  }
}

export const createAQuestion = (newQuestion) => async (dispatch) => {
  const res = await fetch('/api/questions/', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newQuestion
    })
  })

  if (res.ok) {
    const createdQuestion = await res.json();
    dispatch(createQuestion(createdQuestion));
    return createdQuestion
  }
}

export const updatedAQuestion = (questId, editedInfo) => async (dispatch) => {
  const res = await fetch('/api/questions/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questId,
      editedInfo
    })
  })

  if (res.ok) {
    const updatedQuestion = await res.json()
    dispatch(updateQuestion(updatedQuestion))
    return updatedQuestion
  }
}

export const removeAQuestion = (questId) => async (dispatch) => {
  const res = await fetch('/api/questions/', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questId
    })
  })

  if (res.ok) {
    const deletedQuestion = await res.json();
    dispatch(removeQuestion(deletedQuestion));
  }
}

// REDUCE ME
const initialState = {
  allQuestions: {},
  singleQuestion: {}
}

const questionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case READ_QUESTIONS:
      const questionsState = { ...state, allQuestions: { ...state.allQuestions } };
      action.payload.questions.forEach(question => {
        questionsState.allQuestions[question.id] = question
      })
      return questionsState
    case READ_QUESTION:
      const aQuestionState = { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } };
      aQuestionState.singleQuestion = action.payload
      return aQuestionState
    case CREATE_QUESTION:
      const createQueState = { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } };
      createQueState.allQuestions[action.payload.id] = action.payload;
      createQueState.singleQuestion = action.payload;
      return createQueState;
    case UPDATE_QUESTION: {
      const updatedQueState = { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } }
      updatedQueState.singleQuestion = action.payload;
      return updatedQueState;
    }
    case REMOVE_QUESTION: {
      const removalState = { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } }
      delete removalState.allQuestions[action.payload.id]
      delete removalState.singleQuestion[action.payload.id]
      return removalState
    }
    default:
      return state;
  }
}

export default questionsReducer
