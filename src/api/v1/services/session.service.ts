import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Session, { SessionDocument } from '@api/models/Session'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'

export const createSession = (body: Partial<SessionDocument>) =>
  createDoc('Error create Session', Session, body)

export const getSessionExist = (
  exist: boolean,
  filter?: FilterQuery<SessionDocument>,
  projection?: ProjectionType<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) =>
  docExist(
    'Error get Session exist',
    Session,
    'Session',
    exist,
    filter,
    projection,
    options
  )

export const getSession = (
  filter?: FilterQuery<SessionDocument>,
  projection?: ProjectionType<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) => getDoc('Error get session', Session, filter, projection, options)

export const getAllSession = (
  filter: FilterQuery<SessionDocument>,
  projection?: ProjectionType<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) => getAllDocs('Error get all sessions', Session, filter, projection, options)

export const deleteSession = (
  filter: FilterQuery<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) => deleteDoc('Error delete session', Session, filter, options)

export const updateSession = (
  filter: FilterQuery<SessionDocument>,
  update?: UpdateQuery<SessionDocument>,
  options?: QueryOptions<SessionDocument>
) => updateDoc('Error update session', Session, filter, update, options)
