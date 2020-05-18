import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { Button, withStyles } from '@material-ui/core'

import { deleteBook } from '../../actions/simpleAction'

const styles = theme => ({
  goodreadsButton: {
    position: 'absolute',
    borderRadius: '50%',
    margin: 69,
    '&:hover': {
      opacity: 0.7,
      background: 'black'
    },
    width: 35
  },
  goodreadsButtonStacked: {
    fontSize: 10,
    borderRadius: '50%',
    '&:hover': {
      opacity: 0.5
    },
    width: 35,
    padding: 8
  },
  deleteButton: {
    fontSize: 10,
    width: '100%',
    marginBottom: 32
  },
  toggleButton: {
    width: '100%',
    fontSize: 10
  },
  picture: {
    borderRadius: '50%',
    height: 100,
    padding: 5,
    width: 100
  }
})

const Container = styled.div`
  background: linear-gradient(
    236deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 255, 255, 1) 100%,
    rgba(249, 247, 255, 1) 100%
  );
  border: 8px double #b2c2bf;
  border-radius: 10px;
  margin-bottom: 30px;
  border-color: ${props => (props.isDragging ? 'lightblue' : 'lightred ')};
  max-height: 460px;
`

const StackedContainer = styled.div`
  background: linear-gradient(
    236deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(245, 255, 255, 1) 100%,
    rgba(249, 247, 255, 1) 100%
  );
  border: 8px double #b2c2bf;
  border-radius: 10px;
  margin-bottom: 10px;
  border-color: ${props => (props.isDragging ? 'lightblue' : 'lightred ')};
  min-height: 80px;
  position: relative;
`

const StackedInfo = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  padding: 5px 2px 2px 0px;
  position: relative;
`

const BookInfoTop = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  padding: 10px 8px 8px 0px;
`

const BookInfoBottom = styled.div`
  width: 100%;
  height: 65%;
  display: none;
  min-height: 200px;
`

const TitleAndSubtitle = styled.div`
  width: 100%;
  height: 100%;
`

const PictureDiv = styled.div`
  padding-left: 10px;
`

const ButtonDiv = styled.div`
  padding-right: 6px;
`

const Title = styled.h1`
  padding: 5px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  color: #474747;
  width: 100%;
`

const Author = styled.h3`
  padding-left: 10px;
  font-family: 'Helvetica';
  font-size: 13px;
  color: #484f4f;
  line-height: 1.3em;
  overflow: hidden;
  margin: 2px;
  float: center;
`

const Categories = styled.h3`
  font-family: 'Helvetica';
  color: #bc8f8f;
  line-height: 1.2em;
  font-size: 20px;
`
const Metrics = styled.h3`
  font-family: 'Helvetica';
  color: #3b3a30;
  line-height: 1.5em;
  font-size: 15px;
  font-weight: 400;
  padding-left: 10px;
`

const Description = styled.p`
  margin: 0 0 5px 12px;
  font-family: 'Verdana', serif;
  color: #8d8d8d;
  line-height: 1.3em;
  font-size: 15px;
  overflow: hidden;
  padding-right: 10px;
  max-height: 180px;
  padding-left: 10px;
`

function validISBN(ISBN, className) {
  if (ISBN !== null) {
    const goodreadsLink = 'https://www.goodreads.com/book/isbn/' + ISBN

    return (
      <a href={goodreadsLink}>
        <img
          src="http://d.gr-assets.com/misc/1454549143-1454549143_goodreads_misc.png"
          className={className}
        />
      </a>
    )
  }
  return null
}
function StackedBooks(props) {
  const { classes, columnID, book, deleteBook } = props.props
  const goodreads = validISBN(book.ISBN, classes.goodreadsButtonStacked)
  const authors = book.author
  const title = book.title

  return (
    <StackedContainer>
      <StackedInfo>
        <ButtonDiv className={classes.goodreadsButtonStacked}>
          {goodreads}
        </ButtonDiv>
        <TitleAndSubtitle>
          <Title>{title}</Title>
          {authors.map(author => (
            <Author> {author} </Author>
          ))}
        </TitleAndSubtitle>
        <br />
        <ButtonDiv>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.deleteButton}
            onClick={() => deleteBook(columnID, book.id)}
          >
            Delete
          </Button>
        </ButtonDiv>
      </StackedInfo>
    </StackedContainer>
  )
}

function RegularBooks(props) {
  const { classes, columnID, book, deleteBook } = props.props
  const goodreads = validISBN(book.ISBN, classes.goodreadsButton)

  const picture = book.thumbnail
  const description = book.description
  const authors = book.author
  const rating = book.averageRating
  const ratingsCount = book.ratingsCount
  const pageCount = book.pageCount
  const categories = book.categories
  const title = book.title

  return (
    <Container>
      <BookInfoTop>
        <PictureDiv>
          {goodreads}
          <img src={picture} className={classes.picture} />
        </PictureDiv>
        <TitleAndSubtitle>
          <Title>{title}</Title>
          {authors.map(author => (
            <Author> {author} </Author>
          ))}
        </TitleAndSubtitle>
        <ButtonDiv>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.deleteButton}
            onClick={() => deleteBook(columnID, book.id)}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            className={classes.toggleButton}
            onClick={() => props.toggleDescription()}
          >
            {props.isToggleOn ? 'Hide' : 'Open'}
          </Button>
        </ButtonDiv>
      </BookInfoTop>
      <BookInfoBottom id={book.id}>
        <Metrics>
          {categories.map(category => (
            <Categories> {category} </Categories>
          ))}
          <p>{rating}</p>
          <p>{ratingsCount}</p>
          <p>{pageCount}</p>
        </Metrics>
        <Description>
          <hr />
          {description}
        </Description>
      </BookInfoBottom>
    </Container>
  )
}

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }

    this.toggleDescription = this.toggleDescription.bind(this)
  }

  toggleDescription() {
    var bookDescription = document.getElementById(this.props.book.id)

    if (this.state.isToggleOn) {
      bookDescription.style.display = 'none'
      this.setState(state => {
        return { isToggleOn: !state.isToggleOn }
      })
    } else {
      bookDescription.style.display = 'flex'
      this.setState(state => {
        return { isToggleOn: !state.isToggleOn }
      })
    }
  }

  render() {
    const { book, isStacked, index } = this.props
    let bookType = null

    if (book.ISBN === null) {
      console.log('yo')
      //goodreadsButton.style.display = 'none'
      // bookDescription.style.display = 'none'
    }

    if (isStacked) {
      bookType = <StackedBooks props={this.props} />
    } else {
      bookType = (
        <RegularBooks
          props={this.props}
          toggleDescription={this.toggleDescription}
          isToggleOn={this.state.isToggleOn}
        />
      )
    }

    return (
      <Draggable key={book.id} draggableId={book.id} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            {bookType}
          </div>
        )}
      </Draggable>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteBook: (columnID, book) => dispatch(deleteBook(columnID, book))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Book))
