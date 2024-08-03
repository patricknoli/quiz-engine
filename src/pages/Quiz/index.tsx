import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { AnsweredQuestionType, QuestionType, QuizType } from "./types";
import { Option, QuestionBox, QuizContainer } from "./styles";

const Quiz: React.FC = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState<QuizType | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestionType[]>([]);

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

  useEffect(() => {
    const answeredQuestionsObj: any = [];
    quiz?.questions.map((question: QuestionType) => {
      answeredQuestionsObj.push({
        question_id: question.question_id,
        options: [],
        answer_text: ""
      });
      setAnsweredQuestions(answeredQuestionsObj);
    });
  }, [quiz])

  function handleNextQuestion() {
    let nextQuestion = currentQuestion + 1;
    let nextQuestionObj = quiz?.questions[nextQuestion];
    if (nextQuestionObj?.question_dependency_id) {
      let dependencyQuestion = quiz?.questions.find((question) => question.question_id == nextQuestionObj.question_dependency_id);
      let dependencyQuestionAnswered = answeredQuestions.find((question) => question.question_id == nextQuestionObj.question_dependency_id);
      if (dependencyQuestion?.question_type == "one-choice") {
        if (!dependencyQuestionAnswered?.options.find((option) => option.answer_id == nextQuestionObj.question_dependency_answer)) {
          nextQuestion++
        }
      } else if (dependencyQuestion?.question_type == "multiple-choice") {
        let matchOptions = false;
        typeof dependencyQuestion.question_dependency_answer == "object" && dependencyQuestion.question_dependency_answer.map((option) => {
          if (dependencyQuestionAnswered?.options.find((answer) => answer.answer_id == option.answer_id)) {
            matchOptions = true;
          }
        });
        matchOptions && nextQuestion++
      } else if (dependencyQuestion?.question_type == "input") {
        if (dependencyQuestionAnswered?.answer_text != nextQuestionObj.question_dependency_answer) {
          nextQuestion++;
        }
      }
    }
    setCurrentQuestion(nextQuestion);
  }

  function handlePreviousQuestion() {
    let prevQuestion = currentQuestion - 1;
    let prevQuestionObj = quiz?.questions[prevQuestion];
    if (prevQuestionObj?.question_dependency_id) {
      let dependencyQuestion = quiz?.questions.find((question) => question.question_id == prevQuestionObj.question_dependency_id);
      let dependencyQuestionAnswered = answeredQuestions.find((question) => question.question_id == prevQuestionObj.question_dependency_id);
      if (dependencyQuestion?.question_type == "one-choice") {
        if (!dependencyQuestionAnswered?.options.find((option) => option.answer_id == prevQuestionObj.question_dependency_answer)) {
          prevQuestion--
        }
      } else if (dependencyQuestion?.question_type == "multiple-choice") {
        let matchOptions = false;
        typeof dependencyQuestion.question_dependency_answer == "object" && dependencyQuestion.question_dependency_answer.map((option) => {
          if (dependencyQuestionAnswered?.options.find((answer) => answer.answer_id == option.answer_id)) {
            matchOptions = true;
          }
        });
        matchOptions && prevQuestion++
      } else if (dependencyQuestion?.question_type == "input") {
        if (dependencyQuestionAnswered?.answer_text != prevQuestionObj.question_dependency_answer) {
          prevQuestion--;
        }
      }
    }
    setCurrentQuestion(prevQuestion);
  }

  function verifySelectedAnswer(option_id: number, question_id: number): boolean {
    const currentQuestion = answeredQuestions.find((item) => item.question_id == question_id);
    if (currentQuestion) {
      const selectedOption = currentQuestion.options.find((item) => item.answer_id == option_id);
      if (selectedOption) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  function handleQuestionAnswer(question_id: number, answer_id?: number, answer_text?: string) {
    const answeredQuestionsObj = [...answeredQuestions];
    const currentQuestion = quiz?.questions.find((question) => question.question_id == question_id);
    answeredQuestionsObj.map((answeredQuestion) => {
      if (answeredQuestion.question_id == question_id) {
        if (currentQuestion?.question_type == "one-choice") {
          answeredQuestion.options = [{ answer_id: answer_id }]
        } else if (currentQuestion?.question_type == "multiple-choice") {
          if (!answeredQuestion.options.find((option) => option == answer_id)) {
            answeredQuestion.options.push({ answer_id });
          }
        } else if (currentQuestion?.question_type == "input") {
          answeredQuestion.answer_text = answer_text
        }
      }
    });
    setAnsweredQuestions(answeredQuestionsObj);
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
                        <Option className={`${verifySelectedAnswer(answer.answer_id, question.question_id) ? 'selected' : ''}`}
                          key={answer.answer_id}
                          onClick={() => handleQuestionAnswer(question.question_id, answer.answer_id)}>
                          {answer.answer_text}
                        </Option>
                      ))}
                    </div>
                  ) : (
                    <input type="text" placeholder="Type your answer"
                      onChange={(e) => handleQuestionAnswer(question.question_id, undefined, e.target.value)} />
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