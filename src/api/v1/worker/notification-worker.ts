import amqp from 'amqplib'
import { rabbitmqConf } from '@config'
import logger from '@api/utils/logger'
import { NotificationType } from '@api/types/notification'
import { rabbitmqCons } from '@api/constants'

type NotificationWorker = {
  sender: string
  receiver: string
  post?: string
  comment?: string
  notificationType: NotificationType
  message: string
}

export const notificationWorker = async (msg: NotificationWorker) => {
  try {
    const connection = await amqp.connect(
      `amqp://${rabbitmqConf.host}:${rabbitmqConf.port}`
    )
    const channel = await connection.createChannel()
    await channel.assertQueue(rabbitmqCons.queue.NOTIFICATION)
    await channel.sendToQueue(
      rabbitmqCons.queue.NOTIFICATION,
      Buffer.from(JSON.stringify(msg))
    )
    setTimeout(() => {
      connection.close()
    }, 1000)
  } catch (error: any) {
    logger.error(
      { error: error.message },
      'Error notification workder rabbitmq'
    )
  }
}
