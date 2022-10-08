import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Post, { PostDocument } from '@api/models/Post'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createPost = (body: Partial<PostDocument>) =>
  createDoc('Error create Post', Post, body)

export const getPostExist = (
  exist: boolean,
  filter?: FilterQuery<PostDocument>,
  projection?: ProjectionType<PostDocument>,
  options?: QueryOptions<PostDocument>
) =>
  docExist(
    'Error get Post exist',
    Post,
    'Post',
    exist,
    filter,
    projection,
    options
  )

export const getPost = (
  filter?: FilterQuery<PostDocument>,
  projection?: ProjectionType<PostDocument>,
  options?: QueryOptions<PostDocument>
) => getDoc('Error get Post', Post, filter, projection, options)

export const getAllPost = (
  filter: FilterQuery<PostDocument>,
  projection?: ProjectionType<PostDocument>,
  options?: QueryOptions<PostDocument>
) => getAllDocs('Error get all Posts', Post, filter, projection, options)

export const deletePost = (
  filter: FilterQuery<PostDocument>,
  options?: QueryOptions<PostDocument>
) => deleteDoc('Error delete Post', Post, filter, options)

export const updatePost = (
  filter: FilterQuery<PostDocument>,
  update?: UpdateQuery<PostDocument>,
  options?: QueryOptions<PostDocument>
) => updateDoc('Error update Post', Post, filter, update, options)
