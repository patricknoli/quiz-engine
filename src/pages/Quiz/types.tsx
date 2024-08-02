export type QuizType = {
  quiz_name: string;
  quiz_description?: string;
  questions: QuestionType[];
}

export type QuestionType = {
  question_id: number;
  question_title?: string;
  question_description?: string;
  question_image?: string;
  question_text: string;
  question_type: "one-choice" | "multiple-choice" | "input";
  answers?: AnswerType[];
  question_dependency_id?: number;
  question_dependency_answer?: number;
}

export type AnswerType = {
  answer_id: number;
  answer_text: string;
}

// "quiz_name": "Sample 1",
//   "questions": [
//     {
//       "question_text": "Is 4 a odd number?",
//       "question_type": "one-choice",
//       "answers": [
//         {
//           "answer_text": "Yes",
//           "answer_correct": false
//         },
//         {
//           "answer_text": "No",
//           "answer_correct": true
//         },
//         {
//           "answer_text": "Maybe",
//           "answer_correct": false
//         }
//       ]
//     }
//   ]