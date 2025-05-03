
// Общие типы для pagination и sorting
export interface PaginationParams {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SortingOption {
  field: string;
  direction: 'asc' | 'desc';
  label: string;
}

// Типы для продуктов
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  isAvailable?: boolean;
  attributes?: ProductAttribute[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductsResponse {
  data: Product[];
  pagination: PaginationParams;
}

// Типы для заказов
export interface Order {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  orderItems: OrderItem[];
  status: OrderStatus;
  total: number;
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  paymentMethod: PaymentMethod;
  comments?: string[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';

export interface OrderItem {
  id: number;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  days: number;
  subtotal: number;
}

export type PaymentMethod = 'card' | 'cash' | 'sbp' | 'invoice';

export interface OrdersResponse {
  data: Order[];
  pagination: PaginationParams;
}

// Типы для клиентов
export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  ordersCount: number;
  totalSpent: number;
  notes?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomersResponse {
  data: Customer[];
  pagination: PaginationParams;
}

// Типы для аналитики
export interface DashboardStats {
  revenue: {
    total: number;
    change: {
      value: number;
      percentage: number;
      direction: 'up' | 'down';
    };
  };
  activeOrders: {
    count: number;
    change: {
      value: number;
      percentage: number;
      direction: 'up' | 'down';
    };
  };
  customers: {
    total: number;
    change: {
      value: number;
      percentage: number;
      direction: 'up' | 'down';
    };
  };
  products: {
    available: number;
    change: {
      value: number;
      percentage: number;
      direction: 'up' | 'down';
    };
  };
}

export interface RevenueData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export interface CategoryDistribution {
  name: string;
  value: number;
}

// Типы для настроек
export interface GeneralSettings {
  storeName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface DeliverySettings {
  cityDeliveryPrice: number;
  outsideCityDeliveryPrice: number;
  freeDeliveryThreshold: number;
}

export interface PaymentSettings {
  allowCardPayment: boolean;
  allowCashPayment: boolean;
  allowSbpPayment: boolean;
  allowInvoicePayment: boolean;
  merchantId?: string;
  apiKey?: string;
}

export interface NotificationSettings {
  email: {
    newOrder: boolean;
    orderStatusChange: boolean;
    delivery: boolean;
    promotions: boolean;
    senderEmail: string;
    senderName: string;
  };
  sms: {
    newOrder: boolean;
    delivery: boolean;
    promotions: boolean;
    apiUrl: string;
    apiKey: string;
  };
}

// Типы для уведомлений
export interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type?: 'order' | 'product' | 'customer' | 'system';
  link?: string;
}

export interface NotificationsResponse {
  data: Notification[];
  pagination: PaginationParams;
  unreadCount: number;
}

// Типы для аутентификации
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    name: string;
    role: 'admin' | 'manager' | 'employee';
  };
}
