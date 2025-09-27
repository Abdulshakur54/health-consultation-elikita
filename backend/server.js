import express from 'express'
import { createServer } from 'node:http'
import "dotenv/config"
import cors from 'cors'
import { connectDB } from './lib/db.js'
import { authRouter } from './routes/authRoute.js'
import { consultationRouter } from './routes/consultationRouter.js'
import { authenticate } from './middlewares/auth.js'
import { userRouter } from './routes/userRoute.js'


const app = express()
app.use(express.json({ limit: '4mb' }))
app.use(cors())

await connectDB()

app.get('/api/v1/status', (req, res) => {
    res.send('Server is live')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/consultations', authenticate, consultationRouter)
app.use('/api/v1/users', authenticate, userRouter)

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server is listening at port ${port}`) })