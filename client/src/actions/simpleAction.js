export const ADD_BOOK = 'ADD_BOOK'
export const UPDATE_BOOKS = 'UPDATE_BOOKS'
export const DELETE_BOOK = 'DELETE_BOOK'
export const UPDATE_STATE = 'UPDATE_STATE'
export const UPDATE_USER = 'UPDATE_USER'
export const UPDATE_COLUMNS = 'UPDATE_COLUMNS'

/*
 * action creators
 */

export function addBook(columnID, book) {
  return { type: ADD_BOOK, columnID, book }
}
export function deleteBook(columnID, book) {
  return { type: DELETE_BOOK, columnID, book }
}

export function updateBooks(books) {
  return { type: UPDATE_BOOKS, books }
}
export function updateState(state) {
  return { type: UPDATE_STATE, state }
}
export function updateUser(user) {
  return { type: UPDATE_USER, user }
}
export function updateColumns(columns) {
  return { type: UPDATE_COLUMNS, columns }
}
