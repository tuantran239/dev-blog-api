import amqp from 'amqplib'
import { rabbitmqConf } from '@config'
import logger from '@api/utils/logger'
import { rabbitmqCons } from '@api/constants'

type SendMailWorker = {
  email: string
  method: string
  token: string
  link: string
}

export const sendMailWorker = async (msg: SendMailWorker) => {
  try {
    const connection = await amqp.connect(
      `amqp://${rabbitmqConf.host}:${rabbitmqConf.port}`
    )
    const channel = await connection.createChannel()
    await channel.assertQueue(rabbitmqCons.queue.EMAIL)
    await channel.sendToQueue(
      rabbitmqCons.queue.EMAIL,
      Buffer.from(JSON.stringify(msg))
    )
    setTimeout(() => {
      connection.close()
    }, 1000)
  } catch (error: any) {
    logger.error({ error: error.message }, 'Error email workder rabbitmq')
  }
}
