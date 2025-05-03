
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
  LoginCredentials,
  Service,
  ServicesResponse,
  Employee,
  EmployeesResponse,
  ServiceCategory,
  ServiceCategoriesResponse,
  Booking,
  BookingsResponse,
  BookingStatus,
  PaymentStatus,
  AvailableTimeSlotsResponse,
  BookingStatistics,
  TimeSlot
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
  const types = ['order', 'product', 'customer', 'system', 'booking'];
  const titles = [
    'Новый заказ',
    'Отмена заказа',
    'Товар заканчивается на складе',
    'Оплата получена',
    'Новый клиент зарегистрирован',
    'Система обновлена',
    'Необходимо продление лицензии',
    'Новое бронирование',
    'Отмена бронирования'
  ];
  
  return Array.from({ length: 15 }, (_, i) => {
    const typeIndex = Math.floor(Math.random() * types.length);
    const type = types[typeIndex] as 'order' | 'product' | 'customer' | 'system' | 'booking';
    
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
      case 'booking':
        title = 'Новое бронирование';
        description = `Создано новое бронирование #${2000 + Math.floor(Math.random() * 1000)} от клиента ${mockCustomers[Math.floor(Math.random() * mockCustomers.length)].name}`;
        link = `/admin?tab=bookings&id=${Math.floor(Math.random() * 100)}`;
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

// Генерация услуг для бронирования
const generateMockServices = (): Service[] => {
  const serviceCategories = ['Консультация', 'Ремонт', 'Обслуживание', 'Монтаж', 'Доставка'];
  
  return [
    {
      id: 1,
      name: 'Консультация по выбору инструмента',
      description: 'Профессиональная консультация по выбору инструмента под ваши задачи',
      price: 500,
      duration: 30,
      category: 'Консультация',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
      createdAt: '2025-01-01T10:00:00Z',
      updatedAt: '2025-01-01T10:00:00Z'
    },
    {
      id: 2,
      name: 'Обучение работе с инструментом',
      description: 'Индивидуальное обучение правильному и безопасному использованию инструмента',
      price: 1200,
      duration: 60,
      category: 'Консультация',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800',
      createdAt: '2025-01-02T10:00:00Z',
      updatedAt: '2025-01-02T10:00:00Z'
    },
    {
      id: 3,
      name: 'Диагностика инструмента',
      description: 'Профессиональная диагностика состояния и работоспособности инструмента',
      price: 800,
      duration: 45,
      category: 'Обслуживание',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800',
      createdAt: '2025-01-03T10:00:00Z',
      updatedAt: '2025-01-03T10:00:00Z'
    },
    {
      id: 4,
      name: 'Заточка режущего инструмента',
      description: 'Профессиональная заточка сверл, долот, стамесок и других режущих инструментов',
      price: 600,
      duration: 30,
      category: 'Обслуживание',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800',
      createdAt: '2025-01-04T10:00:00Z',
      updatedAt: '2025-01-04T10:00:00Z'
    },
    {
      id: 5,
      name: 'Доставка и монтаж оборудования',
      description: 'Доставка арендованного оборудования и его профессиональный монтаж на объекте',
      price: 1500,
      duration: 120,
      category: 'Монтаж',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800',
      createdAt: '2025-01-05T10:00:00Z',
      updatedAt: '2025-01-05T10:00:00Z'
    },
    {
      id: 6,
      name: 'Ремонт электроинструмента',
      description: 'Диагностика и ремонт электроинструмента любой сложности',
      price: 2000,
      duration: 90,
      category: 'Ремонт',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1581092335397-9fa73e7d634d?w=800',
      createdAt: '2025-01-06T10:00:00Z',
      updatedAt: '2025-01-06T10:00:00Z'
    },
    {
      id: 7,
      name: 'Экспресс-доставка инструмента',
      description: 'Срочная доставка арендованного инструмента на объект в течение 2 часов',
      price: 800,
      duration: 120,
      category: 'Доставка',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800',
      createdAt: '2025-01-07T10:00:00Z',
      updatedAt: '2025-01-07T10:00:00Z'
    },
    {
      id: 8,
      name: 'Обслуживание генераторов',
      description: 'Техническое обслуживание бензиновых и дизельных генераторов',
      price: 1800,
      duration: 120,
      category: 'Обслуживание',
      isActive: true,
      image: 'https://images.unsplash.com/photo-1542013936693-884638332954?w=800',
      createdAt: '2025-01-08T10:00:00Z',
      updatedAt: '2025-01-08T10:00:00Z'
    }
  ];
};

const mockServices = generateMockServices();

// Генерация категорий услуг
const generateServiceCategories = (): ServiceCategory[] => {
  return [
    { id: 1, name: 'Консультация', description: 'Консультации по выбору и использованию инструмента', count: 2 },
    { id: 2, name: 'Обслуживание', description: 'Обслуживание и профилактика инструмента', count: 3 },
    { id: 3, name: 'Ремонт', description: 'Ремонт инструмента любой сложности', count: 1 },
    { id: 4, name: 'Монтаж', description: 'Монтаж и установка оборудования', count: 1 },
    { id: 5, name: 'Доставка', description: 'Услуги по доставке инструмента', count: 1 }
  ];
};

const mockServiceCategories = generateServiceCategories();

// Генерация сотрудников
const generateMockEmployees = (): Employee[] => {
  return [
    {
      id: 1,
      name: 'Иванов Сергей',
      email: 'ivanov@example.com',
      phone: '+7 (905) 123-45-67',
      position: 'Старший мастер',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200',
      specializations: ['Электроинструмент', 'Генераторы'],
      isActive: true,
      schedule: {
        monday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        tuesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        wednesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        thursday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        friday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        saturday: { isWorkDay: false },
        sunday: { isWorkDay: false }
      }
    },
    {
      id: 2,
      name: 'Петрова Анна',
      email: 'petrova@example.com',
      phone: '+7 (916) 234-56-78',
      position: 'Консультант',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=200',
      specializations: ['Консультации', 'Подбор инструмента'],
      isActive: true,
      schedule: {
        monday: { isWorkDay: true, startTime: '10:00', endTime: '19:00', breaks: [{ start: '14:00', end: '15:00' }] },
        tuesday: { isWorkDay: true, startTime: '10:00', endTime: '19:00', breaks: [{ start: '14:00', end: '15:00' }] },
        wednesday: { isWorkDay: true, startTime: '10:00', endTime: '19:00', breaks: [{ start: '14:00', end: '15:00' }] },
        thursday: { isWorkDay: true, startTime: '10:00', endTime: '19:00', breaks: [{ start: '14:00', end: '15:00' }] },
        friday: { isWorkDay: true, startTime: '10:00', endTime: '19:00', breaks: [{ start: '14:00', end: '15:00' }] },
        saturday: { isWorkDay: true, startTime: '10:00', endTime: '16:00' },
        sunday: { isWorkDay: false }
      }
    },
    {
      id: 3,
      name: 'Сидоров Алексей',
      email: 'sidorov@example.com',
      phone: '+7 (925) 345-67-89',
      position: 'Механик',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      specializations: ['Ремонт', 'Обслуживание'],
      isActive: true,
      schedule: {
        monday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        tuesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        wednesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        thursday: { isWorkDay: false },
        friday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
        saturday: { isWorkDay: true, startTime: '09:00', endTime: '15:00' },
        sunday: { isWorkDay: false }
      }
    },
    {
      id: 4,
      name: 'Козлов Дмитрий',
      email: 'kozlov@example.com',
      phone: '+7 (903) 456-78-90',
      position: 'Мастер по монтажу',
      avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200',
      specializations: ['Монтаж', 'Установка'],
      isActive: true,
      schedule: {
        monday: { isWorkDay: true, startTime: '08:00', endTime: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
        tuesday: { isWorkDay: true, startTime: '08:00', endTime: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
        wednesday: { isWorkDay: true, startTime: '08:00', endTime: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
        thursday: { isWorkDay: true, startTime: '08:00', endTime: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
        friday: { isWorkDay: true, startTime: '08:00', endTime: '17:00', breaks: [{ start: '12:00', end: '13:00' }] },
        saturday: { isWorkDay: false },
        sunday: { isWorkDay: false }
      }
    }
  ];
};

const mockEmployees = generateMockEmployees();

// Генерация бронирований
const generateMockBookings = (): Booking[] => {
  const statuses: BookingStatus[] = ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'];
  const paymentStatuses: PaymentStatus[] = ['pending', 'paid', 'refunded', 'cancelled'];
  const paymentMethods = ['card', 'cash', 'sbp', 'invoice'];
  
  return Array.from({ length: 20 }, (_, i) => {
    // Генерация даты за последние 30 дней или будущие 30 дней
    const isHistory = Math.random() > 0.5;
    const date = new Date();
    if (isHistory) {
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    } else {
      date.setDate(date.getDate() + Math.floor(Math.random() * 30));
    }
    
    // Устанавливаем время
    const hours = 9 + Math.floor(Math.random() * 8); // от 9 до 17
    date.setHours(hours, 0, 0, 0);
    
    // Выбираем случайную услугу
    const service = mockServices[Math.floor(Math.random() * mockServices.length)];
    
    // Выбираем случайного сотрудника
    const employee = mockEmployees[Math.floor(Math.random() * mockEmployees.length)];
    
    // Выбираем случайного клиента
    const customer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
    
    // Определяем статус бронирования
    let status: BookingStatus;
    let paymentStatus: PaymentStatus;
    
    if (isHistory) {
      status = Math.random() > 0.3 ? 'completed' : (Math.random() > 0.5 ? 'cancelled' : 'no_show');
      paymentStatus = status === 'completed' ? 'paid' : (status === 'cancelled' ? 'refunded' : 'cancelled');
    } else {
      status = Math.random() > 0.7 ? 'confirmed' : 'pending';
      paymentStatus = Math.random() > 0.5 ? 'paid' : 'pending';
    }
    
    // Рассчитываем время окончания услуги
    const endDate = new Date(date);
    endDate.setMinutes(date.getMinutes() + service.duration);
    
    return {
      id: i + 1,
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone
      },
      service: {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration
      },
      employee: {
        id: employee.id,
        name: employee.name
      },
      startTime: date.toISOString(),
      endTime: endDate.toISOString(),
      status,
      notes: Math.random() > 0.7 ? 'Дополнительные пожелания клиента' : undefined,
      paymentStatus,
      paymentMethod: paymentStatus === 'paid' ? paymentMethods[Math.floor(Math.random() * paymentMethods.length)] as any : undefined,
      createdAt: new Date(date.getTime() - 86400000 * Math.floor(Math.random() * 5)).toISOString(),
      updatedAt: new Date(date.getTime() - 86400000 * Math.floor(Math.random() * 2)).toISOString()
    };
  });
};

const mockBookings = generateMockBookings();

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
      },
      bookings: {
        count: 45,
        change: {
          value: 8,
          percentage: 21.6,
          direction: 'up'
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

// Мок API для бронирования услуг
export const mockBookingAPI = {
  // API для работы с услугами
  services: {
    getAll: async (params?: any): Promise<ServicesResponse> => {
      await delay(800);
      
      let filteredServices = [...mockServices];
      
      // Применяем фильтрацию по поиску
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredServices = filteredServices.filter(s => 
          s.name.toLowerCase().includes(searchLower) || 
          s.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Применяем фильтрацию по категории
      if (params?.category && params.category !== 'all') {
        filteredServices = filteredServices.filter(s => 
          s.category.toLowerCase() === params.category.toLowerCase()
        );
      }
      
      // Применяем фильтрацию по статусу активности
      if (params?.isActive !== undefined) {
        filteredServices = filteredServices.filter(s => s.isActive === params.isActive);
      }
      
      return paginate<Service>(filteredServices, params?.page, params?.limit);
    },
    
    getById: async (id: number): Promise<Service> => {
      await delay(500);
      
      const service = mockServices.find(s => s.id === id);
      if (!service) {
        throw new Error('Услуга не найдена');
      }
      
      return service;
    },
    
    create: async (serviceData: any): Promise<Service> => {
      await delay(1000);
      
      // Имитация создания услуги
      const newService: Service = {
        id: mockServices.length + 1,
        name: serviceData.name || 'Новая услуга',
        description: serviceData.description || 'Описание услуги',
        price: Number(serviceData.price) || 500,
        duration: Number(serviceData.duration) || 60,
        category: serviceData.category || 'Консультация',
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : true,
        image: serviceData.image || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newService;
    },
    
    update: async (id: number, serviceData: any): Promise<Service> => {
      await delay(1000);
      
      const service = mockServices.find(s => s.id === id);
      if (!service) {
        throw new Error('Услуга не найдена');
      }
      
      // Имитация обновления услуги
      const updatedService: Service = {
        ...service,
        name: serviceData.name !== undefined ? serviceData.name : service.name,
        description: serviceData.description !== undefined ? serviceData.description : service.description,
        price: serviceData.price !== undefined ? Number(serviceData.price) : service.price,
        duration: serviceData.duration !== undefined ? Number(serviceData.duration) : service.duration,
        category: serviceData.category !== undefined ? serviceData.category : service.category,
        isActive: serviceData.isActive !== undefined ? serviceData.isActive : service.isActive,
        image: serviceData.image !== undefined ? serviceData.image : service.image,
        updatedAt: new Date().toISOString()
      };
      
      return updatedService;
    },
    
    delete: async (id: number): Promise<{ success: boolean }> => {
      await delay(800);
      
      const serviceIndex = mockServices.findIndex(s => s.id === id);
      if (serviceIndex === -1) {
        throw new Error('Услуга не найдена');
      }
      
      return { success: true };
    },
    
    getCategories: async (): Promise<ServiceCategoriesResponse> => {
      await delay(500);
      
      return {
        data: mockServiceCategories,
        pagination: {
          page: 1,
          limit: 10,
          total: mockServiceCategories.length,
          totalPages: 1
        }
      };
    }
  },
  
  // API для работы с сотрудниками
  employees: {
    getAll: async (params?: any): Promise<EmployeesResponse> => {
      await delay(800);
      
      let filteredEmployees = [...mockEmployees];
      
      // Применяем фильтрацию по поиску
      if (params?.search) {
        const searchLower = params.search.toLowerCase();
        filteredEmployees = filteredEmployees.filter(e => 
          e.name.toLowerCase().includes(searchLower) || 
          e.email.toLowerCase().includes(searchLower) ||
          e.phone.includes(params.search)
        );
      }
      
      // Применяем фильтрацию по статусу активности
      if (params?.isActive !== undefined) {
        filteredEmployees = filteredEmployees.filter(e => e.isActive === params.isActive);
      }
      
      return paginate<Employee>(filteredEmployees, params?.page, params?.limit);
    },
    
    getById: async (id: number): Promise<Employee> => {
      await delay(500);
      
      const employee = mockEmployees.find(e => e.id === id);
      if (!employee) {
        throw new Error('Сотрудник не найден');
      }
      
      return employee;
    },
    
    create: async (employeeData: any): Promise<Employee> => {
      await delay(1000);
      
      // Имитация создания сотрудника
      const newEmployee: Employee = {
        id: mockEmployees.length + 1,
        name: employeeData.name || 'Новый сотрудник',
        email: employeeData.email || 'new@example.com',
        phone: employeeData.phone || '+7 (999) 123-45-67',
        position: employeeData.position || 'Специалист',
        avatar: employeeData.avatar || undefined,
        specializations: employeeData.specializations || [],
        isActive: employeeData.isActive !== undefined ? employeeData.isActive : true,
        schedule: employeeData.schedule || {
          monday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
          tuesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
          wednesday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
          thursday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
          friday: { isWorkDay: true, startTime: '09:00', endTime: '18:00', breaks: [{ start: '13:00', end: '14:00' }] },
          saturday: { isWorkDay: false },
          sunday: { isWorkDay: false }
        }
      };
      
      return newEmployee;
    },
    
    update: async (id: number, employeeData: any): Promise<Employee> => {
      await delay(1000);
      
      const employee = mockEmployees.find(e => e.id === id);
      if (!employee) {
        throw new Error('Сотрудник не найден');
      }
      
      // Имитация обновления сотрудника
      const updatedEmployee: Employee = {
        ...employee,
        name: employeeData.name !== undefined ? employeeData.name : employee.name,
        email: employeeData.email !== undefined ? employeeData.email : employee.email,
        phone: employeeData.phone !== undefined ? employeeData.phone : employee.phone,
        position: employeeData.position !== undefined ? employeeData.position : employee.position,
        avatar: employeeData.avatar !== undefined ? employeeData.avatar : employee.avatar,
        specializations: employeeData.specializations !== undefined ? employeeData.specializations : employee.specializations,
        isActive: employeeData.isActive !== undefined ? employeeData.isActive : employee.isActive,
        schedule: employeeData.schedule !== undefined ? employeeData.schedule : employee.schedule
      };
      
      return updatedEmployee;
    },
    
    delete: async (id: number): Promise<{ success: boolean }> => {
      await delay(800);
      
      const employeeIndex = mockEmployees.findIndex(e => e.id === id);
      if (employeeIndex === -1) {
        throw new Error('Сотрудник не найден');
      }
      
      return { success: true };
    }
  },
  
  // API для работы с бронированиями
  bookings: {
    getAll: async (params?: any): Promise<BookingsResponse> => {
      await delay(800);
      
      let filteredBookings = [...mockBookings];
      
      // Применяем фильтрацию по статусу
      if (params?.status && params.status !== 'all') {
        filteredBookings = filteredBookings.filter(b => b.status === params.status);
      }
      
      // Применяем фильтрацию по дате
      if (params?.dateFrom) {
        const dateFrom = new Date(params.dateFrom);
        filteredBookings = filteredBookings.filter(b => new Date(b.startTime) >= dateFrom);
      }
      
      if (params?.dateTo) {
        const dateTo = new Date(params.dateTo);
        dateTo.setHours(23, 59, 59);
        filteredBookings = filteredBookings.filter(b => new Date(b.startTime) <= dateTo);
      }
      
      // Применяем фильтрацию по сотруднику
      if (params?.employeeId) {
        filteredBookings = filteredBookings.filter(b => b.employee.id === Number(params.employeeId));
      }
      
      // Применяем фильтрацию по услуге
      if (params?.serviceId) {
        filteredBookings = filteredBookings.filter(b => b.service.id === Number(params.serviceId));
      }
      
      // Применяем фильтрацию по клиенту
      if (params?.customerId) {
        filteredBookings = filteredBookings.filter(b => b.customer.id === Number(params.customerId));
      }
      
      // Сортировка по дате (новые сначала)
      filteredBookings.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
      
      return paginate<Booking>(filteredBookings, params?.page, params?.limit);
    },
    
    getById: async (id: number): Promise<Booking> => {
      await delay(500);
      
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) {
        throw new Error('Бронирование не найдено');
      }
      
      return booking;
    },
    
    create: async (bookingData: any): Promise<Booking> => {
      await delay(1000);
      
      // Находим сервис и сотрудника
      const service = mockServices.find(s => s.id === bookingData.serviceId);
      const employee = mockEmployees.find(e => e.id === bookingData.employeeId);
      const customer = mockCustomers.find(c => c.id === bookingData.customerId) || 
                      { id: 1, name: 'Новый клиент', email: 'new@example.com', phone: '+7 (999) 123-45-67' };
      
      if (!service) {
        throw new Error('Услуга не найдена');
      }
      
      if (!employee) {
        throw new Error('Сотрудник не найден');
      }
      
      // Рассчитываем время окончания услуги
      const startTime = new Date(bookingData.startTime);
      const endTime = new Date(startTime.getTime() + service.duration * 60000);
      
      // Имитация создания бронирования
      const newBooking: Booking = {
        id: mockBookings.length + 1,
        customer: {
          id: customer.id,
          name: bookingData.customerName || customer.name,
          email: bookingData.customerEmail || customer.email,
          phone: bookingData.customerPhone || customer.phone
        },
        service: {
          id: service.id,
          name: service.name,
          price: service.price,
          duration: service.duration
        },
        employee: {
          id: employee.id,
          name: employee.name
        },
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'pending',
        notes: bookingData.notes,
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newBooking;
    },
    
    updateStatus: async (id: number, status: string): Promise<Booking> => {
      await delay(800);
      
      const booking = mockBookings.find(b => b.id === id);
      if (!booking) {
        throw new Error('Бронирование не найдено');
      }
      
      // Имитация обновления статуса
      const updatedBooking = {
        ...booking,
        status: status as BookingStatus,
        updatedAt: new Date().toISOString()
      };
      
      return updatedBooking;
    },
    
    delete: async (id: number): Promise<{ success: boolean }> => {
      await delay(800);
      
      const bookingIndex = mockBookings.findIndex(b => b.id === id);
      if (bookingIndex === -1) {
        throw new Error('Бронирование не найдено');
      }
      
      return { success: true };
    },
    
    getStatistics: async (): Promise<BookingStatistics> => {
      await delay(800);
      
      // Рассчитываем статистику
      const totalBookings = mockBookings.length;
      const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
      const cancelledBookings = mockBookings.filter(b => b.status === 'cancelled').length;
      const pendingBookings = mockBookings.filter(b => b.status === 'pending' || b.status === 'confirmed').length;
      
      // Рассчитываем выручку от услуг
      const revenue = mockBookings
        .filter(b => b.status === 'completed' && b.paymentStatus === 'paid')
        .reduce((sum, b) => sum + b.service.price, 0);
      
      // Определяем самую популярную услугу
      const serviceCountMap = new Map<number, { id: number, name: string, count: number }>();
      mockBookings.forEach(b => {
        if (!serviceCountMap.has(b.service.id)) {
          serviceCountMap.set(b.service.id, { id: b.service.id, name: b.service.name, count: 0 });
        }
        serviceCountMap.get(b.service.id)!.count++;
      });
      
      const mostPopularService = Array.from(serviceCountMap.values()).sort((a, b) => b.count - a.count)[0];
      
      // Определяем самого активного сотрудника
      const employeeCountMap = new Map<number, { id: number, name: string, count: number }>();
      mockBookings.forEach(b => {
        if (!employeeCountMap.has(b.employee.id)) {
          employeeCountMap.set(b.employee.id, { id: b.employee.id, name: b.employee.name, count: 0 });
        }
        employeeCountMap.get(b.employee.id)!.count++;
      });
      
      const mostActiveEmployee = Array.from(employeeCountMap.values()).sort((a, b) => b.count - a.count)[0];
      
      return {
        total: totalBookings,
        completed: completedBookings,
        cancelled: cancelledBookings,
        pending: pendingBookings,
        revenue,
        mostPopularService: {
          id: mostPopularService.id,
          name: mostPopularService.name,
          bookingsCount: mostPopularService.count
        },
        mostActiveEmployee: {
          id: mostActiveEmployee.id,
          name: mostActiveEmployee.name,
          bookingsCount: mostActiveEmployee.count
        }
      };
    }
  },
  
  // API для работы с доступными временными слотами
  timeSlots: {
    getAvailable: async (params: {
      date: string;
      serviceId: number;
      employeeId?: number;
    }): Promise<AvailableTimeSlotsResponse> => {
      await delay(700);
      
      const service = mockServices.find(s => s.id === params.serviceId);
      if (!service) {
        throw new Error('Услуга не найдена');
      }
      
      // Берем сотрудника из параметров или первого подходящего
      let employee;
      if (params.employeeId) {
        employee = mockEmployees.find(e => e.id === params.employeeId);
        if (!employee) {
          throw new Error('Сотрудник не найден');
        }
      } else {
        // Первый активный сотрудник
        employee = mockEmployees.find(e => e.isActive);
      }
      
      // Дата из параметров
      const date = new Date(params.date);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'lowercase' });
      
      // Проверяем, рабочий ли это день для сотрудника
      const schedule = employee!.schedule![dayOfWeek as keyof typeof employee.schedule];
      if (!schedule || !schedule.isWorkDay) {
        return {
          date: params.date,
          serviceId: params.serviceId,
          slots: []
        };
      }
      
      // Получаем текущие бронирования на эту дату для этого сотрудника
      const bookingsOnDate = mockBookings.filter(b => {
        const bookingDate = new Date(b.startTime);
        return bookingDate.toDateString() === date.toDateString() && 
               b.employee.id === employee!.id &&
               (b.status === 'pending' || b.status === 'confirmed');
      });
      
      // Генерируем временные слоты
      const startTime = schedule.startTime!.split(':');
      const endTime = schedule.endTime!.split(':');
      const startHour = parseInt(startTime[0]);
      const startMinute = parseInt(startTime[1]);
      const endHour = parseInt(endTime[0]);
      const endMinute = parseInt(endTime[1]);
      
      const slots: TimeSlot[] = [];
      let slotTime = new Date(date);
      slotTime.setHours(startHour, startMinute, 0, 0);
      
      const slotEndTime = new Date(date);
      slotEndTime.setHours(endHour, endMinute, 0, 0);
      
      // Шаг для временных слотов (в минутах)
      const slotStep = 30;
      
      // Проходим по всем возможным слотам
      while (slotTime.getTime() + service.duration * 60000 <= slotEndTime.getTime()) {
        const slotEnd = new Date(slotTime.getTime() + service.duration * 60000);
        
        // Проверяем, не пересекается ли слот с перерывами
        let isBreakTime = false;
        schedule.breaks?.forEach(breakTime => {
          const breakStart = new Date(date);
          const breakStartTime = breakTime.start.split(':');
          breakStart.setHours(parseInt(breakStartTime[0]), parseInt(breakStartTime[1]), 0, 0);
          
          const breakEnd = new Date(date);
          const breakEndTime = breakTime.end.split(':');
          breakEnd.setHours(parseInt(breakEndTime[0]), parseInt(breakEndTime[1]), 0, 0);
          
          // Если слот пересекается с перерывом
          if (
            (slotTime.getTime() >= breakStart.getTime() && slotTime.getTime() < breakEnd.getTime()) ||
            (slotEnd.getTime() > breakStart.getTime() && slotEnd.getTime() <= breakEnd.getTime()) ||
            (slotTime.getTime() <= breakStart.getTime() && slotEnd.getTime() >= breakEnd.getTime())
          ) {
            isBreakTime = true;
          }
        });
        
        // Проверяем, не пересекается ли слот с существующими бронированиями
        let isBooked = false;
        bookingsOnDate.forEach(booking => {
          const bookingStart = new Date(booking.startTime);
          const bookingEnd = new Date(booking.endTime);
          
          // Если слот пересекается с бронированием
          if (
            (slotTime.getTime() >= bookingStart.getTime() && slotTime.getTime() < bookingEnd.getTime()) ||
            (slotEnd.getTime() > bookingStart.getTime() && slotEnd.getTime() <= bookingEnd.getTime()) ||
            (slotTime.getTime() <= bookingStart.getTime() && slotEnd.getTime() >= bookingEnd.getTime())
          ) {
            isBooked = true;
          }
        });
        
        // Если слот подходит, добавляем его
        if (!isBreakTime && !isBooked) {
          slots.push({
            id: `${slotTime.toISOString()}-${slotEnd.toISOString()}`,
            startTime: slotTime.toISOString(),
            endTime: slotEnd.toISOString(),
            isAvailable: true,
            employeeId: employee!.id
          });
        }
        
        // Переходим к следующему слоту
        slotTime = new Date(slotTime.getTime() + slotStep * 60000);
      }
      
      return {
        date: params.date,
        serviceId: params.serviceId,
        slots
      };
    }
  }
};
