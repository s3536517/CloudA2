import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from 'axios'
import Grid from './grid'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { updateBooks } from '../actions/simpleAction'
import ClientIds from '../config/config'

import PreBook from './book/searchBook'
import {
  formatTitle,
  formatSubtitle,
  formatAuthors,
  formatCategories,
  formatDescription,
  formatPageCount,
  formatPicture,
  formatRatingsCount,
  formatRating
} from '../helper/format'

function BookObject(
  id,
  title,
  subtitle,
  author,
  averageRating,
  description,
  thumbnail,
  infoLink,
  ratingsCount,
  pageCount,
  categories,
  ISBN
) {
  this.id = id
  this.title = title
  this.subtitle = subtitle
  this.author = author
  this.averageRating = averageRating
  this.description = description
  this.thumbnail = thumbnail
  this.infoLink = infoLink
  this.ratingsCount = ratingsCount
  this.pageCount = pageCount
  this.categories = categories
  this.ISBN = ISBN
}

function duplicateBooks(columns, newBookID) {
  for (const x in columns) {
    const bookIds = columns[x].bookIds
    for (const y in bookIds) {
      if (bookIds[y].id === newBookID) {
        return true
      }
    }
  }
  return false
}

function fetchISBN(item) {
  if (item.industryIdentifiers) {
    for (var x in item.industryIdentifiers) {
      if (item.industryIdentifiers[x].type.includes('ISBN')) {
        return item.industryIdentifiers[x].identifier
      }
    }
  }
  return null
}

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.blue, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.blue, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto'
    },
    margin: 10
  },
  searchIcon: {
    width: theme.spacing.unit * 10,
    height: '33px',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200
      }
    }
  },
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    paddingLeft: '20px',
    paddingRIght: '20px'
  }
})

class BookData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ' '
    }
  }

  handleInputChange = event => {
    this.setState({ query: event.target.value }, () => {
      if (this.state.query && this.state.query.length >= 1) {
        axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${
              this.state.query
            }&maxResults=4&key=${ClientIds.GOOGLE_API_KEY}`
          )
          .then(res => {
            var newListOfBooks = []
            const columns = this.props.columns

            if (res.data.items !== undefined) {
              res.data.items.forEach(function(element) {
                var newBookID = element.id
                var item = element.volumeInfo
                var authors = []
                const ISBN = fetchISBN(item)
                const duplicateBook = duplicateBooks(columns, newBookID)

                if (duplicateBook === false) {
                  if (item.authors === undefined) {
                    authors = null
                  } else {
                    authors = item.authors
                  }

                  var newBook = new BookObject(
                    newBookID,
                    formatTitle(item.title),
                    formatSubtitle(item.subtitle),
                    formatAuthors(authors),
                    formatRating(item.averageRating),
                    formatDescription(item.description),
                    formatPicture(item.imageLinks),
                    item.infoLink,
                    formatRatingsCount(item.ratingsCount),
                    formatPageCount(item.pageCount),
                    formatCategories(item.categories),
                    ISBN
                  )
                  newListOfBooks.push(newBook)
                }
              })
            }
            this.props.updateBooks(newListOfBooks)
          })
      }
    })
  }

  render() {
    const { classes } = this.props
    var listOfBooks = this.props.books
    const arrayOfBooks = []

    if (this.state.query.length > 1) {
      for (var book in listOfBooks) {
        arrayOfBooks.push(listOfBooks[book])
      }
    }

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search for books…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onChange={this.handleInputChange}
        />
        <div className={classes.gridContainer}>
          {arrayOfBooks.map((book, index) => (
            <PreBook book={book} />
          ))}
        </div>
        <Grid />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.simpleReducer.books,
    columns: state.simpleReducer.columns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateBooks: books => dispatch(updateBooks(books))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(BookData))
