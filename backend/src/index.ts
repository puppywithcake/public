import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from '@koa/cors'
import * as Router from 'koa-router'
import * as config from 'config'
import { promises as fs, read } from 'fs'
import * as path from 'path'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import {authenticate} from './middlewares/authenticate'

import { DocumentType, getModelForClass, prop } from '@typegoose/typegoose'
import { runMongo } from './models/index'
import {UserModel, getOrCreateUser} from './models/user/index'

// Run mongo
runMongo().then(() => {
  console.log('Mongo connected')
  console.log(UserModel)
})

const app = new Koa()

export async function main() {
  const router = new Router()

  router.post('/users', authenticate, async (ctx, next) => {
    let users = await UserModel.find({})
    ctx.body = {
      users
    }
  })

  router.post('/update_todo', authenticate, async (ctx, next) => {
    const user = await getOrCreateUser(ctx.state.user)
    user.todo = ctx.request.body.todo
    await user.save()

    ctx.body = {
      message: 'ok',
      user: ctx.state.user
    }
  })

  router.post('/loading_todo', authenticate, async (ctx, next) => {
    ctx.body = {
      message: 'ok',
      user: ctx.state.user
    }
  })

  router.post('/auth', async (ctx, next) => {
    console.log(ctx.request.body)
    const user = await getOrCreateUser(ctx.request.body)
    ctx.body = {
      message: 'ok',
      user
    }
  })

  // Run app
  app.use(cors({ origin: '*' }))
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())

  app.use(mount('/', serve(path.join(__dirname, '../public'))))

  app.use(async (ctx) => {
    ctx.set('Content-Type', 'text/html')
    ctx.body = await fs.readFile(path.join(__dirname, '../public/index.html'))
  })

  app.listen(config.get('port'))
}

main()