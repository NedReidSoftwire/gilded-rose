import { render, screen, waitFor, within, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'
import App from '../App'
import { vi } from 'vitest'

describe('Gilded Rose Stock Management system', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('renders loading text, then items', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch') as unknown as vi.Mock
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({
        items: [
          { name: 'Aged Brie', sell_in: 1, quality: 10 },
          { name: 'Elixir', sell_in: 5, quality: 7 },
        ],
      }),
    } as any)

    render(<App />)
    expect(screen.getByText(/Loading/)).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading/))

    const table = screen.getByRole('table')
    const rows = within(table).getAllByRole('row')
    expect(rows).toHaveLength(3)

    const brieRow = screen.getByRole('row', { name: /Aged Brie/i })
    expect(within(brieRow).getByText('1')).toBeInTheDocument()
    expect(within(brieRow).getByText('10')).toBeInTheDocument()

    const elixirRow = screen.getByRole('row', { name: /Elixir/i })
    expect(within(elixirRow).getByText('5')).toBeInTheDocument()
    expect(within(elixirRow).getByText('7')).toBeInTheDocument()

    // ensure single fetch
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('advances a day when button clicked', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch') as unknown as vi.Mock
    fetchMock
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          items: [{ name: 'Foo', sell_in: 2, quality: 3 }],
        }),
      } as any)
      .mockResolvedValueOnce({
        json: () => Promise.resolve({
          items: [{ name: 'Foo', sell_in: 0, quality: 1 }],
        }),
      } as any)

    render(<App />)

    await waitFor(() => screen.getByText('Foo'))

    await waitFor(() => {
      const updatedRow = screen.getByRole('row', { name: /Foo/i })
      expect(within(updatedRow).getByText('3')).toBeInTheDocument()
      expect(within(updatedRow).getByText('2')).toBeInTheDocument()
      expect(within(updatedRow).queryByText('0')).not.toBeInTheDocument()
      expect(within(updatedRow).queryByText('1')).not.toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /Advance/ }))

    await waitFor(() => {
      const updatedRow = screen.getByRole('row', { name: /Foo/i })
      expect(within(updatedRow).getByText('0')).toBeInTheDocument()
      expect(within(updatedRow).getByText('1')).toBeInTheDocument()
      expect(within(updatedRow).queryByText('3')).not.toBeInTheDocument()
      expect(within(updatedRow).queryByText('2')).not.toBeInTheDocument()
    })

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenNthCalledWith(2, '/api/update-quality', { method: 'POST' })
  })

  it('shows error on fetch failure', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('fail'))
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument()
    })
  })
})
