import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MenuPage } from './MenuPage';
import { renderWithProviders } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import { MenuItem } from '../../types';

const mockMenuData: MenuItem[] = [
    { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink' },
    { id: '2', title: 'Tea', price: 4, image: 'url2', description: 'desc2', category: 'drink' },
];

const mockCategories = [
    { id: 'drink', label: 'Drinks' },
    { id: 'food', label: 'Food' },
]

describe('MenuPage component', () => {
    it('renders menu items and adds item to cart', async () => {
        const { store } = renderWithProviders(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <MenuPage />
            </MemoryRouter>,
            {
                preloadedState: {
                    menu: {
                        menuData: mockMenuData,
                        categories: mockCategories,
                        loading: false,
                        error: null
                    },
                    cart: { items: [], totalPrice: 0, totalItems: 0, orders: [] }
                }
            }
        );

        expect(screen.getByText('Coffee')).toBeInTheDocument();
        expect(screen.getByText('Tea')).toBeInTheDocument();

        const addToCartButton = screen.getAllByRole('button', { name: 'Add to Cart' })[0];
        fireEvent.click(addToCartButton);

        await waitFor(() => {
            const cartState = store.getState().cart;
            expect(cartState.items.length).toBe(1);
            expect(cartState.items[0].title).toBe('Coffee');
        });
    });
}); 