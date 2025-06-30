import { screen, fireEvent } from '@testing-library/react';
import { CartItem } from './CartItem';
import { renderWithProviders } from '../../test-utils';
import { CartItem as CartItemType } from '../../store/slices/cartSlice';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

const mockStore = configureStore([]);

const mockItem: CartItemType = {
  id: '1',
  title: 'Coffee',
  price: 5,
  image: 'url1',
  description: 'desc1',
  category: 'drink',
  quantity: 2,
};

describe('CartItem component', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: [mockItem],
                totalItems: 1,
                totalPrice: 10,
                orders: []
            }
        });
        store.dispatch = jest.fn();
    });

  it('renders correctly', () => {
    render(
        <Provider store={store}>
            <CartItem item={mockItem} />
        </Provider>
    );
    expect(screen.getByText('Coffee')).toBeInTheDocument();
    expect(screen.getByText('$5.00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('updates quantity on input change', () => {
    render(
        <Provider store={store}>
            <CartItem item={mockItem} />
        </Provider>
    );
    const quantityInput = screen.getByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    
    expect(quantityInput).toHaveValue(3);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'cart/updateQuantity',
      payload: { id: '1', quantity: 3 },
    });
  });

  it('removes item when remove button is clicked', () => {
    render(
        <Provider store={store}>
            <CartItem item={mockItem} />
        </Provider>
    );
    const removeButton = screen.getByText('×');
    fireEvent.click(removeButton);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'cart/removeFromCart',
      payload: '1',
    });
  });
}); 