import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Tag, { TagDocument } from '@api/models/Tag'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createTag = (body: Partial<TagDocument>) =>
  createDoc('Error create Tag', Tag, body)

export const getTagExist = (
  exist: boolean,
  filter?: FilterQuery<TagDocument>,
  projection?: ProjectionType<TagDocument>,
  options?: QueryOptions<TagDocument>
) =>
  docExist(
    'Error get Tag exist',
    Tag,
    'Tag',
    exist,
    filter,
    projection,
    options
  )

export const getTag = (
  filter?: FilterQuery<TagDocument>,
  projection?: ProjectionType<TagDocument>,
  options?: QueryOptions<TagDocument>
) => getDoc('Error get Tag', Tag, filter, projection, options)

export const getAllTag = (
  filter: FilterQuery<TagDocument>,
  projection?: ProjectionType<TagDocument>,
  options?: QueryOptions<TagDocument>
) => getAllDocs('Error get all Tags', Tag, filter, projection, options)

export const deleteTag = (
  filter: FilterQuery<TagDocument>,
  options?: QueryOptions<TagDocument>
) => deleteDoc('Error delete Tag', Tag, filter, options)

export const updateTag = (
  filter: FilterQuery<TagDocument>,
  update?: UpdateQuery<TagDocument>,
  options?: QueryOptions<TagDocument>
) => updateDoc('Error update Tag', Tag, filter, update, options)
