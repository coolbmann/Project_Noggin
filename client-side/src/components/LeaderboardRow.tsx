import LeaderboardSpacerRow from "./LeaderboardSpacerRow";

interface props {
  username: string;
  quizAttempts: number;
  averageScore: number;
  totalPoints: number;
  rank: number;
  showDetails: () => void;
  userId: string;
  selectedUser: string;
}

const LeaderboardRow = ({
  rank,
  username,
  quizAttempts,
  averageScore,
  totalPoints,
  showDetails,
  userId,
  selectedUser,
}: props) => {
  return (
    <>
      <tr
        style={selectedUser === userId ? { backgroundColor: "#F0F1FF" } : {}}
        onClick={showDetails}
      >
        <td style={selectedUser === userId ? { borderColor: "#bdc1ff" } : {}}>
          {rank}
        </td>
        <td style={selectedUser === userId ? { borderColor: "#bdc1ff" } : {}}>
          {username}
        </td>
        <td style={selectedUser === userId ? { borderColor: "#bdc1ff" } : {}}>
          {quizAttempts}
        </td>
        <td style={selectedUser === userId ? { borderColor: "#bdc1ff" } : {}}>
          {averageScore}%
        </td>
        <td style={selectedUser === userId ? { borderColor: "#bdc1ff" } : {}}>
          {totalPoints} ⭐
        </td>
      </tr>
      <LeaderboardSpacerRow />
    </>
  );
};

export default LeaderboardRow;
