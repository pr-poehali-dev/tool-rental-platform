
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
  bookings?: {
    count: number;
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
  type?: 'order' | 'product' | 'customer' | 'system' | 'booking';
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

// Типы для бронирования
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number; // в минутах
  image?: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServicesResponse {
  data: Service[];
  pagination: PaginationParams;
}

export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
  count?: number;
}

export interface ServiceCategoriesResponse {
  data: ServiceCategory[];
  pagination: PaginationParams;
}

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  avatar?: string;
  specializations: string[];
  schedule?: WeeklySchedule;
  isActive: boolean;
}

export interface EmployeesResponse {
  data: Employee[];
  pagination: PaginationParams;
}

export interface WeeklySchedule {
  monday: DailySchedule;
  tuesday: DailySchedule;
  wednesday: DailySchedule;
  thursday: DailySchedule;
  friday: DailySchedule;
  saturday: DailySchedule;
  sunday: DailySchedule;
}

export interface DailySchedule {
  isWorkDay: boolean;
  startTime?: string; // "09:00"
  endTime?: string; // "18:00"
  breaks?: TimeRange[];
}

export interface TimeRange {
  start: string; // "13:00"
  end: string; // "14:00"
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO date
  endTime: string; // ISO date
  isAvailable: boolean;
  employeeId?: number;
}

export interface AvailableTimeSlotsResponse {
  date: string;
  serviceId: number;
  slots: TimeSlot[];
}

export interface Booking {
  id: number;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    id: number;
    name: string;
    price: number;
    duration: number;
  };
  employee: {
    id: number;
    name: string;
  };
  startTime: string; // ISO date
  endTime: string; // ISO date
  status: BookingStatus;
  notes?: string;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'cancelled';

export interface BookingsResponse {
  data: Booking[];
  pagination: PaginationParams;
}

export interface BookingStatistics {
  total: number;
  completed: number;
  cancelled: number;
  pending: number;
  revenue: number;
  mostPopularService?: {
    id: number;
    name: string;
    bookingsCount: number;
  };
  mostActiveEmployee?: {
    id: number;
    name: string;
    bookingsCount: number;
  };
}
