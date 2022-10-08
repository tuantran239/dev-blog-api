import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Bookmark, { BookmarkDocument } from '@api/models/Bookmark'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createBookmark = (body: Partial<BookmarkDocument>) =>
  createDoc('Error create Bookmark', Bookmark, body)

export const getBookmarkExist = (
  exist: boolean,
  filter?: FilterQuery<BookmarkDocument>,
  projection?: ProjectionType<BookmarkDocument>,
  options?: QueryOptions<BookmarkDocument>
) =>
  docExist(
    'Error get Bookmark exist',
    Bookmark,
    'Bookmark',
    exist,
    filter,
    projection,
    options
  )

export const getBookmark = (
  filter?: FilterQuery<BookmarkDocument>,
  projection?: ProjectionType<BookmarkDocument>,
  options?: QueryOptions<BookmarkDocument>
) => getDoc('Error get Bookmark', Bookmark, filter, projection, options)

export const getAllBookmark = (
  filter: FilterQuery<BookmarkDocument>,
  projection?: ProjectionType<BookmarkDocument>,
  options?: QueryOptions<BookmarkDocument>
) => getAllDocs('Error get all Bookmarks', Bookmark, filter, projection, options)

export const deleteBookmark = (
  filter: FilterQuery<BookmarkDocument>,
  options?: QueryOptions<BookmarkDocument>
) => deleteDoc('Error delete Bookmark', Bookmark, filter, options)

export const updateBookmark = (
  filter: FilterQuery<BookmarkDocument>,
  update?: UpdateQuery<BookmarkDocument>,
  options?: QueryOptions<BookmarkDocument>
) => updateDoc('Error update Bookmark', Bookmark, filter, update, options)
