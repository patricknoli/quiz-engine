import styled from "styled-components";

export const QuizContainer = styled.div`
  display: block;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  .question-wrapper {
    display: none;

    h2, h3, p {
      margin: 0;
    }

    @keyframes showQuestion {
        0% {
          opacity: 0;
          transform: translateX(100%);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      &.current {
        display: block;
        animation-name: showQuestion;
        animation-duration: .5s;
      }
  }

  .action {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`

export const QuestionBox = styled.div`
  border: 1px solid #fff;
  border-radius: 8px;
  display: block;
  margin: 12px auto;

  img.question-image {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  .question-content {
    display: flex;
    flex-direction: column;
    padding: 8px 8px 12px;

    .tip {
      font-size: 12px;
      font-style: italic;
    }

    .options-list {
      margin-top: 12px;
    }

    input {
      padding: 8px;
      border-radius: 6px;
      border: none;
      margin-top: 12px;
    }
  }
`

export const Option = styled.div`
  padding: 8px;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  transition: .4s;

  &:hover {
    background-color: #464646;
  }
`