import { CloseButton } from "../../CloseButton"
import { feedbackType, feedbackTypes } from ".."
import { ArrowLeft } from "phosphor-react";
import { ScreenshotButton } from './screenShotButton'
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "./loading";

interface FeedbackContentStepProps {
    feedbackType: feedbackType
    handleRestart: () => void;
    onFeedbackSent: () => void;
}

export function FeedbackContentStep({ feedbackType, handleRestart, onFeedbackSent }: FeedbackContentStepProps) {
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState('')
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    async function handleSubmitFeedback(event: FormEvent) {
        event.preventDefault();
        setIsSendingFeedback(true);
        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })
        onFeedbackSent()
    }
    return (
        <>
            <header>
                <button
                    type="button"
                    className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
                    onClick={handleRestart}
                >
                    <ArrowLeft
                        weight="bold"
                        className="w-4 h-4"
                    />
                </button>
                <span className='text-xl leading-6 flex'>
                    <img
                        src={feedbackTypeInfo.image.source}
                        alt={feedbackTypeInfo.image.alt}
                        className='w-6 h-6 flex items-center gap-2'
                    />
                    {feedbackTypeInfo.title}


                </span>

                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    className="min-w-[304px] w-full h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
                    placeholder="Tell us with details about whats happening"
                    onChange={event => setComment(event.target.value)}
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshotButton
                        onScreenshotTook={setScreenshot}
                        screenshot={screenshot}

                    />
                    <button
                        type="submit"
                        disabled={comment.length === 0 || isSendingFeedback}
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                       {isSendingFeedback? <Loading />:'Send feedback'}
                    </button>
                </footer>
            </form>


        </>
    )
}