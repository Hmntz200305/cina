"use client";

import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [days, setDays] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    const startDate = new Date('2021-07-21');

    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const daysElapsed = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setDays(daysElapsed);
      setTimeElapsed(`${hours} hours, ${minutes} minutes, ${seconds} seconds`);
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">I Love You Day {days} ❤️</h1>
      <p className="text-xl text-gray-600">{timeElapsed}</p>
    </div>
  );
};

export default Home;
