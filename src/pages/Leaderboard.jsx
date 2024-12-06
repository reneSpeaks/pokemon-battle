import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
      axios.get(import.meta.env.VITE_BACKEND + "/leaderboards")
      .then(response => {
        setLeaderboard(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

    return (
        <div>
            <h1>Leaderboardssssssss</h1>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Battles Won</th>
                        <th>Battles Lost</th>
                        <th>Battles Draw</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {leaderboard && leaderboard.map((entry, index) => (
                        <tr key={entry._id}>
                            <td>{index + 1}</td>
                            <td>{entry.userId?.name || 'Unknown'}</td>
                            <td>{entry.battlesWon}</td>
                            <td>{entry.battlesLost}</td>
                            <td>{entry.battlesDraw}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;