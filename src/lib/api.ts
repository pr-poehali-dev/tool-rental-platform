
// API URL для всех запросов
const API_BASE_URL = 'https://api.instrumentprokat.ru/v1';

// Добавление токена авторизации
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Обработка ошибок
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => {
      return { message: 'Неизвестная ошибка сервера' };
    });
    
    // Если токен устарел, перенаправляем на страницу логина
    if (response.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminAuth');
      window.location.href = '/admin';
    }
    
    throw new Error(error.message || `Ошибка сервера: ${response.status}`);
  }
  
  return response.json();
};

// API для авторизации
export const authAPI = {
  login: async (credentials: { username: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminAuth', 'true');
    }
    return data;
  },
  
  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuth');
  },
  
  refreshToken: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    
    const data = await handleResponse(response);
    if (data.token) {
      localStorage.setItem('adminToken', data.token);
    }
    return data;
  }
};

// API для работы с товарами
export const productsAPI = {
  getAll: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string;
    category?: string;
    sort?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.category) queryParams.append('category', params.category);
      if (params.sort) queryParams.append('sort', params.sort);
    }
    
    const response = await fetch(`${API_BASE_URL}/products?${queryParams}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  create: async (productData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        // Не устанавливаем Content-Type, так как FormData автоматически
        // установит multipart/form-data с правильной boundary
      },
      body: productData
    });
    
    return handleResponse(response);
  },
  
  update: async (id: number, productData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        // Не устанавливаем Content-Type для FormData
      },
      body: productData
    });
    
    return handleResponse(response);
  },
  
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getCategories: async () => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

// API для работы с заказами
export const ordersAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    customerId?: number;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.status) queryParams.append('status', params.status);
      if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
      if (params.dateTo) queryParams.append('dateTo', params.dateTo);
      if (params.customerId) queryParams.append('customerId', params.customerId.toString());
    }
    
    const response = await fetch(`${API_BASE_URL}/orders?${queryParams}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  updateStatus: async (id: number, status: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    return handleResponse(response);
  },
  
  addComment: async (id: number, comment: string) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ comment })
    });
    
    return handleResponse(response);
  },
  
  getStatistics: async (period: 'day' | 'week' | 'month' | 'year') => {
    const response = await fetch(`${API_BASE_URL}/orders/statistics?period=${period}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

// API для работы с клиентами
export const customersAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    sort?: string;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.sort) queryParams.append('sort', params.sort);
    }
    
    const response = await fetch(`${API_BASE_URL}/customers?${queryParams}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  create: async (customerData: any) => {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData)
    });
    
    return handleResponse(response);
  },
  
  update: async (id: number, customerData: any) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData)
    });
    
    return handleResponse(response);
  },
  
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getCustomerOrders: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}/orders`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  addNote: async (id: number, note: string) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note })
    });
    
    return handleResponse(response);
  }
};

// API для аналитики
export const analyticsAPI = {
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getRevenueData: async (period: 'week' | 'month' | 'quarter' | 'year') => {
    const response = await fetch(`${API_BASE_URL}/analytics/revenue?period=${period}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getPopularProducts: async (limit: number = 5) => {
    const response = await fetch(`${API_BASE_URL}/analytics/popular-products?limit=${limit}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getCustomerStats: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/customers`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  getCategoryDistribution: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/categories`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

// API для настроек
export const settingsAPI = {
  getGeneralSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/settings/general`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  updateGeneralSettings: async (settings: any) => {
    const response = await fetch(`${API_BASE_URL}/settings/general`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    
    return handleResponse(response);
  },
  
  getDeliverySettings: async () => {
    const response = await fetch(`${API_BASE_URL}/settings/delivery`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  updateDeliverySettings: async (settings: any) => {
    const response = await fetch(`${API_BASE_URL}/settings/delivery`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    
    return handleResponse(response);
  },
  
  getPaymentSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/settings/payment`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  updatePaymentSettings: async (settings: any) => {
    const response = await fetch(`${API_BASE_URL}/settings/payment`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    
    return handleResponse(response);
  },
  
  getNotificationSettings: async () => {
    const response = await fetch(`${API_BASE_URL}/settings/notifications`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  updateNotificationSettings: async (settings: any) => {
    const response = await fetch(`${API_BASE_URL}/settings/notifications`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings)
    });
    
    return handleResponse(response);
  }
};

// API для уведомлений
export const notificationsAPI = {
  getAll: async (params?: {
    page?: number;
    limit?: number;
    read?: boolean;
  }) => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.read !== undefined) queryParams.append('read', params.read.toString());
    }
    
    const response = await fetch(`${API_BASE_URL}/notifications?${queryParams}`, {
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  markAsRead: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  },
  
  markAllAsRead: async () => {
    const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    
    return handleResponse(response);
  }
};

// API для бронирования услуг
export const bookingAPI = {
  // API для работы с услугами
  services: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      category?: string;
      isActive?: boolean;
    }) => {
      const queryParams = new URLSearchParams();
      
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.category) queryParams.append('category', params.category);
        if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
      }
      
      const response = await fetch(`${API_BASE_URL}/booking/services?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    getById: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/services/${id}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    create: async (serviceData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(serviceData)
      });
      
      return handleResponse(response);
    },
    
    update: async (id: number, serviceData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(serviceData)
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    getCategories: async () => {
      const response = await fetch(`${API_BASE_URL}/booking/service-categories`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    createCategory: async (categoryData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/service-categories`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData)
      });
      
      return handleResponse(response);
    },
    
    updateCategory: async (id: number, categoryData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/service-categories/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(categoryData)
      });
      
      return handleResponse(response);
    },
    
    deleteCategory: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/service-categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    }
  },
  
  // API для работы с сотрудниками
  employees: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      search?: string;
      isActive?: boolean;
    }) => {
      const queryParams = new URLSearchParams();
      
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());
      }
      
      const response = await fetch(`${API_BASE_URL}/booking/employees?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    getById: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/employees/${id}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    create: async (employeeData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/employees`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
      });
      
      return handleResponse(response);
    },
    
    update: async (id: number, employeeData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/employees/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(employeeData)
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/employees/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    updateSchedule: async (id: number, scheduleData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/employees/${id}/schedule`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(scheduleData)
      });
      
      return handleResponse(response);
    }
  },
  
  // API для работы с бронированиями
  bookings: {
    getAll: async (params?: {
      page?: number;
      limit?: number;
      status?: string;
      dateFrom?: string;
      dateTo?: string;
      employeeId?: number;
      serviceId?: number;
      customerId?: number;
    }) => {
      const queryParams = new URLSearchParams();
      
      if (params) {
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.status) queryParams.append('status', params.status);
        if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
        if (params.dateTo) queryParams.append('dateTo', params.dateTo);
        if (params.employeeId) queryParams.append('employeeId', params.employeeId.toString());
        if (params.serviceId) queryParams.append('serviceId', params.serviceId.toString());
        if (params.customerId) queryParams.append('customerId', params.customerId.toString());
      }
      
      const response = await fetch(`${API_BASE_URL}/booking/bookings?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    getById: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    create: async (bookingData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      
      return handleResponse(response);
    },
    
    update: async (id: number, bookingData: any) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(bookingData)
      });
      
      return handleResponse(response);
    },
    
    updateStatus: async (id: number, status: string) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      
      return handleResponse(response);
    },
    
    updatePaymentStatus: async (id: number, paymentStatus: string) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}/payment-status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ paymentStatus })
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    },
    
    addNote: async (id: number, note: string) => {
      const response = await fetch(`${API_BASE_URL}/booking/bookings/${id}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ note })
      });
      
      return handleResponse(response);
    },
    
    getStatistics: async (params?: {
      dateFrom?: string;
      dateTo?: string;
      employeeId?: number;
      serviceId?: number;
    }) => {
      const queryParams = new URLSearchParams();
      
      if (params) {
        if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
        if (params.dateTo) queryParams.append('dateTo', params.dateTo);
        if (params.employeeId) queryParams.append('employeeId', params.employeeId.toString());
        if (params.serviceId) queryParams.append('serviceId', params.serviceId.toString());
      }
      
      const response = await fetch(`${API_BASE_URL}/booking/statistics?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    }
  },
  
  // API для работы с доступными временными слотами
  timeSlots: {
    getAvailable: async (params: {
      date: string;
      serviceId: number;
      employeeId?: number;
    }) => {
      const queryParams = new URLSearchParams();
      
      queryParams.append('date', params.date);
      queryParams.append('serviceId', params.serviceId.toString());
      if (params.employeeId) queryParams.append('employeeId', params.employeeId.toString());
      
      const response = await fetch(`${API_BASE_URL}/booking/time-slots/available?${queryParams}`, {
        headers: getAuthHeaders()
      });
      
      return handleResponse(response);
    }
  }
};
