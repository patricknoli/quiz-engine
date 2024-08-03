import { ProgressWrapper } from "./styles"
import { ProgressProps } from "./types"

const Progress: React.FC<ProgressProps> = ({ questions, currentQuestion }) => {
  return (
    <ProgressWrapper percentage={(currentQuestion / questions) * 100}>
      <div className="progress"></div>
    </ProgressWrapper>
  )
}

export default Progress