import { DocumentType, getModelForClass } from '@typegoose/typegoose'
import { User } from './User'
import { sign } from '../../helpers/jwt'

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})

interface LoginOptions {
  email: string
  name: string
  todo?: any
  token?: any
}

export async function getOrCreateUser(loginOptions: LoginOptions) {
  if (!loginOptions.name) {
    throw new Error()
  }
  if (!loginOptions.email) {
    throw new Error()
  }
  let user: DocumentType<User> | undefined
  user = await UserModel.findOne({ email: loginOptions.email })
  if (!user) {
    if (!(loginOptions.email || loginOptions.name)) {
      throw new Error()
    }

    const todos = [
      {id: (+new Date()).toString() + 1, title: 'Hi. This is the task scheduler Shit', context: '',completed: false, branches: [], history: []},
      {id: (+new Date()).toString() + 2, title: 'The task can be repeated by pressing the circular arrow. Then the task will be marked as completed, and the new task will be added to the end of the list', context: '',completed: false, branches: [], history: []},
      {id: (+new Date()).toString() + 3, title: 'Click on the task and mark it done by clicking on the check mark', context: '',completed: false, branches: [], history: []}
    ]
    const params = {
      name: loginOptions.name,
      email: loginOptions.email,
      todo: {now: todos, archive: []},
    } as any
    user = (await new UserModel({
      ...params,
      token: await sign(params)
    }).save()) as DocumentType<User>
  }
  return user
}