/**
 * Placeholder API Service Layer
 * ==============================
 * This file contains all placeholder API functions that return mock data.
 * 
 * To integrate with real backend endpoints:
 * 1. Replace all async functions with actual HTTP calls (fetch/axios)
 * 2. Update response types to match your backend schema
 * 3. Handle authentication tokens in headers
 * 4. Add proper error handling and retry logic
 * 
 * Example migration:
 * OLD: return sampleMenuItems;
 * NEW: return fetch('/api/menu').then(r => r.json());
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface MenuItem {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  vegNonVeg: 'veg' | 'non-veg';
  prepTime: number; // in minutes
  active: boolean;
}

export interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  noteForChef?: string;
}

export interface Order {
  id: number;
  tableNumber: number;
  items: OrderItem[];
  status: string;
  timestamp: Date;
}

export interface Table {
  id: number;
  name: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'needs_cleaning';
  currentBill?: number;
}

export interface Room {
  id: number;
  number: number;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  guestName?: string;
  guestInfo?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface OnlineOrder {
  id: string;
  platform: 'zomato' | 'swiggy';
  orderId: string;
  items: string[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  customerName: string;
  deliveryTime?: string;
}

export interface ActivityEvent {
  id: string;
  message: string;
  timestamp: Date;
  type: 'bill' | 'cleaning' | 'checkin' | 'checkout' | 'order' | 'system';
}

// ============================================================================
// SAMPLE DATA
// ============================================================================

const sampleMenuItems: MenuItem[] = [
  { id: 1, name: 'Biryani', category: 'Mains', price: 250, description: 'Fragrant rice dish', vegNonVeg: 'non-veg', prepTime: 20, active: true },
  { id: 2, name: 'Butter Chicken', category: 'Mains', price: 320, description: 'Creamy chicken curry', vegNonVeg: 'non-veg', prepTime: 15, active: true },
  { id: 3, name: 'Dal Makhani', category: 'Mains', price: 180, description: 'Creamy lentil curry', vegNonVeg: 'veg', prepTime: 20, active: true },
  { id: 4, name: 'Garlic Naan', category: 'Breads', price: 60, description: 'Soft naan with garlic', vegNonVeg: 'veg', prepTime: 5, active: true },
  { id: 5, name: 'Paneer Tikka', category: 'Appetizers', price: 200, description: 'Grilled cottage cheese', vegNonVeg: 'veg', prepTime: 10, active: true },
  { id: 6, name: 'Samosa', category: 'Appetizers', price: 80, description: 'Crispy pastry with potato', vegNonVeg: 'veg', prepTime: 8, active: true },
  { id: 7, name: 'Gulab Jamun', category: 'Desserts', price: 100, description: 'Sweet milk solids', vegNonVeg: 'veg', prepTime: 12, active: true },
  { id: 8, name: 'Mango Lassi', category: 'Beverages', price: 120, description: 'Sweet yogurt drink', vegNonVeg: 'veg', prepTime: 3, active: true },
  { id: 9, name: 'Chole Bhature', category: 'Mains', price: 180, description: 'Chickpea curry with fried bread', vegNonVeg: 'veg', prepTime: 18, active: true },
  { id: 10, name: 'Tandoori Chicken', category: 'Appetizers', price: 280, description: 'Spiced grilled chicken', vegNonVeg: 'non-veg', prepTime: 25, active: true },
];

const sampleTables: Table[] = [
  { id: 1, name: 'Table 1', number: 1, capacity: 2, status: 'available' },
  { id: 2, name: 'Table 2', number: 2, capacity: 4, status: 'occupied' },
  { id: 3, name: 'Table 3', number: 3, capacity: 6, status: 'available' },
  { id: 4, name: 'Table 4', number: 4, capacity: 2, status: 'needs_cleaning' },
  { id: 5, name: 'Table 5', number: 5, capacity: 4, status: 'available' },
  { id: 6, name: 'Table 6', number: 6, capacity: 8, status: 'occupied' },
];

const sampleRooms: Room[] = [
  { id: 1, number: 101, name: 'Room 101', status: 'occupied', guestName: 'John Doe', guestInfo: 'John Doe', checkInDate: '2025-12-06', checkOutDate: '2025-12-08' },
  { id: 2, number: 102, name: 'Room 102', status: 'available' },
  { id: 3, number: 103, name: 'Room 103', status: 'occupied', guestName: 'Jane Smith', guestInfo: 'Jane Smith', checkInDate: '2025-12-05', checkOutDate: '2025-12-10' },
  { id: 4, number: 104, name: 'Room 104', status: 'available' },
  { id: 5, number: 105, name: 'Room 105', status: 'maintenance' },
  { id: 6, number: 106, name: 'Room 106', status: 'occupied', guestName: 'Bob Wilson', guestInfo: 'Bob Wilson', checkInDate: '2025-12-07', checkOutDate: '2025-12-09' },
];

const sampleOnlineOrders: OnlineOrder[] = [
  { id: '1', platform: 'zomato', orderId: '5544', items: ['Biryani', 'Naan', 'Lassi'], total: 450, status: 'delivered', customerName: 'Arjun' },
  { id: '2', platform: 'swiggy', orderId: '7823', items: ['Butter Chicken', 'Rice'], total: 520, status: 'ready', customerName: 'Priya' },
  { id: '3', platform: 'zomato', orderId: '6201', items: ['Dal Makhani', 'Naan', 'Samosa'], total: 380, status: 'preparing', customerName: 'Vikram' },
];

// ============================================================================
// API FUNCTIONS
// ============================================================================

export const api = {
  // Menu Management
  getMenuItems: async (): Promise<MenuItem[]> => {
    console.log('📋 [API] Fetching menu items');
    await new Promise(resolve => setTimeout(resolve, 200));
    return sampleMenuItems;
  },

  addMenuItem: async (payload: Omit<MenuItem, 'id'> | any): Promise<MenuItem> => {
    console.log('➕ [API] Adding menu item:', payload);
    await new Promise(resolve => setTimeout(resolve, 300));
    // Provide defaults for missing fields from legacy components
    return {
      id: Date.now(),
      vegNonVeg: payload.vegNonVeg || 'veg',
      prepTime: payload.prepTime || 15,
      active: payload.active !== false,
      ...payload,
    };
  },

  updateMenuItem: async (id: number, payload: Partial<MenuItem>): Promise<MenuItem> => {
    console.log(`✏️ [API] Updating menu item ${id}:`, payload);
    await new Promise(resolve => setTimeout(resolve, 300));
    const item = sampleMenuItems.find(m => m.id === id);
    return { ...item, ...payload, id } as MenuItem;
  },

  disableMenuItem: async (id: number, active: boolean): Promise<{ success: boolean }> => {
    console.log(`🔒 [API] Setting menu item ${id} active=${active}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    const item = sampleMenuItems.find(m => m.id === id);
    if (item) item.active = active;
    return { success: true };
  },

  deleteMenuItem: async (id: number): Promise<{ success: boolean }> => {
    console.log(`🗑️ [API] Deleting menu item ${id}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  },

  // Table Management
  getTables: async (): Promise<Table[]> => {
    console.log('🪑 [API] Fetching tables');
    await new Promise(resolve => setTimeout(resolve, 200));
    return sampleTables;
  },

  getOrderDetails: async (tableId: number): Promise<{ tableId: number; items: OrderItem[]; total: number } | null> => {
    console.log(`📦 [API] Fetching order details for table ${tableId}`);
    await new Promise(resolve => setTimeout(resolve, 150));
    const table = sampleTables.find(t => t.id === tableId);
    if (!table) return null;
    return {
      tableId,
      items: [
        { id: 1, name: 'Biryani', qty: 2, price: 250 },
        { id: 4, name: 'Naan', qty: 3, price: 60 },
      ],
      total: 680,
    };
  },

  updateTableStatus: async (tableId: number, status: Table['status']): Promise<{ success: boolean }> => {
    console.log(`🔄 [API] Updating table ${tableId} status to ${status}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    const table = sampleTables.find(t => t.id === tableId);
    if (table) table.status = status;
    return { success: true };
  },

  // Room Management
  getRooms: async (): Promise<Room[]> => {
    console.log('🛏️ [API] Fetching rooms');
    await new Promise(resolve => setTimeout(resolve, 200));
    return sampleRooms;
  },

  checkInGuest: async (roomId: number, guestName: string, checkInDate: string, checkOutDate: string): Promise<{ success: boolean }> => {
    console.log(`✅ [API] Checking in guest ${guestName} to room ${roomId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    const room = sampleRooms.find(r => r.id === roomId);
    if (room) {
      room.status = 'occupied';
      room.guestName = guestName;
      room.checkInDate = checkInDate;
      room.checkOutDate = checkOutDate;
    }
    return { success: true };
  },

  checkOutGuest: async (roomId: number): Promise<{ success: boolean }> => {
    console.log(`🚪 [API] Checking out guest from room ${roomId}`);
    await new Promise(resolve => setTimeout(resolve, 300));
    const room = sampleRooms.find(r => r.id === roomId);
    if (room) {
      room.status = 'available';
      room.guestName = undefined;
      room.checkInDate = undefined;
      room.checkOutDate = undefined;
    }
    return { success: true };
  },

  // Online Orders
  getOnlineOrders: async (): Promise<OnlineOrder[]> => {
    console.log('🍕 [API] Fetching online orders');
    await new Promise(resolve => setTimeout(resolve, 200));
    return sampleOnlineOrders;
  },

  updateOrderStatus: async (orderId: string | number, status: OnlineOrder['status'] | string): Promise<{ success: boolean }> => {
    console.log(`📊 [API] Updating order ${orderId} status to ${status}`);
    await new Promise(resolve => setTimeout(resolve, 200));
    const order = sampleOnlineOrders.find(o => o.id === String(orderId));
    if (order) order.status = status as OnlineOrder['status'];
    return { success: true };
  },

  // Utility
  generateInvoice: async (_items: OrderItem[]): Promise<{ invoiceId: string; timestamp: Date }> => {
    console.log('🧾 [API] Generating invoice');
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      invoiceId: `INV-${Date.now()}`,
      timestamp: new Date(),
    };
  },

  // Phase 1 Placeholder Methods (for legacy components)
  getAllOrders: async (): Promise<Order[]> => {
    console.log('📋 [API] Fetching all orders');
    await new Promise(resolve => setTimeout(resolve, 200));
    return [];
  },

  placeCustomerOrder: async (payload: any): Promise<{ orderId: string }> => {
    console.log('🛒 [API] Placing customer order:', payload);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { orderId: `ORD-${Date.now()}` };
  },

  placeWaiterOrder: async (payload: any): Promise<{ orderId: string }> => {
    console.log('📝 [API] Placing waiter order:', payload);
    await new Promise(resolve => setTimeout(resolve, 300));
    return { orderId: `ORD-${Date.now()}` };
  },

  getKitchenOrders: async (): Promise<Order[]> => {
    console.log('👨‍🍳 [API] Fetching kitchen orders');
    await new Promise(resolve => setTimeout(resolve, 200));
    return [];
  },

  addTable: async (table: Omit<Table, 'id'> | any): Promise<Table> => {
    console.log('➕ [API] Adding table:', table);
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: Date.now(),
      name: table.name || `Table ${table.number || table.tableNumber}`,
      number: table.number || table.tableNumber || 0,
      ...table,
    };
  },
};

// ============================================================================
// STANDALONE EXPORTS FOR DIRECT IMPORTS
// ============================================================================

export const getMenuItems = (): MenuItem[] => sampleMenuItems;
export const getTables = (): Table[] => sampleTables;
export const getRooms = (): Room[] => sampleRooms;
export const getOnlineOrders = (): OnlineOrder[] => sampleOnlineOrders;

export const getOrderDetails = (tableId: number) => ({
  tableId,
  items: [
    { id: 1, name: 'Biryani', qty: 2, price: 250, noteForChef: '' },
    { id: 4, name: 'Naan', qty: 3, price: 60, noteForChef: '' },
  ],
  total: 680,
});

export const updateTableStatus = (tableId: number, status: Table['status']) => {
  const table = sampleTables.find(t => t.id === tableId);
  if (table) table.status = status;
  return { success: true };
};

export const checkInGuest = (roomId: number, guestName: string) => {
  const room = sampleRooms.find(r => r.id === roomId);
  if (room) {
    room.status = 'occupied';
    room.guestName = guestName;
    room.checkInDate = new Date().toISOString().split('T')[0];
  }
  return { success: true };
};

export const checkOutGuest = (roomId: number) => {
  const room = sampleRooms.find(r => r.id === roomId);
  if (room) {
    room.status = 'available';
    room.guestName = undefined;
    room.checkInDate = undefined;
    room.checkOutDate = undefined;
  }
  return { success: true };
};

export const updateOrderStatus = (orderId: string | number, status: string) => {
  const order = sampleOnlineOrders.find(o => o.id === String(orderId));
  if (order) order.status = status as OnlineOrder['status'];
  return { success: true };
};

export const generateInvoice = (_items: OrderItem[]) => ({
  invoiceId: `INV-${Date.now()}`,
  timestamp: new Date(),
});
