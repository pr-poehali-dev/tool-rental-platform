
import { 
  Product, 
  ProductsResponse, 
  OrdersResponse, 
  Order, 
  OrderStatus, 
  Customer, 
  CustomersResponse,
  DashboardStats,
  RevenueData,
  CategoryDistribution,
  Notification,
  NotificationsResponse,
  GeneralSettings,
  DeliverySettings,
  PaymentSettings,
  NotificationSettings,
  AuthResponse,
  LoginCredentials
} from './types';
import { products as mockProducts, categories } from './data';

// Вспомогательная функция задержки для имитации работы API
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Функция пагинации для мок-данных
function paginate<T>(array: T[], page = 1, limit = 10): { data: T[], pagination: { page: number, limit: number, total: number, totalPages: number } } {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: array.length,
      totalPages: Math.ceil(array.length / limit),
    },
  };
}

// Сгенерировать случайные заказы
const generateMockOrders = (): Order[] => {
  const statuses: OrderStatus[] = ['pending', 'confirmed', 'active', 'completed', 'cancelled'];
  const paymentMethods = ['card', 'cash', 'sbp', 'invoice'];
  
  return Array.from({ length: 25 }, (_, i) => {
    const randomProducts = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      const days = [1, 3, 7, 14, 30][Math.floor(Math.random() * 5)];
      
      return {
        id: Math.floor(Math.random() * 1000) + 1,
        product: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price
        },
        quantity,
        days,
        subtotal: product.price * quantity * days
      };
    });
    
    const total = randomProducts.reduce((sum, item) => sum + item.subtotal, 0);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Генерация даты за последние 30 дней
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: i + 1,
      customer: {
        id: Math.floor(Math.random() * 100) + 1,
        name: [`Иванов Иван`, `Петров Петр`, `Сидорова Елена`, `Козлов Дмитрий`, `Смирнова Ольга`][Math.floor(Math.random() * 5)],
        email: `client${i}@example.com`,
        phone: `+7 (9${Math.floor(Math.random() * 99)}) ${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)}`
      },
      orderItems: randomProducts,
      status,
      total,
      deliveryAddress: `г. Москва, ул. Примерная, д. ${Math.floor(Math.random() * 100) + 1}`,
      deliveryDate: new Date(date.getTime() + 86400000 * 2).toISOString().split('T')[0],
      deliveryTimeSlot: ['10:00-14:00', '14:00-18:00', '18:00-22:00'][Math.floor(Math.random() * 3)],
      paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as any,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString()
    };
  });
};

const mockOrders = generateMockOrders();

// Сгенерировать случайных клиентов
const generateMockCustomers = (): Customer[] => {
  const names = [
    'Иванов Иван',
    'Петров Петр',
    'Сидорова Елена',
    'Козлов Дмитрий',
    'Смирнова Ольга',
    'Антонов Артём',
    'Кузнецова Марина',
    'Николаев Сергей',
    'Морозова Анна',
    'Волков Алексей',
    'Федорова Екатерина',
    'Соколов Александр',
    'Новикова Наталья',
    'Попов Михаил',
    'Лебедева Юлия'
  ];
  
  return Array.from({ length: 15 }, (_, i) => {
    const name = names[i % names.length];
    const ordersCount = Math.floor(Math.random() * 10) + 1;
    const totalSpent = (Math.floor(Math.random() * 50) + 10) * 100;
    
    // Генерация даты регистрации
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 365));
    
    return {
      id: i + 1,
      name,
      email: `${name.split(' ')[0].toLowerCase()}@example.com`,
      phone: `+7 (9${Math.floor(Math.random() * 99)}) ${Math.floor(Math.random() * 999)}-${Math.floor(Math.random() * 99)}-${Math.floor(Math.random() * 99)}`,
      address: `г. Москва, ул. ${['Ленина', 'Пушкина', 'Гагарина', 'Строителей', 'Мира'][Math.floor(Math.random() * 5)]}, д. ${Math.floor(Math.random() * 100) + 1}`,
      ordersCount,
      totalSpent,
      notes: Math.random() > 0.7 ? ['Постоянный клиент', 'Предпочитает доставку в вечернее время'] : [],
      createdAt: date.toISOString(),
      updatedAt: date.toISOString()
    };
  });
};

const mockCustomers = generateMockCustomers();

// Сгенерировать случайные уведомления
const generateMockNotifications = (): Notification[] => {
  const types = ['order', 'product', 'customer', 'system'];
  const titles = [
    'Новый заказ',
    'Отмена заказа',
    'Товар заканчивается на складе',
    'Оплата получена',
    'Новый клиент зарегистрирован',
    'Система обновлена',
    'Необходимо продление лицензии'
  ];
  
  return Array.from({ length: 15 }, (_, i) => {
    const typeIndex = Math.floor(Math.random() * types.length);
    const type = types[typeIndex] as 'order' | 'product' | 'customer' | 'system';
    
    // Выбираем заголовок в зависимости от типа
    let title = '';
    let description = '';
    let link = '';
    
    switch (type) {
      case 'order':
        title = 'Новый заказ';
        description = `Поступил новый заказ #${1000 + Math.floor(Math.random() * 1000)} от клиента ${mockCustomers[Math.floor(Math.random() * mockCustomers.length)].name}`;
        link = `/admin?tab=orders&id=${Math.floor(Math.random() * 100)}`;
        break;
      case 'product':
        title = 'Товар заканчивается на складе';
        description = `${mockProducts[Math.floor(Math.random() * mockProducts.length)].name} заканчивается на складе`;
        link = `/admin?tab=products&id=${Math.floor(Math.random() * 100)}`;
        break;
      case 'customer':
        title = 'Новый клиент';
        description = `Зарегистрирован новый клиент: ${mockCustomers[Math.floor(Math.random() * mockCustomers.length)].name}`;
        link = `/admin?tab=customers&id=${Math.floor(Math.random() * 100)}`;
        break;
      case 'system':
        title = 'Системное уведомление';
        description = 'Необходимо обновить систему до последней версии';
        link = `/admin?tab=settings`;
        break;
    }
    
    // Генерация времени уведомления (от нескольких минут до нескольких дней назад)
    const timeAgo = [
      '5 минут назад',
      '10 минут назад',
      '30 минут назад',
      '1 час назад',
      '2 часа назад',
      '5 часов назад',
      'Вчера',
      '2 дня назад'
    ][Math.floor(Math.random() * 8)];
    
    return {
      id: i + 1,
      title,
      description,
      time: timeAgo,
      read: i > 3, // Первые 3 уведомления непрочитанные
      type,
      link
    };
  });
};

const mockNotifications = generateMockNotifications();

// Мок API для аутентификации
export const mockAuthAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(800);
    
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      return {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          username: 'admin',
          name: 'Администратор',
          role: 'admin'
        }
      };
    }
    
    throw new Error('Неверный логин или пароль');
  }
};

// Мок API для товаров
export const mockProductsAPI = {
  getAll: async (params?: any): Promise<ProductsResponse> => {
    await delay(800);
    
    let filteredProducts = [...mockProducts];
    
    // Применяем фильтрацию по поиску
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Применяем фильтрацию по категории
    if (params?.category && params.category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === params.category.toLowerCase()
      );
    }
    
    // Применяем сортировку
    if (params?.sort) {
      const [field, direction] = params.sort.split('-');
      filteredProducts.sort((a: any, b: any) => {
        if (direction === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    return paginate<Product>(filteredProducts, params?.page, params?.limit);
  },
  
  getById: async (id: number): Promise<Product> => {
    await delay(500);
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    return {
      ...product,
      stock: Math.floor(Math.random() * 10) + 1,
      isAvailable: true,
      attributes: [
        { name: 'Бренд', value: 'Bosch' },
        { name: 'Мощность', value: '800 Вт' },
        { name: 'Вес', value: '2.7 кг' }
      ],
      createdAt: '2025-01-15T12:00:00Z',
      updatedAt: '2025-04-10T15:30:00Z'
    };
  },
  
  create: async (productData: FormData): Promise<Product> => {
    await delay(1000);
    
    // Имитация создания продукта
    const newProduct: Product = {
      id: mockProducts.length + 1,
      name: productData.get('name') as string || 'Новый товар',
      description: productData.get('description') as string || 'Описание',
      price: Number(productData.get('price')) || 100,
      category: productData.get('category') as string || 'Электроинструмент',
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // В реальном API здесь был бы возврат созданного продукта с id
    return newProduct;
  },
  
  update: async (id: number, productData: FormData): Promise<Product> => {
    await delay(1000);
    
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Товар не найден');
    }
    
    // Имитация обновления продукта
    const updatedProduct: Product = {
      ...product,
      name: productData.get('name') as string || product.name,
      description: productData.get('description') as string || product.description,
      price: Number(productData.get('price')) || product.price,
      category: productData.get('category') as string || product.category,
      updatedAt: new Date().toISOString()
    };
    
    return updatedProduct;
  },
  
  delete: async (id: number): Promise<{ success: boolean }> => {
    await delay(800);
    
    const productIndex = mockProducts.findIndex(p => p.id === id);
    if (productIndex === -1) {
      throw new Error('Товар не найден');
    }
    
    // В реальном API здесь был бы реальное удаление
    return { success: true };
  },
  
  getCategories: async (): Promise<string[]> => {
    await delay(300);
    return categories;
  }
};

// Мок API для заказов
export const mockOrdersAPI = {
  getAll: async (params?: any): Promise<OrdersResponse> => {
    await delay(800);
    
    let filteredOrders = [...mockOrders];
    
    // Применяем фильтрацию по статусу
    if (params?.status && params.status !== 'all') {
      filteredOrders = filteredOrders.filter(o => o.status === params.status);
    }
    
    // Применяем фильтрацию по дате
    if (params?.dateFrom) {
      const dateFrom = new Date(params.dateFrom);
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) >= dateFrom);
    }
    
    if (params?.dateTo) {
      const dateTo = new Date(params.dateTo);
      dateTo.setHours(23, 59, 59);
      filteredOrders = filteredOrders.filter(o => new Date(o.createdAt) <= dateTo);
    }
    
    // Применяем фильтрацию по клиенту
    if (params?.customerId) {
      filteredOrders = filteredOrders.filter(o => o.customer.id === Number(params.customerId));
    }
    
    // Сортировка по дате (новые сначала)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return paginate<Order>(filteredOrders, params?.page, params?.limit);
  },
  
  getById: async (id: number): Promise<Order> => {
    await delay(500);
    
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Заказ не найден');
    }
    
    return order;
  },
  
  updateStatus: async (id: number, status: string): Promise<Order> => {
    await delay(800);
    
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      throw new Error('Заказ не найден');
    }
    
    // Имитация обновления статуса
    const updatedOrder = {
      ...order,
      status: status as OrderStatus,
      updatedAt: new Date().toISOString()
    };
    
    return updatedOrder;
  },
  
  getStatistics: async (period: string): Promise<any> => {
    await delay(600);
    
    // Имитация статистики заказов
    return {
      totalOrders: mockOrders.length,
      totalRevenue: mockOrders.reduce((sum, order) => sum + order.total, 0),
      averageOrderValue: Math.round(mockOrders.reduce((sum, order) => sum + order.total, 0) / mockOrders.length),
      statusDistribution: {
        pending: mockOrders.filter(o => o.status === 'pending').length,
        confirmed: mockOrders.filter(o => o.status === 'confirmed').length,
        active: mockOrders.filter(o => o.status === 'active').length,
        completed: mockOrders.filter(o => o.status === 'completed').length,
        cancelled: mockOrders.filter(o => o.status === 'cancelled').length
      }
    };
  }
};

// Мок API для клиентов
export const mockCustomersAPI = {
  getAll: async (params?: any): Promise<CustomersResponse> => {
    await delay(800);
    
    let filteredCustomers = [...mockCustomers];
    
    // Применяем поиск
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      filteredCustomers = filteredCustomers.filter(c => 
        c.name.toLowerCase().includes(searchLower) || 
        c.email.toLowerCase().includes(searchLower) ||
        c.phone.includes(params.search)
      );
    }
    
    // Применяем сортировку
    if (params?.sort) {
      const [field, direction] = params.sort.split('-');
      filteredCustomers.sort((a: any, b: any) => {
        if (direction === 'asc') {
          return a[field] > b[field] ? 1 : -1;
        } else {
          return a[field] < b[field] ? 1 : -1;
        }
      });
    }
    
    return paginate<Customer>(filteredCustomers, params?.page, params?.limit);
  },
  
  getById: async (id: number): Promise<Customer> => {
    await delay(500);
    
    const customer = mockCustomers.find(c => c.id === id);
    if (!customer) {
      throw new Error('Клиент не найден');
    }
    
    return customer;
  },
  
  create: async (customerData: any): Promise<Customer> => {
    await delay(1000);
    
    // Имитация создания клиента
    const newCustomer: Customer = {
      id: mockCustomers.length + 1,
      name: customerData.name || 'Новый клиент',
      email: customerData.email || 'new@example.com',
      phone: customerData.phone || '+7 (999) 123-45-67',
      address: customerData.address || '',
      ordersCount: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return newCustomer;
  },
  
  getCustomerOrders: async (id: number): Promise<Order[]> => {
    await delay(700);
    
    // Имитация получения заказов клиента
    const customerOrders = mockOrders.filter(o => o.customer.id === id);
    
    return customerOrders;
  }
};

// Мок API для аналитики
export const mockAnalyticsAPI = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    await delay(800);
    
    return {
      revenue: {
        total: 321500,
        change: {
          value: 13500,
          percentage: 4.2,
          direction: 'up'
        }
      },
      activeOrders: {
        count: 24,
        change: {
          value: 3,
          percentage: 12.5,
          direction: 'up'
        }
      },
      customers: {
        total: 487,
        change: {
          value: 12,
          percentage: 2.5,
          direction: 'up'
        }
      },
      products: {
        available: 134,
        change: {
          value: 3,
          percentage: 2.2,
          direction: 'down'
        }
      }
    };
  },
  
  getRevenueData: async (period: string): Promise<RevenueData> => {
    await delay(700);
    
    // Мок-данные для разных периодов
    let labels: string[];
    let data: number[];
    
    switch (period) {
      case 'week':
        labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        data = [12500, 10800, 15200, 9700, 18300, 22100, 17800];
        break;
      case 'month':
        labels = ['Неделя 1', 'Неделя 2', 'Неделя 3', 'Неделя 4'];
        data = [45000, 52000, 49000, 58000];
        break;
      case 'quarter':
        labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
        data = [45000, 52000, 49000, 58000, 63000, 47000];
        break;
      case 'year':
        labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        data = [45000, 52000, 49000, 58000, 63000, 47000, 59000, 61000, 55000, 52000, 68000, 73000];
        break;
      default:
        labels = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'];
        data = [45000, 52000, 49000, 58000, 63000, 47000];
    }
    
    return {
      labels,
      datasets: [{
        label: 'Выручка',
        data
      }]
    };
  },
  
  getCategoryDistribution: async (): Promise<CategoryDistribution[]> => {
    await delay(600);
    
    return [
      { name: 'Электроинструмент', value: 45 },
      { name: 'Строительное оборудование', value: 25 },
      { name: 'Лестницы и стремянки', value: 15 },
      { name: 'Генераторы', value: 10 },
      { name: 'Прочее', value: 5 }
    ];
  }
};

// Мок API для настроек
export const mockSettingsAPI = {
  getGeneralSettings: async (): Promise<GeneralSettings> => {
    await delay(500);
    
    return {
      storeName: 'ИнструментПрокат',
      description: 'Профессиональный инструмент в аренду по доступным ценам.',
      contactEmail: 'info@instrumentprokat.ru',
      contactPhone: '+7 (495) 123-45-67',
      address: 'г. Москва, ул. Строителей, 15'
    };
  },
  
  updateGeneralSettings: async (settings: GeneralSettings): Promise<GeneralSettings> => {
    await delay(700);
    return settings;
  },
  
  getDeliverySettings: async (): Promise<DeliverySettings> => {
    await delay(500);
    
    return {
      cityDeliveryPrice: 300,
      outsideCityDeliveryPrice: 500,
      freeDeliveryThreshold: 5000
    };
  },
  
  updateDeliverySettings: async (settings: DeliverySettings): Promise<DeliverySettings> => {
    await delay(700);
    return settings;
  },
  
  getPaymentSettings: async (): Promise<PaymentSettings> => {
    await delay(500);
    
    return {
      allowCardPayment: true,
      allowCashPayment: true,
      allowSbpPayment: true,
      allowInvoicePayment: true,
      merchantId: 'merchant_12345678',
      apiKey: 'sk_test_12345678'
    };
  },
  
  updatePaymentSettings: async (settings: PaymentSettings): Promise<PaymentSettings> => {
    await delay(700);
    return settings;
  },
  
  getNotificationSettings: async (): Promise<NotificationSettings> => {
    await delay(500);
    
    return {
      email: {
        newOrder: true,
        orderStatusChange: true,
        delivery: true,
        promotions: false,
        senderEmail: 'noreply@instrumentprokat.ru',
        senderName: 'ИнструментПрокат'
      },
      sms: {
        newOrder: true,
        delivery: true,
        promotions: false,
        apiUrl: 'https://api.sms-provider.com/send',
        apiKey: 'sms_api_12345678'
      }
    };
  },
  
  updateNotificationSettings: async (settings: NotificationSettings): Promise<NotificationSettings> => {
    await delay(700);
    return settings;
  }
};

// Мок API для уведомлений
export const mockNotificationsAPI = {
  getAll: async (params?: any): Promise<NotificationsResponse> => {
    await delay(600);
    
    let filteredNotifications = [...mockNotifications];
    
    // Фильтрация по прочитанным/непрочитанным
    if (params?.read !== undefined) {
      filteredNotifications = filteredNotifications.filter(n => n.read === params.read);
    }
    
    const paginatedResult = paginate<Notification>(filteredNotifications, params?.page, params?.limit);
    
    return {
      ...paginatedResult,
      unreadCount: mockNotifications.filter(n => !n.read).length
    };
  },
  
  markAsRead: async (id: number): Promise<{ success: boolean }> => {
    await delay(300);
    
    const notification = mockNotifications.find(n => n.id === id);
    if (!notification) {
      throw new Error('Уведомление не найдено');
    }
    
    // В реальном API здесь было бы обновление статуса уведомления
    notification.read = true;
    
    return { success: true };
  },
  
  markAllAsRead: async (): Promise<{ success: boolean }> => {
    await delay(500);
    
    // В реальном API здесь было бы обновление статуса всех уведомлений
    mockNotifications.forEach(n => n.read = true);
    
    return { success: true };
  }
};
