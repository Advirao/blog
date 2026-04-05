import { render, screen } from '@testing-library/react'
import { Badge } from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Intermediate</Badge>)
    expect(screen.getByText('Intermediate')).toBeInTheDocument()
  })

  it('renders as a span element', () => {
    const { container } = render(<Badge>Test</Badge>)
    expect(container.firstChild?.nodeName).toBe('SPAN')
  })

  it('applies neutral variant classes by default', () => {
    const { container } = render(<Badge>Default</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-ink2')
  })

  it('applies accent variant classes', () => {
    const { container } = render(<Badge variant="accent">Accent</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-accent')
  })

  it('applies gold variant classes', () => {
    const { container } = render(<Badge variant="gold">Gold</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-gold')
  })

  it('applies danger variant classes', () => {
    const { container } = render(<Badge variant="danger">Danger</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-danger')
  })

  it('applies blue variant classes', () => {
    const { container } = render(<Badge variant="blue">Blue</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-blue')
  })

  it('applies purple variant classes', () => {
    const { container } = render(<Badge variant="purple">Purple</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-purple')
  })

  it('applies teal variant classes', () => {
    const { container } = render(<Badge variant="teal">Teal</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('text-teal')
  })

  it('merges additional className prop', () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('custom-class')
  })

  it('always includes the pill and border base classes', () => {
    const { container } = render(<Badge>Base</Badge>)
    const span = container.firstChild as HTMLElement
    expect(span.className).toContain('pill')
    expect(span.className).toContain('border')
  })
})
