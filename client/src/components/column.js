import React, { Component } from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import { Typography, withStyles, Paper } from '@material-ui/core'

import Book from './book/book'

const styles = {
  container: {
    margin: '8px',
    borderRadius: '10px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    padding: '10px'
  },
  hr: {
    border: '50px solid lightblue',
    width: '100%'
  }
}
const Hr = styled.hr`
  border: ${props => {
    if (props.title === 'To Read') {
      return 'solid #c5d5c5'
    } else if (props.title === 'In Progress') {
      return 'solid #bc5a45'
    } else {
      return 'solid #50394c'
    }
  }};
  width: 50%;
`

const BookList = styled.div`
   padding: 20px;
   transition: background-color 0.2 ease;
   background-color: ${props => (props.isDraggingOver ? '#DCDCDC' : 'white')}
   flex-grow: 1;
   min-height: 100px;
`

class Column extends Component {
  render() {
    const { column, books, classes } = this.props
    var isStacked = books.length > 3 ? true : false

    return (
      <Paper className={classes.container}>
        <Typography align="center" variant="h4" className={classes.title}>
          {column.title}
        </Typography>
        <Hr title={column.title} />
        <Droppable key={column.id} droppableId={column.id}>
          {(provided, snapshot) => (
            <BookList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {books.map((book, index) => (
                <Book
                  columnID={column.id}
                  key={book.id}
                  book={book}
                  index={index}
                  isStacked={isStacked}
                />
              ))}
            </BookList>
          )}
        </Droppable>
      </Paper>
    )
  }
}

export default withStyles(styles)(Column)
