import SquareButton from "./SquareButton";

type Player = "X" | "O" | "DRAW" | undefined;

interface Props {
  winner: Player;
  value: Player;
  onClick: () => void;
}

const Square: React.FC<Props> = ({ value, onClick, winner }) => {
  if (!value) {
    return <SquareButton onClick={onClick} disabled={Boolean(winner)} />;
  }
  return (
    <SquareButton
      disabled
      text={value}
      color={value == "X" ? "dreamer-blue" : "dreamer-pink"}
    />
  );
};

export default Square;
