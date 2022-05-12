import express from 'express'
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository'
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter'


const routes = express.Router()



export default routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    try {
        const prismaFeedbackRepository = new PrismaFeedbackRepository()
        const nodemailerAdapter = new NodemailerMailAdapter()

        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbackRepository,
            nodemailerAdapter
        )

        await submitFeedbackUseCase.execute(
            {
                type,
                comment,
                screenshot
            }
        )

        return res.status(201).send()
    }catch (err){
            console.log(err);
            return res.status(500).send();
    }
})
