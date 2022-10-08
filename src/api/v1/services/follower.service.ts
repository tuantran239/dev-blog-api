import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Follower, { FollowerDocument } from '@api/models/Follower'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createFollower = (body: Partial<FollowerDocument>) =>
  createDoc('Error create Follower', Follower, body)

export const getFollowerExist = (
  exist: boolean,
  filter?: FilterQuery<FollowerDocument>,
  projection?: ProjectionType<FollowerDocument>,
  options?: QueryOptions<FollowerDocument>
) =>
  docExist(
    'Error get Follower exist',
    Follower,
    'Follower',
    exist,
    filter,
    projection,
    options
  )

export const getFollower = (
  filter?: FilterQuery<FollowerDocument>,
  projection?: ProjectionType<FollowerDocument>,
  options?: QueryOptions<FollowerDocument>
) => getDoc('Error get Follower', Follower, filter, projection, options)

export const getAllFollower = (
  filter: FilterQuery<FollowerDocument>,
  projection?: ProjectionType<FollowerDocument>,
  options?: QueryOptions<FollowerDocument>
) =>
  getAllDocs('Error get all Followers', Follower, filter, projection, options)

export const deleteFollower = (
  filter: FilterQuery<FollowerDocument>,
  options?: QueryOptions<FollowerDocument>
) => deleteDoc('Error delete Follower', Follower, filter, options)

export const updateFollower = (
  filter: FilterQuery<FollowerDocument>,
  update?: UpdateQuery<FollowerDocument>,
  options?: QueryOptions<FollowerDocument>
) => updateDoc('Error update Follower', Follower, filter, update, options)
