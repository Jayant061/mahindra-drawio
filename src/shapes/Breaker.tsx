import { useRef } from 'react'
type BreakerProps = {
  x: number,
  y: number
  id: string

}
function Breaker(props: BreakerProps) {
  const height = 70;
  const arrowOffset = 10;
  const radius = 3;
  const stroke = "green"
  const { id, x, y } = props

  const elementRef = useRef<SVGGElement>(null);

  return (
    <g
      onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}
      strokeWidth={3}
      fill={stroke}
      id={id}
      ref={elementRef}
    >
      <line x1={x} y1={y} x2={x} y2={y + height} stroke={stroke} />

      {/* top left arrow */}
      <line x1={x} y1={y} x2={x - arrowOffset} y2={y + arrowOffset} stroke={stroke} />

      {/* top right arrow */}
      <line x1={x} y1={y} x2={x + arrowOffset} y2={y + arrowOffset} stroke={stroke} />

      {/* top 2 left arrow */}
      <line x1={x} y1={y + arrowOffset} x2={x - arrowOffset} y2={y + 2 * arrowOffset} stroke={stroke} />
      {/* top left arrow */}
      <line x1={x} y1={y + arrowOffset} x2={x + arrowOffset} y2={y + 2 * arrowOffset} stroke={stroke} />
      {/* top left arrow */}
      <line x1={x} y1={y + height - arrowOffset} x2={x + arrowOffset} y2={y + height - 2 * arrowOffset} stroke={stroke} />
      {/* bottom right arrow */}
      <line x1={x} y1={y + height} x2={x + arrowOffset} y2={y + height - arrowOffset} stroke={stroke} />
      {/* bottom 2 left arrow */}
      <line x1={x} y1={y + height - arrowOffset} x2={x - arrowOffset} y2={y + height - 2 * arrowOffset} stroke={stroke} />
      {/* bottom left arrow */}
      <line x1={x} y1={y + height} x2={x - arrowOffset} y2={y + height - arrowOffset} stroke={stroke} />
      {/* top circle */}
      <circle cx={x} cy={y + 2 * arrowOffset} r={radius} />
      {/* bottom circle */}
      <circle cx={x} cy={y + height - 2 * arrowOffset} r={radius} />
    </g>

  )
}

export default Breaker