import { useEffect, useState } from "react"
import { Container } from "./styles"
import { FinishedQuizProps } from "./types"
import { QuestionType } from "../../../pages/Quiz/types";
import { useNavigate } from "react-router-dom";

const FinishedQuiz: React.FC<FinishedQuizProps> = ({ answeredQuestions, questions }) => {
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionType[]>([]);
  const navigate = useNavigate();

  function filterQuestionsOptions() {
    let filteredQuestionsObj: QuestionType[] = [];
    questions.map((question) => {
      const currentAnsweredQuestion = answeredQuestions.find((item) => item.question_id == question.question_id);
      let questionItem = question;
      questionItem.answers = question.answers?.filter((item) => currentAnsweredQuestion?.options.find((option) => option.answer_id == item.answer_id));
      filteredQuestionsObj.push(questionItem);
    });
    setFilteredQuestions(filteredQuestionsObj);
  }

  useEffect(() => {
    filterQuestionsOptions()
  }, [])

  return (
    <Container>
      <h2>Well done!</h2>
      <p>Thank you for your response.</p>

      <div className="review">
        <p>Your answers:</p>

        <div className="questions-list">
          {answeredQuestions.filter((question) => question.answer_text || question.options.length > 0).map((question) => (
            <div key={question.question_id} className="question">
              <h4>{questions.find((item) => question.question_id == item.question_id)?.question_text}</h4>
              <div className="answer">
                {filteredQuestions.find((item) => item.question_id == question.question_id)?.answers?.map((answer) => (
                  <span>{answer.answer_text}</span>
                ))}
                <span>{question.answer_text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => navigate('/')}>start a new quiz</button>
    </Container>
  )
}

export default FinishedQuiz