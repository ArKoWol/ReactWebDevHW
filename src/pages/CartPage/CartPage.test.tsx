import { screen, fireEvent, waitFor } from '@testing-library/react';
import { CartPage } from './CartPage';
import { renderWithProviders } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

window.alert = jest.fn();

describe('CartPage component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays empty cart message when no items are in the cart', () => {
        renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartPage />
            </MemoryRouter>, 
            {
                preloadedState: {
                    cart: { items: [], totalPrice: 0, totalItems: 0, orders: [] }
                }
            }
        );

        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
        const continueShoppingButton = screen.getByText('Continue Shopping');
        fireEvent.click(continueShoppingButton);
        expect(mockNavigate).toHaveBeenCalledWith('/menu');
    });

    it('displays cart items and order form when cart is not empty', () => {
        const mockItem = { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink', quantity: 2 };
        renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartPage />
            </MemoryRouter>,
            {
                preloadedState: {
                    cart: { items: [mockItem], totalPrice: 10, totalItems: 1, orders: [] }
                }
            }
        );

        expect(screen.getByText('Coffee')).toBeInTheDocument();
        expect(screen.getByLabelText('Street')).toBeInTheDocument();
        expect(screen.getByLabelText('House')).toBeInTheDocument();
        expect(screen.getByText('Order')).toBeInTheDocument();
    });

    it('should not call handleOrder if street or house is empty', () => {
        const mockItem = { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink', quantity: 2 };
        renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartPage />
            </MemoryRouter>,
            {
                preloadedState: {
                    cart: { items: [mockItem], totalPrice: 10, totalItems: 1, orders: [] }
                }
            }
        );
        const orderButton = screen.getByText('Order');
        expect(orderButton).toBeDisabled();
        fireEvent.click(orderButton);
        expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('handles order placement', async () => {
        const mockItem = { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink', quantity: 2 };
        const { store } = renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartPage />
            </MemoryRouter>,
            {
                preloadedState: {
                    cart: { items: [mockItem], totalPrice: 10, totalItems: 1, orders: [] }
                }
            }
        );

        fireEvent.change(screen.getByLabelText('Street'), { target: { value: 'Main St' } });
        fireEvent.change(screen.getByLabelText('House'), { target: { value: '123' } });

        const orderButton = screen.getByText('Order');
        expect(orderButton).not.toBeDisabled();
        fireEvent.click(orderButton);
        
        await waitFor(() => {
            const actions = store.getState().cart;
            expect(actions.orders.length).toBe(1);
            expect(actions.orders[0].street).toBe('Main St');
            expect(actions.orders[0].house).toBe('123');
            expect(mockNavigate).toHaveBeenCalledWith('/menu');
        });
    });

    it('toggles active class on input focus and blur', () => {
        const mockItem = { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink', quantity: 2 };
        renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <CartPage />
            </MemoryRouter>,
            {
                preloadedState: {
                    cart: { items: [mockItem], totalPrice: 10, totalItems: 1, orders: [] }
                }
            }
        );

        const streetInput = screen.getByLabelText('Street');
        const houseInput = screen.getByLabelText('House');
        const streetLabel = streetInput.parentElement?.querySelector('label');
        const houseLabel = houseInput.parentElement?.querySelector('label');

        
        fireEvent.focus(streetInput);
        expect(streetLabel).toHaveClass('active');
        fireEvent.blur(streetInput);
        expect(streetLabel).not.toHaveClass('active');
        fireEvent.change(streetInput, { target: { value: 'Main St' } });
        fireEvent.blur(streetInput);
        expect(streetLabel).toHaveClass('active');

        
        fireEvent.focus(houseInput);
        expect(houseLabel).toHaveClass('active');
        fireEvent.blur(houseInput);
        expect(houseLabel).not.toHaveClass('active');
        fireEvent.change(houseInput, { target: { value: '123' } });
        fireEvent.blur(houseInput);
        expect(houseLabel).toHaveClass('active');
    });
}); 