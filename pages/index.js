import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';

const generateStars = (numStars) => {
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

export default function Home() {
    const [pizzaLeft, setPizzaLeft] = useState(50);
    const [stars, setStars] = useState([]);

    useEffect(() => {
        setStars(generateStars(200));

        const handleKeyDown = (event) => {
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
        <div className={styles.container}>
            <Head>
                <title>Pizza in Space</title>
                <meta name="description" content="A fun with pizza in space" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <div className={styles.gameContainer}>
                    <img src="/piz.png" className={styles.pizza} style={{ left: `${pizzaLeft}%` }} alt="Pizza" />
                    <div className={styles.starsContainer}>
                        {stars.map(star => (
                            <div
                                key={star.id}
                                className={styles.star}
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
        </div>
    );
}
