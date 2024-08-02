import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { QuizType } from "./types";
import { Option, QuestionBox, QuizContainer } from "./styles";

const Quiz: React.FC = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  async function getQuiz() {
    try {
      const response = await fetch(`/quiz-list/${id}.json`);
      const data: QuizType = await response.json();
      setQuiz(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    id && getQuiz();
  }, [])

  function handleNextQuestion() {
    let nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
  }

  function handlePreviousQuestion() {
    let prevQuestion = currentQuestion - 1;
    setCurrentQuestion(prevQuestion);
  }

  return (
    <QuizContainer>
      {quiz && (
        <>
          <h1>{quiz?.quiz_name}</h1>
          {!quizStarted && (
            <>
              <p>{quiz?.quiz_description}</p>
              <button onClick={() => setQuizStarted(true)}>Start</button>
            </>
          )}

          {quizStarted && quiz?.questions.map((question, index) => (
            <div className={`question-wrapper ${currentQuestion == index ? 'current' : ''}`} key={question.question_id}>
              <h2>{question.question_title}</h2>
              <p>{question.question_description}</p>

              <QuestionBox>
                {question.question_image && (
                  <img className="question-image" src={question.question_image} alt="" />
                )}

                <div className="question-content">
                  <h3>{question.question_text}</h3>

                  {question.question_type == "multiple-choice" && (
                    <span className="tip">*Select one or more options</span>
                  )}
                  {question.question_type !== "input" ? (
                    <div className="options-list">
                      {question.answers?.map((answer) => (
                        <Option key={answer.answer_id}>
                          {answer.answer_text}
                        </Option>
                      ))}
                    </div>
                  ) : (
                    <input type="text" placeholder="Type your answer" />
                  )}
                </div>
              </QuestionBox>
            </div>
          ))}
          {quizStarted && (
            <div className="action">
              {currentQuestion >= 1 && (
                <button onClick={() => handlePreviousQuestion()}>previous</button>
              )}
              {(currentQuestion + 1) < quiz?.questions.length && (
                <button onClick={() => handleNextQuestion()}>next</button>
              )}
              {(currentQuestion + 1) == quiz?.questions.length && (
                <button>finish</button>
              )}
            </div>
          )}
        </>
      )}
    </QuizContainer>
  )
}

export default Quiz