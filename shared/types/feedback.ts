import { z } from 'zod';

export const FEEDBACK_RATINGS = [
  'very-helpful',
  'helpful',
  'not-helpful',
  'confusing'
] as const

export type FeedbackRating = typeof FEEDBACK_RATINGS[number]

export interface FeedbackOption {
  emoji: string
  label: string
  value: FeedbackRating
  score: number
}

export const FEEDBACK_OPTIONS: FeedbackOption[] = [
  { emoji: '🤩', label: 'Very helpful', value: 'very-helpful', score: 4 },
  { emoji: '🙂', label: 'Helpful', value: 'helpful', score: 3 },
  { emoji: '☹️', label: 'Not helpful', value: 'not-helpful', score: 2 },
  { emoji: '😰', label: 'Confusing', value: 'confusing', score: 1 }
]

export interface FeedbackSubmission {
  rating: FeedbackRating
  feedback?: string
  path: string
  title: string
}

export const feedbackSchema = z.object({
    rating: z.enum(FEEDBACK_RATINGS),
    feedback: z.string().optional(),
    path: z.string(),
    title: z.string(),
});

export const feedbackFormSchema = z.object({
  rating: z.enum(FEEDBACK_RATINGS).nullable(),
  feedback: z.string().refine((val) => {
    const trimmed = val.trim()
    return trimmed === '' || trimmed.length >= 10
  }, {
    message: 'Please provide at least 10 characters or leave the field empty'
  })
})


export type FeedbackInput = z.infer<typeof feedbackSchema>