import SquareButton from "../SquareButton";
import { Player } from "../../../ts/types/player_types";

interface Props {
  value: Player;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ value, onClick }) => {
  if (!value) {
    return <SquareButton onClick={onClick} disabled={false} />;
  }
  return (
    <SquareButton
      disabled={true}
      text={value}
      color={value == "X" ? "dreamer-blue" : "dreamer-pink"}
    />
  );
};

export default Square;
