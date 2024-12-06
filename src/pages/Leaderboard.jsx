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
        <div className="overflow-x-auto">
            <h1 className="text-center text-2xl md:text-3xl mb-4 text-accent">Leaderboard</h1>
            <table className="table table-xs md:table-md">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Battles Won</th>
                        <th>Battles Lost</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                  
                    {leaderboard && leaderboard.map((entry, index) => (
                        <tr key={entry._id}>
                            <td>{index + 1}</td>
                            <td>{entry.userId?.username || 'Unknown'}</td>
                            <td>{entry.battlesWon}</td>
                            <td>{entry.battlesLost}</td>
                            <td>{entry.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;