import { render, screen, fireEvent } from '@testing-library/react'
import { SimulatorFrame } from '@/components/content/SimulatorFrame'

describe('SimulatorFrame', () => {
  const defaultProps = {
    src: '/simulations/oil-trading-simulator.html',
    title: 'Crude Oil Trading Simulator',
  }

  // ─── Basic rendering ────────────────────────────────────────────────────────
  it('renders the iframe with the correct src', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const iframe = screen.getByTitle('Crude Oil Trading Simulator')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src', '/simulations/oil-trading-simulator.html')
  })

  it('renders the title in the toolbar', () => {
    render(<SimulatorFrame {...defaultProps} />)
    expect(screen.getByText('Crude Oil Trading Simulator')).toBeInTheDocument()
  })

  it('iframe has correct sandbox attribute', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const iframe = screen.getByTitle('Crude Oil Trading Simulator')
    expect(iframe).toHaveAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox')
  })

  it('iframe has lazy loading', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const iframe = screen.getByTitle('Crude Oil Trading Simulator')
    expect(iframe).toHaveAttribute('loading', 'lazy')
  })

  // ─── Traffic-light dots (decorative) ───────────────────────────────────────
  it('renders the three traffic-light dots', () => {
    const { container } = render(<SimulatorFrame {...defaultProps} />)
    // Three colored circles: red, yellow, green
    const dots = container.querySelectorAll('.rounded-full.h-3.w-3')
    expect(dots).toHaveLength(3)
  })

  // ─── Fullscreen toggle ──────────────────────────────────────────────────────
  it('shows Fullscreen button initially', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const btn = screen.getByTitle('Fullscreen')
    expect(btn).toBeInTheDocument()
  })

  it('toggles to Exit fullscreen on click', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const btn = screen.getByTitle('Fullscreen')
    fireEvent.click(btn)
    expect(screen.getByTitle('Exit fullscreen')).toBeInTheDocument()
  })

  it('toggles back to Fullscreen when clicked again', () => {
    render(<SimulatorFrame {...defaultProps} />)
    fireEvent.click(screen.getByTitle('Fullscreen'))
    fireEvent.click(screen.getByTitle('Exit fullscreen'))
    expect(screen.getByTitle('Fullscreen')).toBeInTheDocument()
  })

  // ─── Reload button ──────────────────────────────────────────────────────────
  it('renders the reload button', () => {
    render(<SimulatorFrame {...defaultProps} />)
    expect(screen.getByTitle('Reload simulator')).toBeInTheDocument()
  })

  it('reload button re-renders the iframe (key increment)', () => {
    render(<SimulatorFrame {...defaultProps} />)
    const iframe = screen.getByTitle('Crude Oil Trading Simulator') as HTMLIFrameElement
    const initialSrc = iframe.getAttribute('src')

    fireEvent.click(screen.getByTitle('Reload simulator'))

    // After reload, iframe should still have the same src
    const reloadedIframe = screen.getByTitle('Crude Oil Trading Simulator') as HTMLIFrameElement
    expect(reloadedIframe.getAttribute('src')).toBe(initialSrc)
  })

  // ─── className prop ─────────────────────────────────────────────────────────
  it('applies additional className to the container', () => {
    const { container } = render(
      <SimulatorFrame {...defaultProps} className="my-custom-class" />
    )
    expect(container.firstChild).toHaveClass('my-custom-class')
  })
})
