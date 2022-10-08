import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Comment, { CommentDocument } from '@api/models/Comment'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist,
  deleteDocs
} from './db.service'

export const createComment = (body: Partial<CommentDocument>) =>
  createDoc('Error create Comment', Comment, body)

export const getCommentExist = (
  exist: boolean,
  filter?: FilterQuery<CommentDocument>,
  projection?: ProjectionType<CommentDocument>,
  options?: QueryOptions<CommentDocument>
) =>
  docExist(
    'Error get Comment exist',
    Comment,
    'Comment',
    exist,
    filter,
    projection,
    options
  )

export const getComment = (
  filter?: FilterQuery<CommentDocument>,
  projection?: ProjectionType<CommentDocument>,
  options?: QueryOptions<CommentDocument>
) => getDoc('Error get Comment', Comment, filter, projection, options)

export const getAllComment = (
  filter: FilterQuery<CommentDocument>,
  projection?: ProjectionType<CommentDocument>,
  options?: QueryOptions<CommentDocument>
) => getAllDocs('Error get all Comments', Comment, filter, projection, options)

export const deleteComment = (
  filter: FilterQuery<CommentDocument>,
  options?: QueryOptions<CommentDocument>
) => deleteDoc('Error delete Comment', Comment, filter, options)

export const updateComment = (
  filter: FilterQuery<CommentDocument>,
  update?: UpdateQuery<CommentDocument>,
  options?: QueryOptions<CommentDocument>
) => updateDoc('Error update Comment', Comment, filter, update, options)
