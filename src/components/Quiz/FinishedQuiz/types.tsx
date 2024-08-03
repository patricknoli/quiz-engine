import { AnsweredQuestionType, QuestionType } from "../../../pages/Quiz/types"

export type FinishedQuizProps = {
  answeredQuestions: AnsweredQuestionType[];
  questions: QuestionType[]
}