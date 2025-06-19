import { render, screen, fireEvent } from '@testing-library/react';
import { MenuCard } from './MenuCard';

describe('MenuCard component', () => {
  const onAddToCartMock = jest.fn();

  const props = {
    image: 'test.jpg',
    title: 'Test Item',
    price: 10,
    description: 'Test description',
    onAddToCart: onAddToCartMock,
  };

  beforeEach(() => {
    onAddToCartMock.mockClear();
  });

  it('renders correctly', () => {
    render(<MenuCard {...props} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$ 10 USD')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
  });

  it('changes quantity', () => {
    render(<MenuCard {...props} />);
    const quantityInput = screen.getByRole('textbox');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(quantityInput).toHaveValue('3');
  });

  it('calls onAddToCart with the correct quantity', () => {
    render(<MenuCard {...props} />);
    const quantityInput = screen.getByRole('textbox');
    fireEvent.change(quantityInput, { target: { value: '5' } });

    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(addToCartButton);

    expect(onAddToCartMock).toHaveBeenCalledWith(5);
  });

  it('calls onAddToCart with the default quantity of 1', () => {
    render(<MenuCard {...props} />);
    const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
    fireEvent.click(addToCartButton);
    expect(onAddToCartMock).toHaveBeenCalledWith(1);
  });
}); 