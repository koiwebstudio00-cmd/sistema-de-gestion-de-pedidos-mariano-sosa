import { Order, Chat, Location, Product, Customer } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: '1',
    customerName: 'Juan Pérez',
    products: '2x Café con Leche + 1x Torta de Chocolate',
    total: 2900,
    type: 'Retiro',
    location: 'Banda Del Rio Salí',
    time: '10:32 hs',
    status: 'Nuevo',
    paymentMethod: 'Efectivo',
    notes: 'Sin azúcar por favor',
    channel: 'WhatsApp'
  },
  { id: '2', customerName: 'María González', products: '1x Cappuccino + 1x Medialuna', total: 1650, type: 'Delivery', location: 'San Lorenzo', time: '11:15 hs', status: 'Confirmado', address: 'Thames 123' },
  { id: '3', customerName: 'Carlos Rodríguez', products: '2x Café Espresso', total: 1300, type: 'Retiro', location: 'Ranchillos', time: '09:45 hs', status: 'En preparación' },
  { id: '4', customerName: 'Ana López', products: '1x Torta de Zanahoria + 1x Submarino', total: 1900, type: 'Delivery', location: 'Banda Del Rio Salí', time: '10:10 hs', status: 'Listo', address: 'Corrientes 500' },
  { id: '5', customerName: 'Pedro Martínez', products: '1x Combo Merienda', total: 1800, type: 'Retiro', location: 'San Pablo', time: '12:00 hs', status: 'Entregado' },
  { id: '6', customerName: 'Sofía Fernández', products: '1x Cheesecake de Maracuyá', total: 1400, type: 'Delivery', location: 'San Lorenzo', time: '13:30 hs', status: 'Nuevo', address: 'Santa Fe 2500' },
  { id: '7', customerName: 'Diego Sánchez', products: '1x Tostado + 1x Café con Leche', total: 1750, type: 'Retiro', location: 'Córdoba Esq. Monteagudo', time: '08:20 hs', status: 'En preparación' },
  { id: '8', customerName: 'Lucía Ramírez', products: '3x Medialunas + 1x Cappuccino', total: 1650, type: 'Delivery', location: 'San Pablo', time: '15:45 hs', status: 'Listo', address: 'Libertador 1200' },
  { id: '9', customerName: 'Roberto Gómez', products: '1x Brownie + 1x Submarino', total: 1400, type: 'Retiro', location: 'Banda Del Rio Salí', time: '16:10 hs', status: 'Confirmado' },
  { id: '10', customerName: 'Elena Paz', products: '1x Combo Desayuno', total: 1300, type: 'Delivery', location: 'Ranchillos', time: '09:00 hs', status: 'Cancelado', address: 'Cabildo 3000' }
];

export const MOCK_CHATS: Chat[] = [
  {
    id: '1',
    customerName: 'Juan Pérez',
    lastMessage: 'Quiero pedir 2 cafés y una torta',
    time: '10:30',
    status: 'Nuevo',
    tag: 'Pedido',
    phone: '+54 11 4567-8901',
    channel: 'WhatsApp',
    historyCount: 7,
    totalSpent: 18400,
    lastOrderDays: 3,
    messages: [
      { sender: 'user', text: 'Hola, quiero hacer un pedido' },
      { sender: 'bot', text: '¡Hola Juan! 👋 Soy el asistente de Mariano Sosa Cake Shop. ¿Qué querés pedir?' },
      { sender: 'user', text: '2 cafés con leche y una porción de torta de chocolate' },
      { sender: 'bot', text: 'Perfecto, tu pedido es: 2 Café con Leche ($850 c/u) + 1 Torta de Chocolate ($1.200). Total: $2.900. ¿Confirmás?' },
      { sender: 'user', text: 'Sí, confirmo' },
      { sender: 'bot', text: '✅ Pedido confirmado. Te avisamos cuando esté listo.' }
    ]
  },
  {
    id: '2',
    customerName: 'María González',
    lastMessage: '¿Tienen delivery?',
    time: '11:10',
    status: 'En curso',
    tag: 'Consulta',
    phone: '+54 11 2345-6789',
    channel: 'Instagram',
    historyCount: 12,
    totalSpent: 31200,
    lastOrderDays: 1,
    messages: [
      { sender: 'user', text: 'Hola, ¿tienen delivery a Palermo?' },
      { sender: 'bot', text: '¡Hola María! Sí, tenemos delivery en Palermo de 9 a 22hs.' },
      { sender: 'user', text: 'Genial, ¿cuánto tarda aproximadamente?' },
      { sender: 'bot', text: 'La demora actual es de 30-45 minutos.' },
      { sender: 'user', text: '¿Tienen delivery?' }
    ]
  },
  {
    id: '3',
    customerName: 'Carlos Rodríguez',
    lastMessage: 'Gracias!',
    time: '09:50',
    status: 'Cerrado',
    tag: 'Pedido',
    phone: '+54 11 8765-4321',
    channel: 'Web',
    historyCount: 3,
    totalSpent: 7800,
    lastOrderDays: 5,
    messages: [
      { sender: 'user', text: 'Hola, mi pedido #3 ya está listo?' },
      { sender: 'bot', text: 'Hola Carlos, sí! Ya podés pasar a retirarlo por la sucursal Belgrano.' },
      { sender: 'user', text: 'Buenísimo, voy para allá' },
      { sender: 'bot', text: 'Te esperamos.' },
      { sender: 'user', text: 'Gracias!' }
    ]
  },
  {
    id: '4',
    customerName: 'Ana López',
    lastMessage: 'Llegó frío el café',
    time: '10:15',
    status: 'Nuevo',
    tag: 'Reclamo',
    phone: '+54 11 3456-7890',
    channel: 'WhatsApp',
    historyCount: 21,
    totalSpent: 54600,
    lastOrderDays: 0,
    messages: [
      { sender: 'user', text: 'Hola, acabo de recibir mi pedido' },
      { sender: 'bot', text: '¡Hola Ana! Esperamos que lo disfrutes.' },
      { sender: 'user', text: 'La verdad que no, llegó frío el café y la torta está aplastada' },
      { sender: 'bot', text: 'Lamentamos mucho el inconveniente. Ya mismo escalo tu reclamo con el local del Centro.' },
      { sender: 'user', text: 'Llegó frío el café' }
    ]
  },
  {
    id: '5',
    customerName: 'Pedro Martínez',
    lastMessage: '¿A qué hora cierran?',
    time: '12:05',
    status: 'En curso',
    tag: 'Consulta',
    phone: '+54 11 9876-5432',
    channel: 'WhatsApp',
    historyCount: 5,
    totalSpent: 13100,
    lastOrderDays: 10,
    messages: [
      { sender: 'user', text: 'Hola, quería consultar el horario de hoy' },
      { sender: 'bot', text: '¡Hola Pedro! Hoy abrimos hasta las 21hs.' },
      { sender: 'user', text: '¿A qué hora cierran?' }
    ]
  },
  {
    id: '6',
    customerName: 'Sofía Fernández',
    lastMessage: 'Quiero la torta de maracuyá',
    time: '13:35',
    status: 'Nuevo',
    tag: 'Pedido',
    phone: '+54 11 4321-8765',
    channel: 'Instagram',
    historyCount: 8,
    totalSpent: 20700,
    lastOrderDays: 2,
    messages: [
      { sender: 'user', text: 'Hola! Vi en Instagram la torta de maracuyá' },
      { sender: 'bot', text: '¡Hola Sofía! Sí, es nuestra especialidad de la semana.' },
      { sender: 'user', text: 'Quiero la torta de maracuyá' }
    ]
  }
];

export const MOCK_LOCATIONS: Location[] = [
  { id: '1', name: 'Banda Del Rio Salí', address: 'Av. Santo Cristo 661', hours: 'Lun-Dom 8-21hs', status: 'Abierto', activeOrders: 12, dailySales: 45600 },
  { id: '2', name: 'San Lorenzo', address: 'San Lorenzo 501-SMT', hours: 'Lun-Dom 9-22hs', status: 'Abierto', activeOrders: 8, dailySales: 32100 },
  { id: '3', name: 'Ranchillos', address: 'Fábrica', hours: 'Lun-Sab 8-20hs', status: 'Abierto', activeOrders: 5, dailySales: 18900 },
  { id: '4', name: 'Córdoba Esq. Monteagudo', address: 'Pastelería y Cafetería', hours: 'Lun-Vie 9-19hs', status: 'Cerrado', activeOrders: 0, dailySales: 12400 },
  { id: '5', name: 'San Pablo', address: 'Barrio Odontológico', hours: 'Lun-Dom 8-21hs', status: 'Abierto', activeOrders: 9, dailySales: 28450 }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Café Espresso', price: 650, category: 'Cafés', available: true, image: '☕' },
  { id: '2', name: 'Café con Leche', price: 850, category: 'Cafés', available: true, image: '🥛' },
  { id: '3', name: 'Cappuccino', price: 950, category: 'Cafés', available: true, image: '☕' },
  { id: '4', name: 'Submarino', price: 800, category: 'Cafés', available: true, image: '🍫' },
  { id: '5', name: 'Torta de Chocolate', price: 1200, category: 'Tortas', available: true, image: '🍰' },
  { id: '6', name: 'Cheesecake de Maracuyá', price: 1400, category: 'Tortas', available: true, image: '🍰' },
  { id: '7', name: 'Torta de Zanahoria', price: 1100, category: 'Tortas', available: true, image: '🍰' },
  { id: '8', name: 'Medialuna x3', price: 700, category: 'Otros', available: true, image: '🥐' },
  { id: '9', name: 'Combo Desayuno', price: 1300, category: 'Combos', available: true, image: '🍳' },
  { id: '10', name: 'Combo Merienda', price: 1800, category: 'Combos', available: true, image: '☕' },
  { id: '11', name: 'Brownie', price: 600, category: 'Otros', available: true, image: '🍫' },
  { id: '12', name: 'Tostado Jamón y Queso', price: 900, category: 'Otros', available: true, image: '🥪' }
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Juan Pérez', phone: '+54 11 4567-8901', channel: 'WhatsApp', ordersCount: 7, totalSpent: 18400, lastOrder: '2024-03-15' },
  { id: '2', name: 'María González', phone: '+54 11 2345-6789', channel: 'Instagram', ordersCount: 12, totalSpent: 31200, lastOrder: '2024-03-17' },
  { id: '3', name: 'Carlos Rodríguez', phone: '+54 11 8765-4321', channel: 'Web', ordersCount: 3, totalSpent: 7800, lastOrder: '2024-03-12' },
  { id: '4', name: 'Ana López', phone: '+54 11 3456-7890', channel: 'WhatsApp', ordersCount: 21, totalSpent: 54600, lastOrder: '2024-03-18' },
  { id: '5', name: 'Pedro Martínez', phone: '+54 11 9876-5432', channel: 'WhatsApp', ordersCount: 5, totalSpent: 13100, lastOrder: '2024-03-08' },
  { id: '6', name: 'Sofía Fernández', phone: '+54 11 4321-8765', channel: 'Instagram', ordersCount: 8, totalSpent: 20700, lastOrder: '2024-03-16' },
  { id: '7', name: 'Diego Sánchez', phone: '+54 11 5678-9012', channel: 'Web', ordersCount: 2, totalSpent: 5200, lastOrder: '2024-03-10' },
  { id: '8', name: 'Lucía Ramírez', phone: '+54 11 6789-0123', channel: 'WhatsApp', ordersCount: 15, totalSpent: 38900, lastOrder: '2024-03-14' }
];

export const SALES_DATA = [
  { name: 'Lun', sales: 12400 },
  { name: 'Mar', sales: 15600 },
  { name: 'Mie', sales: 18900 },
  { name: 'Jue', sales: 14200 },
  { name: 'Vie', sales: 22100 },
  { name: 'Sab', sales: 28400 },
  { name: 'Dom', sales: 25850 }
];
