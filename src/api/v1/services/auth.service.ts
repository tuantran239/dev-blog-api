import { AuthType } from '@api/types'
import User from '@api/models/User'
import { throwValidationError } from '@api/error/mongodb-error'
import { FuncHandleService } from '@api/utils/functions'
import { sendMail } from '@api/utils/nodemailer'
import { mailCons } from '@api/constants'

export const sendLinkVerify = async (email: string, method: string, token: string, link: string) =>
  FuncHandleService('Error send link verify', async () => {
    const href = `${link}/${token}`
    let title = 'verify Email'
    switch (method) {
      case mailCons.method.register:
        title = 'Active Account'
        break
      case mailCons.method.resetPassword:
        title = 'Reset Password'
        break
    }
    await sendMail(
      { to: email },
      { link: href, title, content: 'Click link below to verify your email' }
    )
    return token
  })

export const authEmailPassword = (email: string, password: string) =>
  FuncHandleService('Error auth email and password', async () => {
    const user = await User.findOne({ email, authType: AuthType.EMAIL }, 'email password active')
    if (!user) {
      throwValidationError('email', 'email not found', true)
    }
    const isMatch = await user?.comparePassword(password)
    if (!isMatch) {
      throwValidationError('password', 'password not match', true)
    }
    console.log(user?.active)
    if (!user?.active) {
      throwValidationError('email', 'user not active', true)
    }
    return user
  })
