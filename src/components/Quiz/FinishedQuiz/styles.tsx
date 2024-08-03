import styled from "styled-components";

export const Container = styled.div`
  h2, h4, p {
    margin: 0;
  }

  button {
    margin: 8px 0;
  }

  .review {
    margin-top: 16px;

    .questions-list {
      border: 1px solid #fff;
      border-radius: 6px;
      padding: 8px;
      margin-top: 12px;

      .question {
        padding-bottom: 12px;
        border-bottom: 1px solid #fff;

        &:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }

        .answer {
          margin-top: 8px;
          padding: 4px;
          background-color: #70c09a;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }
    }
  }
`