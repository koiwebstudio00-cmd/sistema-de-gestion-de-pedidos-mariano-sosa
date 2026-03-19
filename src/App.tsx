import React, { useState, useEffect, useCallback } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShoppingCart, 
  Store, 
  Coffee, 
  Users, 
  Search, 
  Bell, 
  Menu,
  Send,
  MoreVertical,
  Plus,
  Filter,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Toaster, toast } from 'sonner';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  useDroppable
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Module, Order, Chat, Location, Product, Customer } from './types';
import { MOCK_ORDERS, MOCK_CHATS, MOCK_LOCATIONS, MOCK_PRODUCTS, MOCK_CUSTOMERS, SALES_DATA } from './data';

// --- Utility Components (shadcn-like) ---

const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string, key?: React.Key }) => (
  <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: 'default' | 'success' | 'warning' | 'danger' | 'info', className?: string }) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger: "bg-rose-100 text-rose-800",
    info: "bg-blue-100 text-blue-800",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = "primary", className = "", onClick, disabled }: { children: React.ReactNode, variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', className?: string, onClick?: () => void, disabled?: boolean }) => {
  const variants = {
    primary: "bg-coffee-primary text-white hover:bg-coffee-dark",
    secondary: "bg-coffee-secondary text-white hover:opacity-90",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-600",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };
  return (
    <button 
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Dialog = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

// --- Module Components ---

const DashboardModule = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Bienvenido de nuevo, Mariano.</p>
        </div>
        <div className="flex gap-2">
          <select className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
            <option>Todos los locales</option>
            {MOCK_LOCATIONS.map(l => <option key={l.id}>{l.name}</option>)}
          </select>
          <select className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none">
            <option>Todos los canales</option>
            <option>WhatsApp</option>
            <option>Instagram</option>
            <option>Web</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500">Pedidos del día</p>
              <h3 className="text-2xl font-bold mt-1">34</h3>
            </div>
            <div className="p-2 bg-coffee-primary/10 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-coffee-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600">
            <ChevronRight className="w-3 h-3 rotate-[-90deg]" />
            <span>+12% vs ayer</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500">Ventas totales</p>
              <h3 className="text-2xl font-bold mt-1">$127.450</h3>
            </div>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Globe className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600">
            <ChevronRight className="w-3 h-3 rotate-[-90deg]" />
            <span>+8% vs ayer</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500">Conversaciones activas</p>
              <h3 className="text-2xl font-bold mt-1">12</h3>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-600">
            <span>2 nuevas ahora</span>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500">Locales activos</p>
              <h3 className="text-2xl font-bold mt-1">4/5</h3>
            </div>
            <div className="p-2 bg-amber-100 rounded-lg">
              <Store className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-slate-500">
            <span>1 local cerrado</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold mb-6">Ventas de la última semana</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="sales" fill="#6F4E37" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold mb-6">Pedidos por estado</h3>
          <div className="space-y-4">
            {[
              { label: 'Pendientes', count: 8, color: 'bg-amber-500' },
              { label: 'En preparación', count: 6, color: 'bg-blue-500' },
              { label: 'Listos', count: 5, color: 'bg-emerald-500' },
              { label: 'Entregados', count: 15, color: 'bg-slate-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.count}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`${item.color} h-full`} 
                    style={{ width: `${(item.count / 34) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
            <img src="https://i.postimg.cc/J4qbcGC3/images.png" alt="Logo" className="h-16 opacity-80" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const ConversationsModule = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(MOCK_CHATS[0]);
  const [view, setView] = useState<'list' | 'chat' | 'info'>('list');

  useEffect(() => {
    if (selectedChat && view === 'list') {
      // In mobile, we might want to stay in list until clicked, but for desktop we need it selected
    }
  }, [selectedChat]);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    setView('chat');
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex gap-4 animate-fade-in relative overflow-hidden">
      {/* Chats List */}
      <Card className={`
        w-full md:w-80 flex flex-col overflow-hidden transition-all duration-300
        ${view === 'list' ? 'flex' : 'hidden md:flex'}
      `}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 md:hidden">Conversaciones</h3>
          <div className="relative flex-1 md:w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar chats..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:border-coffee-primary"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`p-4 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 ${selectedChat?.id === chat.id ? 'bg-coffee-primary/5 border-l-4 border-l-coffee-primary' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-sm truncate">{chat.customerName}</h4>
                <span className="text-[10px] text-slate-400">{chat.time}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-1 mb-2">{chat.lastMessage}</p>
              <div className="flex gap-1">
                <Badge variant={chat.status === 'Nuevo' ? 'danger' : chat.status === 'En curso' ? 'warning' : 'default'}>
                  {chat.status}
                </Badge>
                <Badge variant="info">{chat.tag}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Active Chat */}
      <Card className={`
        flex-1 flex flex-col overflow-hidden transition-all duration-300
        ${view === 'chat' ? 'flex' : 'hidden md:flex'}
      `}>
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                <button 
                  onClick={() => setView('list')}
                  className="md:hidden p-1 -ml-1 text-slate-400 hover:text-slate-600"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-coffee-secondary/20 flex items-center justify-center text-coffee-primary font-bold shrink-0 text-sm md:text-base cursor-pointer"
                  onClick={() => setView('info')}
                >
                  {selectedChat.customerName.charAt(0)}
                </div>
                <div onClick={() => setView('info')} className="cursor-pointer overflow-hidden">
                  <h4 className="font-semibold text-sm truncate">{selectedChat.customerName}</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-slate-400">En línea</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" className="p-2 h-8 w-8 md:h-9 md:w-9" onClick={() => setView('info')}><Users className="w-4 h-4 md:hidden" /><Phone className="w-4 h-4 hidden md:block" /></Button>
                <Button variant="ghost" className="p-2 h-8 w-8 md:h-9 md:w-9"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
              {selectedChat.messages.length > 0 ? (
                selectedChat.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] md:max-w-[70%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-coffee-primary text-white rounded-tr-none' 
                        : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  No hay mensajes previos para mostrar.
                </div>
              )}
            </div>
            <div className="p-3 md:p-4 border-t border-slate-100 bg-white">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje..." 
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:border-coffee-primary"
                />
                <Button className="h-10 w-10 p-0 shrink-0"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Selecciona una conversación para comenzar</p>
          </div>
        )}
      </Card>

      {/* Customer Info */}
      {selectedChat && (
        <Card className={`
          w-full md:w-72 p-6 flex flex-col gap-6 overflow-y-auto transition-all duration-300
          ${view === 'info' ? 'flex' : 'hidden lg:flex'}
        `}>
          <div className="flex justify-between items-center lg:hidden -mb-4">
            <button 
              onClick={() => setView('chat')}
              className="p-1 -ml-1 text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium"
            >
              <ChevronRight className="w-4 h-4 rotate-180" /> Volver al chat
            </button>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-coffee-secondary/10 flex items-center justify-center text-coffee-primary text-2xl font-bold mx-auto mb-4">
              {selectedChat.customerName.charAt(0)}
            </div>
            <h4 className="font-bold text-lg">{selectedChat.customerName}</h4>
            <p className="text-sm text-slate-500">{selectedChat.phone}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <div className="p-2 bg-slate-100 rounded-lg">
                {selectedChat.channel === 'WhatsApp' ? <Phone className="w-4 h-4 text-emerald-600" /> : selectedChat.channel === 'Instagram' ? <Instagram className="w-4 h-4 text-pink-600" /> : <Globe className="w-4 h-4 text-blue-600" />}
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Canal</p>
                <p className="font-medium">{selectedChat.channel}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Pedidos</p>
                <p className="text-lg font-bold">{selectedChat.historyCount}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Gastado</p>
                <p className="text-lg font-bold">${selectedChat.totalSpent}</p>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Último pedido</p>
              <p className="font-medium">Hace {selectedChat.lastOrderDays} días</p>
            </div>
          </div>

          <div className="mt-auto space-y-2">
            <Button variant="outline" className="w-full">Ver historial completo</Button>
            <Button variant="ghost" className="w-full text-rose-600 hover:bg-rose-50 md:hidden" onClick={() => setView('chat')}>Cerrar detalles</Button>
          </div>
        </Card>
      )}
    </div>
  );
};

// --- Kanban Components ---

const SortableItem = ({ order, onClick }: { order: Order, onClick: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: order.id, data: { type: 'Order', order } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} onClick={onClick}>
      <Card className="p-3 cursor-grab active:cursor-grabbing hover:border-coffee-primary transition-colors mb-2">
        <div className="flex justify-between items-start mb-1">
          <h5 className="font-bold text-xs truncate mr-2">{order.customerName}</h5>
          <span className="text-[9px] text-slate-400 shrink-0">{order.time}</span>
        </div>
        <p className="text-[10px] text-slate-500 mb-2 line-clamp-2">{order.products}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-xs text-coffee-primary">${order.total}</span>
          <div className="flex gap-1 flex-wrap justify-end">
            <Badge variant="info" className="text-[8px] px-1 py-0">{order.type}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

const DroppableColumn = ({ id, title, count, children }: { id: string, title: string, count: number, children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id, data: { type: 'Column', status: id } });
  return (
    <>
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <h4 className="font-bold text-[10px] xl:text-xs uppercase tracking-wider text-slate-500 truncate">{title}</h4>
          <span className="bg-slate-200 text-slate-600 text-[9px] px-1.5 py-0.5 rounded-md font-bold shrink-0">
            {count}
          </span>
        </div>
        <MoreVertical className="w-3 h-3 text-slate-400 shrink-0 hidden md:block" />
      </div>
      <div ref={setNodeRef} className="flex-1 bg-slate-50/50 rounded-xl p-1.5 overflow-y-auto border border-dashed border-slate-200">
        {children}
      </div>
    </>
  );
};

const KanbanModule = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: Order['status'][] = ['Nuevo', 'Confirmado', 'En preparación', 'Listo', 'Entregado', 'Cancelado'];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeOrder = orders.find(o => o.id === activeId);
    const overOrder = orders.find(o => o.id === overId);
    const isOverColumn = columns.includes(overId as Order['status']);

    if (!activeOrder) return;

    const overStatus = isOverColumn ? overId : overOrder?.status;

    if (overStatus && activeOrder.status !== overStatus) {
      setOrders(prev => {
        const activeIndex = prev.findIndex(o => o.id === activeId);
        const newOrders = [...prev];
        newOrders[activeIndex] = { ...newOrders[activeIndex], status: overStatus as Order['status'] };
        return newOrders;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeOrder = orders.find(o => o.id === activeId);
    const overOrder = orders.find(o => o.id === overId);

    if (activeOrder && overOrder && activeOrder.status === overOrder.status) {
      setOrders(prev => {
        const oldIndex = prev.findIndex(o => o.id === activeId);
        const newIndex = prev.findIndex(o => o.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Pedidos (Kanban)</h1>
        <Button className="w-full sm:w-auto"><Plus className="w-4 h-4" /> Nuevo pedido</Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex gap-3 h-full min-w-max md:min-w-0">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
            {columns.map(col => (
              <div key={col} className="w-[280px] md:flex-1 flex flex-col h-full min-w-0">
                <DroppableColumn id={col} title={col} count={orders.filter(o => o.status === col).length}>
                  <SortableContext items={orders.filter(o => o.status === col).map(o => o.id)} strategy={verticalListSortingStrategy}>
                    {orders.filter(o => o.status === col).map(order => (
                      <div key={order.id}>
                        <SortableItem order={order} onClick={() => setSelectedOrder(order)} />
                      </div>
                    ))}
                  </SortableContext>
                </DroppableColumn>
              </div>
            ))}
          </DndContext>
        </div>
      </div>

      <Dialog 
        isOpen={!!selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        title={`Detalle de Pedido #${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{selectedOrder.customerName}</h4>
                <p className="text-sm text-slate-500">{selectedOrder.time} • {selectedOrder.channel || 'WhatsApp'}</p>
              </div>
              <Badge variant="info" className="text-sm px-3 py-1">{selectedOrder.status}</Badge>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase">Productos</p>
              <div className="space-y-2">
                {selectedOrder.products.split('+').map((p, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>{p.trim()}</span>
                    <span className="font-medium">$---</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-coffee-primary">${selectedOrder.total}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Método de pago</p>
                <p className="font-medium">{selectedOrder.paymentMethod || 'Tarjeta de Crédito'}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Tipo de entrega</p>
                <p className="font-medium">{selectedOrder.type}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ubicación</p>
                <p className="font-medium">{selectedOrder.type === 'Delivery' ? selectedOrder.address : `Retiro en local: ${selectedOrder.location}`}</p>
              </div>
              {selectedOrder.notes && (
                <div className="col-span-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notas</p>
                  <p className="italic text-slate-600">"{selectedOrder.notes}"</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <Button className="flex-1">Cambiar estado</Button>
              <Button variant="outline" className="flex-1">Asignar local</Button>
            </div>
            <Button variant="secondary" className="w-full">Marcar como pagado</Button>
          </div>
        )}
      </Dialog>
    </div>
  );
};

const LocationsModule = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Locales</h1>
        <Button className="w-full sm:w-auto"><Plus className="w-4 h-4" /> Agregar local</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_LOCATIONS.map(loc => (
          <div key={loc.id}>
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-coffee-primary/10 rounded-xl">
                  <Store className="w-6 h-6 text-coffee-primary" />
                </div>
                <Badge variant={loc.status === 'Abierto' ? 'success' : 'danger'}>
                  {loc.status}
                </Badge>
              </div>
              <h3 className="font-bold text-lg mb-1">{loc.name}</h3>
              <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {loc.address}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <Clock className="w-3 h-3" /> {loc.hours}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Pedidos hoy</p>
                  <p className="text-xl font-bold">{loc.activeOrders}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Ventas hoy</p>
                  <p className="text-xl font-bold">${loc.dailySales.toLocaleString()}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full">Gestionar local</Button>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductsModule = () => {
  const [category, setCategory] = useState<string>('Todos');
  const categories = ['Todos', 'Cafés', 'Tortas', 'Combos', 'Otros'];

  const filteredProducts = category === 'Todos' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === category);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Productos</h1>
        <Button className="w-full sm:w-auto"><Plus className="w-4 h-4" /> Agregar producto</Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              category === cat 
                ? 'bg-coffee-primary text-white' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="md:hidden space-y-4">
        {filteredProducts.map(prod => (
          <Card key={prod.id} className="p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shrink-0">
                {prod.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-slate-900 truncate">{prod.name}</h3>
                  <button className="text-slate-400"><MoreVertical className="w-4 h-4" /></button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="default">{prod.category}</Badge>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${prod.available ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <span className="text-[10px] text-slate-500 font-medium">{prod.available ? 'Disponible' : 'Sin stock'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-coffee-primary">${prod.price}</span>
                  <Button variant="outline" className="py-1 px-3 text-xs h-8">Editar</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-slate-400 italic">No se encontraron productos.</div>
        )}
      </div>

      <Card className="hidden md:block overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Producto</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Categoría</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Precio</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Estado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(prod => (
              <tr key={prod.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
                      {prod.image}
                    </div>
                    <span className="font-medium text-sm">{prod.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="default">{prod.category}</Badge>
                </td>
                <td className="px-6 py-4 font-bold text-sm">
                  ${prod.price}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${prod.available ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <span className="text-xs">{prod.available ? 'Disponible' : 'Sin stock'}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-coffee-primary"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const CustomersModule = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar clientes..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-coffee-primary"
            />
          </div>
          <Button variant="outline" className="px-3"><Filter className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="md:hidden space-y-4">
        {MOCK_CUSTOMERS.map(cust => (
          <Card key={cust.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coffee-secondary/20 flex items-center justify-center text-coffee-primary font-bold">
                  {cust.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{cust.name}</h4>
                  <div className="flex items-center gap-2">
                    {cust.channel === 'WhatsApp' ? <Phone className="w-3 h-3 text-emerald-600" /> : cust.channel === 'Instagram' ? <Instagram className="w-3 h-3 text-pink-600" /> : <Globe className="w-3 h-3 text-blue-600" />}
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{cust.channel}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" className="p-1 h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-1">
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Pedidos</p>
                <p className="font-bold">{cust.ordersCount}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-2">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Invertido</p>
                <p className="font-bold">${cust.totalSpent.toLocaleString()}</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-right mt-2">Último pedido: {cust.lastOrder}</p>
          </Card>
        ))}
      </div>

      <Card className="hidden md:block overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Cliente</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Canal</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Pedidos</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Total Gastado</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Último Pedido</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CUSTOMERS.map(cust => (
              <tr key={cust.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-coffee-secondary/20 flex items-center justify-center text-coffee-primary font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{cust.name}</p>
                      <p className="text-[10px] text-slate-400">{cust.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {cust.channel === 'WhatsApp' ? <Phone className="w-3 h-3 text-emerald-600" /> : cust.channel === 'Instagram' ? <Instagram className="w-3 h-3 text-pink-600" /> : <Globe className="w-3 h-3 text-blue-600" />}
                    <span className="text-xs">{cust.channel}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {cust.ordersCount}
                </td>
                <td className="px-6 py-4 font-bold text-sm">
                  ${cust.totalSpent.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {cust.lastOrder}
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" className="p-1 h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// --- Main App Layout ---

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [activeConversations, setActiveConversations] = useState(12);
  const [unreadCount, setUnreadCount] = useState(3);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Real-time simulations
  useEffect(() => {
    const toastInterval = setInterval(() => {
      const randomCustomer = MOCK_CUSTOMERS[Math.floor(Math.random() * MOCK_CUSTOMERS.length)];
      const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
      toast(`🆕 Nuevo pedido de ${randomCustomer.name}`, {
        description: `${randomProduct.name} x1 — $${randomProduct.price}`,
        icon: <ShoppingCart className="w-4 h-4 text-coffee-primary" />,
      });
    }, 30000);

    const conversationsInterval = setInterval(() => {
      setActiveConversations(prev => prev + 1);
      setUnreadCount(prev => prev + 1);
    }, 45000);

    return () => {
      clearInterval(toastInterval);
      clearInterval(conversationsInterval);
    };
  }, []);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardModule />;
      case 'conversations': return <ConversationsModule />;
      case 'orders': return <KanbanModule />;
      case 'locations': return <LocationsModule />;
      case 'products': return <ProductsModule />;
      case 'customers': return <CustomersModule />;
      default: return <DashboardModule />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'conversations', label: 'Conversaciones', icon: MessageSquare, badge: unreadCount },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'locations', label: 'Locales', icon: Store },
    { id: 'products', label: 'Productos', icon: Coffee },
    { id: 'customers', label: 'Clientes', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Toaster position="top-right" richColors />
      
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-300 transform 
        lg:translate-x-0 lg:static lg:inset-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.postimg.cc/3wvQTVXQ/Captura-de-pantalla-2026-03-19-a-la-s-7-05-57-p-m-removebg-preview.png" alt="Logo" className="h-10" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <h1 className="font-bold text-xs leading-tight text-coffee-dark uppercase tracking-tighter">Mariano Sosa</h1>
              <p className="text-[10px] text-slate-400 font-medium">Cake Shop</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-600">
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveModule(item.id as Module);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                activeModule === item.id 
                  ? 'bg-coffee-primary text-white shadow-md shadow-coffee-primary/20' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${activeModule === item.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {item.label}
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  activeModule === item.id ? 'bg-white text-coffee-primary' : 'bg-rose-500 text-white pulsing-badge'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">MS</div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold truncate">Mariano Sosa</p>
              <p className="text-[10px] text-slate-400 truncate">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Plataforma</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-slate-900 capitalize">{activeModule}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-sm outline-none focus:border-coffee-primary w-64"
              />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto pb-12">
            {renderModule()}
          </div>
        </div>
      </main>
    </div>
  );
}
