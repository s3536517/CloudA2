import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core'

import { addBook } from '../../actions/simpleAction'

const styles = theme => ({
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
  margin-left: 0.6252689%;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 22.2%;
  max-height: 460px;
  padding-left: 10px;

  :hover {
    background: lightgreen;
    opacity: 0.7;
    margin-bottom: 10px;
  }
`

const BookInfoTop = styled.div`
  width: 100%;
  height: 35%;
  display: flex;
  padding: 10px 8px 8px 0px;
`

const TitleAndSubtitle = styled.div`
  width: 100%;
  height: 100%;
`

const PictureDiv = styled.div`
  padding-left: 10px;
`

const Title = styled.h1`
  padding: 5px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 14px;
  color: #474747;
  width: 100%;
`
const Author = styled.h3`
  padding-left: 10px;
  font-family: 'Helvetica';
  font-size: 11px;
  color: #484f4f;
  line-height: 1.3em;
  overflow: hidden;
  margin: 2px;
  float: center;
`

class preBook extends Component {
  constructor(props) {
    super(props)

    this.addBook = this.addBook.bind(this)
  }

  addBook() {
    this.props.addBook('column-1', this.props.book)
  }

  render() {
    const { classes } = this.props
    var picture = this.props.book.thumbnail
    var authors = this.props.book.author
    var title = this.props.book.title

    return (
      <Container onClick={() => this.addBook()}>
        <BookInfoTop>
          <PictureDiv>
            <img src={picture} className={classes.picture} />
          </PictureDiv>
          <TitleAndSubtitle>
            <Title>{title}</Title>
            {authors.map(author => (
              <Author> {author} </Author>
            ))}
          </TitleAndSubtitle>
        </BookInfoTop>
      </Container>
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
    addBook: (columnID, book) => dispatch(addBook(columnID, book))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(preBook))
