import { CSSProperties } from 'react'
interface CloseButtonProps {
    onClick: () => void;
}

export function CloseButton({onClick}: CloseButtonProps) {
    return (
        <button style={styles.button} onClick={onClick}>X</button>
    )
}

type CssProps = {[x: string]: CSSProperties}

const styles: CssProps = {
    button: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        padding: 0,
        cursor: 'pointer'
    }
}