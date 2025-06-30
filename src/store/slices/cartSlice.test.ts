import cartReducer, {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  placeOrder,
  updateOrderStatus,
  Order,
} from './cartSlice';
import { MenuItem } from '../../types';

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  orders: [],
};

const menuItem1: MenuItem = { id: '1', title: 'Coffee', price: 5, image: 'url1', description: 'desc1', category: 'drink' };
const menuItem2: MenuItem = { id: '2', title: 'Tea', price: 4, image: 'url2', description: 'desc2', category: 'drink' };

describe('cart slice', () => {
  it('should return the initial state', () => {
    expect(cartReducer(undefined, { type: '' })).toEqual(initialState);
  });

  describe('addToCart', () => {
    it('should add a new item to the cart', () => {
      const previousState = { ...initialState };
      const nextState = cartReducer(previousState, addToCart(menuItem1));
      expect(nextState.items).toEqual([{ ...menuItem1, quantity: 1 }]);
      expect(nextState.totalItems).toBe(1);
      expect(nextState.totalPrice).toBe(5);
    });

    it('should increase the quantity of an existing item', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 5,
      };
      const nextState = cartReducer(previousState, addToCart(menuItem1));
      expect(nextState.items).toEqual([{ ...menuItem1, quantity: 2 }]);
      expect(nextState.totalItems).toBe(2);
      expect(nextState.totalPrice).toBe(10);
    });
  });

  describe('removeFromCart', () => {
    it('should remove an item from the cart', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 5,
      };
      const nextState = cartReducer(previousState, removeFromCart('1'));
      expect(nextState.items).toEqual([]);
      expect(nextState.totalItems).toBe(0);
      expect(nextState.totalPrice).toBe(0);
    });
  });

  describe('updateQuantity', () => {
    it('should update the quantity of an item', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 5,
      };
      const nextState = cartReducer(previousState, updateQuantity({ id: '1', quantity: 3 }));
      expect(nextState.items).toEqual([{ ...menuItem1, quantity: 3 }]);
      expect(nextState.totalItems).toBe(3);
      expect(nextState.totalPrice).toBe(15);
    });

    it('should remove the item if quantity is 0 or less', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 5,
      };
      const nextState = cartReducer(previousState, updateQuantity({ id: '1', quantity: 0 }));
      expect(nextState.items).toEqual([]);
      expect(nextState.totalItems).toBe(0);
      expect(nextState.totalPrice).toBe(0);
    });

    it('should remove the item if quantity is less than 0', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }],
        totalItems: 1,
        totalPrice: 5,
      };
      const nextState = cartReducer(previousState, updateQuantity({ id: '1', quantity: -1 }));
      expect(nextState.items).toEqual([]);
      expect(nextState.totalItems).toBe(0);
      expect(nextState.totalPrice).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from the cart', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 1 }, { ...menuItem2, quantity: 2 }],
        totalItems: 3,
        totalPrice: 13,
      };
      const nextState = cartReducer(previousState, clearCart());
      expect(nextState.items).toEqual([]);
      expect(nextState.totalItems).toBe(0);
      expect(nextState.totalPrice).toBe(0);
    });
  });

  describe('placeOrder', () => {
    it('should create an order and clear the cart', () => {
      const previousState = {
        ...initialState,
        items: [{ ...menuItem1, quantity: 2 }],
        totalItems: 2,
        totalPrice: 10,
      };
      const nextState = cartReducer(previousState, placeOrder({ street: 'Main St', house: '123' }));
      expect(nextState.orders.length).toBe(1);
      expect(nextState.orders[0].items).toEqual([{ ...menuItem1, quantity: 2 }]);
      expect(nextState.orders[0].street).toBe('Main St');
      expect(nextState.orders[0].house).toBe('123');
      expect(nextState.orders[0].totalPrice).toBe(10);
      expect(nextState.orders[0].status).toBe('pending');
      expect(nextState.items).toEqual([]);
      expect(nextState.totalItems).toBe(0);
      expect(nextState.totalPrice).toBe(0);
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', () => {
        const order: Order = {
            id: 'order1',
            items: [],
            street: 'Main St',
            house: '123',
            totalPrice: 10,
            orderDate: new Date().toISOString(),
            status: 'pending',
        };
      const previousState = {
        ...initialState,
        orders: [order],
      };
      const nextState = cartReducer(previousState, updateOrderStatus({ orderId: 'order1', status: 'confirmed' }));
      expect(nextState.orders[0].status).toBe('confirmed');
    });
  });
}); 