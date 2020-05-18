export function formatPicture(thumbnail) {
  if (thumbnail === undefined) {
    return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Draw_book.png/1300px-Draw_book.png'
  }

  return thumbnail.thumbnail
}

export function formatTitle(title) {
  if (title.length > 30) {
    return title.slice(0, 30) + '.... '
  }
  return title
}
export function formatSubtitle(subtitle) {
  if (subtitle === undefined) {
    return '-'
  } else if (subtitle.length > 40) {
    return subtitle.slice(0, 40) + '.... '
  }
  return subtitle
}

export function formatDescription(description) {
  if (description !== undefined && description.length > 650) {
    return description.slice(0, 650) + ' ..... '
  } else if (description === undefined) {
    return 'No description available.'
  }
  return '  ' + description
}

export function formatAuthors(authors) {
  if (authors == null) {
    return []
  } else if (authors.length > 2) {
    authors[1] += ' and others..'
    return authors.slice(0, 2)
  }

  return authors
}

export function formatRating(rating) {
  if (rating === undefined) {
    return 'Ratings: N/A'
  }

  return 'Ratings: ' + rating + '/5'
}

export function formatRatingsCount(ratings) {
  if (ratings === undefined || ratings.length === 0) {
    return 'Reviews: N/A '
  }

  return 'Reviews: ' + ratings
}

export function formatPageCount(pageCount) {
  if (pageCount === undefined) {
    return ' '
  }

  return pageCount + ' pages'
}

export function formatCategories(categories) {
  if (categories == null) {
    return []
  }

  return categories
}
