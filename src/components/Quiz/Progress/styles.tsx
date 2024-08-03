import styled from "styled-components";

export const ProgressWrapper = styled.div<{ percentage: number }>`
  display: block;
  width: 100%;
  max-width: 600px;
  height: 6px;
  border-radius: 25px;
  background-color: #ccc;
  margin-bottom: 16px;

  .progress {
    border-radius: 25px;
    height: 100%;
    width: ${p => p.percentage}%;
    background-color: #646cff;
    transition: .5s;
  }
`