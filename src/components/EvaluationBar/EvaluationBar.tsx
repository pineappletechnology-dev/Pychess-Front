'use client'

import styles from './styles.module.css';

interface EvaluationBarProps {
    winProbabilityWhite: number;
    winProbabilityBlack: number;
}

export default function EvaluationBar({
    winProbabilityWhite,
    winProbabilityBlack
}: EvaluationBarProps) {
    return (
        <div className={styles.barContainer}>
            <div className={styles.black} style={{ height: `${winProbabilityBlack}%` }}>
                {winProbabilityBlack}%
            </div>
            <div className={styles.white} style={{ height: `${winProbabilityWhite}%` }}>
                {winProbabilityWhite}%
            </div>
        </div>
    );
}
