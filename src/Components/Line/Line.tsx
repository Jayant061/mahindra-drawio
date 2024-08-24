import './Line.css'

interface LineProps {
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    color: string
}

const Line = ({ x1, x2, y1, y2, color }: LineProps) => {
    return (
        <>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} />
        </>
    )
}

export default Line