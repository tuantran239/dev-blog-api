import { Request, Response, NextFunction } from 'express'
import amqp from 'amqplib'
import logger from '@api/utils/logger'
import { rabbitmqConf } from '@config'
import { sendLinkVerify } from '@api/services/auth.service'
import { uploadFile, uploadMultiFile } from '@api/services/upload.service'
import { createFollowNofication } from '@api/services/notification.service'
import { rabbitmqCons } from '@api/constants'
import { NotificationType } from '@api/types/notification'

const consumer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const connection = await amqp.connect(
      `amqp://${rabbitmqConf.host}:${rabbitmqConf.port}`
    )
    const channel = await connection.createChannel()

    await channel.assertQueue(rabbitmqCons.queue.EMAIL)
    await channel.assertQueue(rabbitmqCons.queue.NOTIFICATION)
    await channel.assertQueue(rabbitmqCons.queue.UPLOAD_SINGLE)
    await channel.assertQueue(rabbitmqCons.queue.UPLOAD_MULTI)

    channel.consume(rabbitmqCons.queue.EMAIL, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        await sendLinkVerify(data.email, data.method, data.token, data.link)
        channel.ack(msg)
      }
    })

    channel.consume(rabbitmqCons.queue.NOTIFICATION, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        switch (data.notificationType) {
          case NotificationType.FOLLOW:
            await createFollowNofication({ ...data })
            channel.ack(msg)
            break
        }
      }
    })

    channel.consume(rabbitmqCons.queue.UPLOAD_SINGLE, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        if (data.file) {
          data.file.buffer = Buffer.from(data.file.buffer.data)
        }
        await uploadFile(data.folder, data.file, data.resize)
        channel.ack(msg)
      }
    })

    channel.consume(rabbitmqCons.queue.UPLOAD_MULTI, async (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content.toString())
        let files: any[] = []
        if (data.files && data.files instanceof Array) {
          files = data.files.map((file: any) => {
            file.buffer = Buffer.from(file.buffer.data)
            return file
          })
        }
        await uploadMultiFile(data.folder, files, data.resize)
        channel.ack(msg)
      }
    })
  } catch (error: any) {
    logger.error({ error: error.message }, 'Error consumer rabbitmq')
  }
  next()
}

export default consumer
