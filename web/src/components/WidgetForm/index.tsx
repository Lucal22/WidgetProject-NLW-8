import React, { useState } from 'react'
import { CloseButton } from '../CloseButton'
import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from './steps/feedbackTypeStep'
import { FeedbackContentStep } from './steps/feedbackContentStep'
import { FeedbackSuccessStep } from './steps/feedbackSuccessStep'


export const feedbackTypes = {
    BUG: {
        title: 'Issue',
        image: {
            source: bugImageUrl,
            alt: 'Image of insect'
        }
    },
    IDEIA: {
        title: 'Idea',
        image: {
            source: ideaImageUrl,
            alt: 'Image of a lamp'
        }
    },
    OTHER: {
        title: 'Others',
        image: {
            source: thoughtImageUrl,
            alt: 'Image of a baloon'
        }
    }
}

export type feedbackType = keyof typeof feedbackTypes

export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackType(null)
        setFeedbackSent(false)
    }

    return (
        <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
            {feedbackSent ? (
                <FeedbackSuccessStep
                onFeedbackRestartRequested = {handleRestartFeedback}
                />
            ) : (
                <>
                    {!feedbackType ? (

                        <FeedbackTypeStep
                            onFeedbackTypeChanged={setFeedbackType}
                        />) :

                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            handleRestart={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />}
                </>
            )}

            <footer className='text-sx text-neutral-400'>
                Made by Lucal and Rocketseat
            </footer>

        </div>
    )
}