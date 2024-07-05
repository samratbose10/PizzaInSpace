"use client";

import { useEffect, useState } from 'react';

const generateStars = (numStars: number) => {
    const starsArray = [];
    for (let i = 0; i < numStars; i++) {
        const star = {
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 3 + 1,
        };
        starsArray.push(star);
    }
    return starsArray;
};

const Home = () => {
    const [pizzaLeft, setPizzaLeft] = useState(50);
    const [stars, setStars] = useState(generateStars(200));

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                setPizzaLeft((prev) => prev - 10);
                setStars((prevStars) => prevStars.map(star => ({
                    ...star,
                    left: star.left + 1
                })));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="container">
            <main className="main">
                <div className="gameContainer">
                    <img src="/piz.png" className="pizza" style={{ left: `${pizzaLeft}%` }} alt="Pizza" />
                    <div className="starsContainer">
                        {stars.map(star => (
                            <div
                                key={star.id}
                                className="star"
                                style={{
                                    left: `${star.left}%`,
                                    top: `${star.top}%`,
                                    width: `${star.size}px`,
                                    height: `${star.size}px`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
