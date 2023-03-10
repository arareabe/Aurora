// import { csrfFetch } from '.csrf';

// TYPES
const READ_QUESTIONS = 'questions/readQuestions'
const READ_QUESTION = 'questions/readQuestion'
const CREATE_QUESTION = 'questions/createQuestion'
const UPDATE_QUESTION = 'questions/updateQuestion'
const REMOVE_QUESTION = 'questions/removeQuestion'


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
  console.log("NEW QUESTION ------------------>", newQuestion)
  const res = await fetch('/api/questions/', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuestion)
  })

  console.log("THE REEEEEEEEEEEEEEEEEEEEEEEEEEEES", res)

  if (res.ok) {
    const createdQuestion = await res.json();
    console.log('CREEEEAAAA', createdQuestion)
    dispatch(createQuestion(createdQuestion));
    return createdQuestion
  }
}

export const updatedAQuestion = (editedInfo, questId) => async (dispatch) => {
  console.log("EDITED QUESTION ===============", editedInfo)
  const res = await fetch('/api/questions/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      editedInfo
    )
  })

  if (res.ok) {
    const updatedQuestion = await res.json()
    dispatch(updateQuestion(updatedQuestion))
    return updatedQuestion
  }
}

export const removeAQuestion = (questId) => async (dispatch) => {
  console.log("QUESTION ID -----------------", questId)
  const res = await fetch('/api/questions/', {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questId
    })
  })

  if (res.ok) {
    const deletedQuestion = await res.json();
    console.log("DELETEIONNNNNNNNNNNNNNNNNNNNNNNNN,", deletedQuestion)
    dispatch(removeQuestion(questId));
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
      updatedQueState.allQuestions[action.payload.id] = action.payload
      return updatedQueState;
    }
    case REMOVE_QUESTION: {
      const removalState = { ...state, allQuestions: { ...state.allQuestions }, singleQuestion: { ...state.singleQuestion } }
      delete removalState.allQuestions[action.payload]
      delete removalState.singleQuestion[action.payload]
      return removalState
    }
    default:
      return state;
  }
}

export default questionsReducer
