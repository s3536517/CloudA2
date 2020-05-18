import { instance } from '../config/config'

import {
  ADD_BOOK,
  UPDATE_BOOKS,
  DELETE_BOOK,
  UPDATE_USER,
  UPDATE_COLUMNS,
  UPDATE_STATE
} from '../actions/simpleAction'

let initialState = {
  user: {
    isAuthenticated: false
  },
  books: [],
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Read',
      bookIds: []
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      bookIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'Done Reading',
      bookIds: []
    }
  },

  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default (state = initialState, action) => {
  let newState = null
  switch (action.type) {
    case ADD_BOOK:
      newState = {
        ...state,
        books: state.books.filter(book => book.id !== action.book.id),
        columns: {
          ...state.columns,
          [action.columnID]: {
            ...state.columns[action.columnID],
            bookIds: [...state.columns[action.columnID].bookIds, action.book]
          }
        }
      }
      break
    case UPDATE_BOOKS:
      newState = {
        ...state,
        books: action.books
      }
      break
    case DELETE_BOOK:
      newState = {
        ...state,
        columns: {
          ...state.columns,
          [action.columnID]: {
            ...state.columns[action.columnID],
            bookIds: state.columns[action.columnID].bookIds.filter(
              book => book.id !== action.book
            )
          }
        }
      }
      break
    case UPDATE_USER:
      newState = {
        ...state,
        user: action.user
      }
      break
    case UPDATE_COLUMNS:
      newState = {
        ...state,
        columns: action.columns
      }
      break
    case UPDATE_STATE:
      newState = action.state
      break
    default:
      newState = state
  }

  if (newState.user.isAuthenticated && state.user.isAuthenticated) {
    const newUserState = {
      ...state.user,
      userState: newState
    }
    instance.post('api/save', newUserState)
  }

  return newState
}
