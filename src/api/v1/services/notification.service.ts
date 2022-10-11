import {
  FilterQuery,
  ProjectionType,
  QueryOptions,
  UpdateQuery
} from 'mongoose'
import Notification, { NotificationDocument } from '@api/models/Notification'
import {
  createDoc,
  getDoc,
  getAllDocs,
  deleteDoc,
  updateDoc,
  docExist
} from './db.service'
import { FuncHandleService } from '@api/utils/functions'
import { socketioCons } from '@api/constants'

export const createFollowNofication = (body: Partial<NotificationDocument>) =>
  FuncHandleService('Error create follow nofication', async () => {
    const notification = await Notification.create({ ...body })
    if (global.socket) {
      global.socket.emit(socketioCons.events.NOTIFICATION, notification)
    }
  })

export const createNotification = (body: Partial<NotificationDocument>) =>
  createDoc('Error create Notification', Notification, body)

export const getNotificationExist = (
  exist: boolean,
  filter?: FilterQuery<NotificationDocument>,
  projection?: ProjectionType<NotificationDocument>,
  options?: QueryOptions<NotificationDocument>
) =>
  docExist(
    'Error get Notification exist',
    Notification,
    'Notification',
    exist,
    filter,
    projection,
    options
  )

export const getNotification = (
  filter?: FilterQuery<NotificationDocument>,
  projection?: ProjectionType<NotificationDocument>,
  options?: QueryOptions<NotificationDocument>
) => getDoc('Error get Notification', Notification, filter, projection, options)

export const getAllNotification = (
  filter: FilterQuery<NotificationDocument>,
  projection?: ProjectionType<NotificationDocument>,
  options?: QueryOptions<NotificationDocument>
) =>
  getAllDocs(
    'Error get all Notifications',
    Notification,
    filter,
    projection,
    options
  )

export const deleteNotification = (
  filter: FilterQuery<NotificationDocument>,
  options?: QueryOptions<NotificationDocument>
) => deleteDoc('Error delete Notification', Notification, filter, options)

export const updateNotification = (
  filter: FilterQuery<NotificationDocument>,
  update?: UpdateQuery<NotificationDocument>,
  options?: QueryOptions<NotificationDocument>
) =>
  updateDoc('Error update Notification', Notification, filter, update, options)
