
import { useNavigate } from "react-router-dom";
import { QuizListItemType } from "./types";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const quizList: QuizListItemType[] = [
    {
      quiz_file_name: "sample-quiz-1",
      quiz_display_name: "Sample 1"
    },
    {
      quiz_file_name: "sample-quiz-2",
      quiz_display_name: "Sample 2"
    }
  ];

  function handleQuizSelect(selectedQuiz: string) {
    navigate(`/quiz/${selectedQuiz}`);
  }

  return (
    <>
      <div className="title">
        <h1>Welcome to the quiz!</h1>

        <p>Select a quiz to get started</p>
      </div>

      <div className="quiz-select">
        <select onChange={(e) => handleQuizSelect(e.target.value)}>
          <option value="">Select quiz</option>
          {quizList.map((quiz) => (
            <option key={quiz.quiz_file_name} value={quiz.quiz_file_name}>{quiz.quiz_display_name}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Home;