'use client';

import { useState, useEffect } from 'react';
import { Order, OrderType } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

// Order history hook
export const useOrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  // Load orders from localStorage on initialization
  useEffect(() => {
    const savedOrders = localStorage.getItem('optitrade-orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Failed to parse saved orders:', error);
      }
    }
  }, []);

  // Save orders to localStorage when updated
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('optitrade-orders', JSON.stringify(orders));
    }
  }, [orders]);

  // Place a new order
  const placeOrder = (
    type: OrderType,
    coinId: string,
    symbol: string,
    amount: number,
    price: number
  ) => {
    const newOrder: Order = {
      type,
      coin: coinId,
      symbol: symbol.toUpperCase(),
      amount,
      price,
      total: amount * price,
      timestamp: Date.now(),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    
    toast({
      title: 'Order Placed',
      description: `${type === 'buy' ? 'Bought' : 'Sold'} ${amount} ${symbol.toUpperCase()} for $${(amount * price).toFixed(2)}`,
      variant: 'default',
    });

    return newOrder;
  };

  return {
    orders,
    placeOrder,
  };
};