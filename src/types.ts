export type Module = 'dashboard' | 'conversations' | 'orders' | 'locations' | 'products' | 'customers';

export interface Order {
  id: string;
  customerName: string;
  products: string;
  total: number;
  type: 'Delivery' | 'Retiro';
  location: string;
  time: string;
  status: 'Nuevo' | 'Confirmado' | 'En preparación' | 'Listo' | 'Entregado' | 'Cancelado';
  paymentMethod?: string;
  address?: string;
  notes?: string;
  channel?: string;
}

export interface Chat {
  id: string;
  customerName: string;
  lastMessage: string;
  time: string;
  status: 'Nuevo' | 'En curso' | 'Cerrado';
  tag: 'Pedido' | 'Consulta' | 'Reclamo';
  phone: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web';
  historyCount: number;
  totalSpent: number;
  lastOrderDays: number;
  messages: { sender: 'user' | 'bot'; text: string }[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  hours: string;
  status: 'Abierto' | 'Cerrado';
  activeOrders: number;
  dailySales: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Cafés' | 'Tortas' | 'Combos' | 'Otros';
  available: boolean;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  channel: 'WhatsApp' | 'Instagram' | 'Web';
  ordersCount: number;
  totalSpent: number;
  lastOrder: string;
}
