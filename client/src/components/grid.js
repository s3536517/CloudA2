import React, { Component } from 'react'
import Column from './column'
import styled from 'styled-components'
import '@atlaskit/css-reset'
import { DragDropContext } from 'react-beautiful-dnd'

import { connect } from 'react-redux'
import { updateState } from '../actions/simpleAction'

const Container = styled.div`
  display: flex;
`
class grid extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.props.bookState.columns[source.droppableId]
    const finish = this.props.bookState.columns[destination.droppableId]

    if (start === finish) {
      const newBookIds = Array.from(start.bookIds)
      var bookObject

      newBookIds.forEach(function(book) {
        if (book.id === draggableId) {
          bookObject = book
        }
      })

      newBookIds.splice(source.index, 1)
      newBookIds.splice(destination.index, 0, bookObject)

      const newColumn = {
        ...start,
        bookIds: newBookIds
      }

      const newState = {
        ...this.props.bookState,
        columns: {
          ...this.props.bookState.columns,
          [newColumn.id]: newColumn
        }
      }

      this.props.updateState(newState)
    } else {
      const newBookIds = Array.from(start.bookIds)
      const newBook = newBookIds.splice(source.index, 1)[0]

      const newStart = {
        ...start,
        bookIds: newBookIds
      }

      const finishBookIds = Array.from(finish.bookIds)

      finishBookIds.splice(destination.index, 0, newBook)

      const newFinish = {
        ...finish,
        bookIds: finishBookIds
      }

      const newState = {
        ...this.props.bookState,
        columns: {
          ...this.props.bookState.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
      this.props.updateState(newState)
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.props.bookState.columnOrder.map(columnId => {
            const column = this.props.bookState.columns[columnId]
            return (
              <Column key={column.id} column={column} books={column.bookIds} />
            )
          })}
        </Container>
      </DragDropContext>
    )
  }
}

function mapStateToProps(state) {
  return {
    bookState: state.simpleReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateState: state => dispatch(updateState(state))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(grid)
