
import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  CalendarDays,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApi } from "@/hooks/useApi";
import { mockBookingAPI } from "@/lib/mock-api";
import { 
  BookingsResponse, 
  Booking, 
  Service, 
  ServicesResponse, 
  EmployeesResponse, 
  Employee,
  AvailableTimeSlotsResponse,
  BookingStatus
} from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Pagination } from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const BookingsTab = () => {
  // Состояния для фильтрации и пагинации
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState<{
    dateFrom?: Date;
    dateTo?: Date;
  }>({});
  const [isNewBookingDialogOpen, setIsNewBookingDialogOpen] = useState(false);
  const [isViewBookingDialogOpen, setIsViewBookingDialogOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);
  
  // Состояния для создания нового бронирования
  const [newBooking, setNewBooking] = useState({
    serviceId: "",
    employeeId: "",
    bookingDate: new Date(),
    timeSlot: "",
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    notes: ""
  });
  const [availableTimeSlots, setAvailableTimeSlots] = useState<any[]>([]);

  // Загрузка списка бронирований
  const {
    data: bookingsData,
    isLoading: isLoadingBookings,
    error: bookingsError,
    execute: fetchBookings
  } = useApi<BookingsResponse>(
    (params) => mockBookingAPI.bookings.getAll(params),
    { loadOnMount: true, initialParams: { page: 1, limit: 10 } }
  );

  // Загрузка списка услуг
  const {
    data: servicesData,
    isLoading: isLoadingServices,
    error: servicesError,
    execute: fetchServices
  } = useApi<ServicesResponse>(
    () => mockBookingAPI.services.getAll({ isActive: true }),
    { loadOnMount: true }
  );

  // Загрузка списка сотрудников
  const {
    data: employeesData,
    isLoading: isLoadingEmployees,
    error: employeesError,
    execute: fetchEmployees
  } = useApi<EmployeesResponse>(
    () => mockBookingAPI.employees.getAll({ isActive: true }),
    { loadOnMount: true }
  );

  // API для получения доступных временных слотов
  const {
    data: timeSlotsData,
    isLoading: isLoadingTimeSlots,
    error: timeSlotsError,
    execute: fetchTimeSlots
  } = useApi<AvailableTimeSlotsResponse>(
    (params) => mockBookingAPI.timeSlots.getAvailable(params)
  );

  // API для создания бронирования
  const {
    isLoading: isCreatingBooking,
    error: createBookingError,
    execute: createBooking
  } = useApi<Booking>(
    (data) => mockBookingAPI.bookings.create(data),
    { successMessage: "Бронирование успешно создано" }
  );

  // API для обновления статуса бронирования
  const {
    isLoading: isUpdatingStatus,
    error: updateStatusError,
    execute: updateBookingStatus
  } = useApi<Booking>(
    (params) => mockBookingAPI.bookings.updateStatus(params.id, params.status),
    { successMessage: "Статус бронирования обновлен" }
  );

  // API для удаления бронирования
  const {
    isLoading: isDeletingBooking,
    error: deleteBookingError,
    execute: deleteBooking
  } = useApi<{ success: boolean }>(
    (id) => mockBookingAPI.bookings.delete(id),
    { successMessage: "Бронирование успешно удалено" }
  );

  // Преобразование временных слотов в удобный формат
  useEffect(() => {
    if (timeSlotsData) {
      const formattedSlots = timeSlotsData.slots.map(slot => ({
        id: slot.id,
        startTime: new Date(slot.startTime),
        endTime: new Date(slot.endTime),
        label: `${format(new Date(slot.startTime), 'HH:mm')} - ${format(new Date(slot.endTime), 'HH:mm')}`,
      }));
      setAvailableTimeSlots(formattedSlots);
    }
  }, [timeSlotsData]);

  // Обработка изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchBookings({
      page,
      limit: 10,
      status: selectedStatus !== "all" ? selectedStatus : undefined,
      dateFrom: selectedDateRange.dateFrom?.toISOString(),
      dateTo: selectedDateRange.dateTo?.toISOString()
    });
  };

  // Обработка поиска
  const handleSearch = () => {
    setCurrentPage(1);
    fetchBookings({
      page: 1,
      limit: 10,
      status: selectedStatus !== "all" ? selectedStatus : undefined,
      dateFrom: selectedDateRange.dateFrom?.toISOString(),
      dateTo: selectedDateRange.dateTo?.toISOString()
    });
  };

  // Обработка фильтрации по статусу
  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    fetchBookings({
      page: 1,
      limit: 10,
      status: status !== "all" ? status : undefined,
      dateFrom: selectedDateRange.dateFrom?.toISOString(),
      dateTo: selectedDateRange.dateTo?.toISOString()
    });
  };

  // Обработка выбора даты из календаря
  const handleDateRangeChange = (field: 'dateFrom' | 'dateTo', date?: Date) => {
    setSelectedDateRange(prev => ({
      ...prev,
      [field]: date
    }));
  };

  // Обработка применения фильтра даты
  const handleApplyDateFilter = () => {
    setCurrentPage(1);
    fetchBookings({
      page: 1,
      limit: 10,
      status: selectedStatus !== "all" ? selectedStatus : undefined,
      dateFrom: selectedDateRange.dateFrom?.toISOString(),
      dateTo: selectedDateRange.dateTo?.toISOString()
    });
  };

  // Обработка просмотра деталей бронирования
  const handleViewBooking = (booking: Booking) => {
    setCurrentBooking(booking);
    setIsViewBookingDialogOpen(true);
  };

  // Обработка изменения услуги при создании нового бронирования
  const handleServiceChange = (serviceId: string) => {
    setNewBooking(prev => ({ ...prev, serviceId }));
    
    // Сбрасываем выбранный временной слот
    setNewBooking(prev => ({ ...prev, timeSlot: "" }));
    
    // Если выбраны и услуга, и дата бронирования, загружаем доступные временные слоты
    if (serviceId && newBooking.bookingDate) {
      fetchTimeSlots({
        serviceId: parseInt(serviceId),
        date: format(newBooking.bookingDate, 'yyyy-MM-dd'),
        employeeId: newBooking.employeeId ? parseInt(newBooking.employeeId) : undefined
      });
    }
  };

  // Обработка изменения сотрудника при создании нового бронирования
  const handleEmployeeChange = (employeeId: string) => {
    setNewBooking(prev => ({ ...prev, employeeId }));
    
    // Сбрасываем выбранный временной слот
    setNewBooking(prev => ({ ...prev, timeSlot: "" }));
    
    // Если выбраны и услуга, и дата бронирования, загружаем доступные временные слоты
    if (newBooking.serviceId && newBooking.bookingDate) {
      fetchTimeSlots({
        serviceId: parseInt(newBooking.serviceId),
        date: format(newBooking.bookingDate, 'yyyy-MM-dd'),
        employeeId: employeeId ? parseInt(employeeId) : undefined
      });
    }
  };

  // Обработка выбора даты бронирования
  const handleBookingDateChange = (date: Date | undefined) => {
    if (date) {
      setNewBooking(prev => ({ ...prev, bookingDate: date }));
      
      // Сбрасываем выбранный временной слот
      setNewBooking(prev => ({ ...prev, timeSlot: "" }));
      
      // Если выбраны и услуга, и дата бронирования, загружаем доступные временные слоты
      if (newBooking.serviceId && date) {
        fetchTimeSlots({
          serviceId: parseInt(newBooking.serviceId),
          date: format(date, 'yyyy-MM-dd'),
          employeeId: newBooking.employeeId ? parseInt(newBooking.employeeId) : undefined
        });
      }
    }
  };

  // Обработка создания нового бронирования
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем обязательные поля
    if (!newBooking.serviceId || !newBooking.employeeId || !newBooking.timeSlot || 
        !newBooking.customerName || !newBooking.customerPhone) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    const selectedSlot = availableTimeSlots.find(slot => slot.id === newBooking.timeSlot);
    if (!selectedSlot) {
      alert("Пожалуйста, выберите доступное время");
      return;
    }
    
    const bookingData = {
      serviceId: parseInt(newBooking.serviceId),
      employeeId: parseInt(newBooking.employeeId),
      startTime: selectedSlot.startTime.toISOString(),
      customerName: newBooking.customerName,
      customerPhone: newBooking.customerPhone,
      customerEmail: newBooking.customerEmail,
      notes: newBooking.notes
    };
    
    const result = await createBooking(bookingData);
    
    if (result) {
      // Закрываем диалог и обновляем список бронирований
      setIsNewBookingDialogOpen(false);
      
      // Сбрасываем форму
      setNewBooking({
        serviceId: "",
        employeeId: "",
        bookingDate: new Date(),
        timeSlot: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        notes: ""
      });
      
      // Обновляем список бронирований
      fetchBookings({
        page: currentPage,
        limit: 10,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
        dateFrom: selectedDateRange.dateFrom?.toISOString(),
        dateTo: selectedDateRange.dateTo?.toISOString()
      });
    }
  };

  // Обработка обновления статуса бронирования
  const handleUpdateStatus = async (id: number, status: BookingStatus) => {
    const result = await updateBookingStatus({ id, status });
    
    if (result) {
      // Если это текущее открытое бронирование, обновляем его данные
      if (currentBooking && currentBooking.id === id) {
        setCurrentBooking({
          ...currentBooking,
          status
        });
      }
      
      // Обновляем список бронирований
      fetchBookings({
        page: currentPage,
        limit: 10,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
        dateFrom: selectedDateRange.dateFrom?.toISOString(),
        dateTo: selectedDateRange.dateTo?.toISOString()
      });
    }
  };

  // Обработка удаления бронирования
  const handleDeleteBooking = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить это бронирование?")) {
      const result = await deleteBooking(id);
      
      if (result && result.success) {
        // Если это текущее открытое бронирование, закрываем диалог
        if (currentBooking && currentBooking.id === id) {
          setIsViewBookingDialogOpen(false);
          setCurrentBooking(null);
        }
        
        // Обновляем список бронирований
        fetchBookings({
          page: currentPage,
          limit: 10,
          status: selectedStatus !== "all" ? selectedStatus : undefined,
          dateFrom: selectedDateRange.dateFrom?.toISOString(),
          dateTo: selectedDateRange.dateTo?.toISOString()
        });
      }
    }
  };

  // Получаем цвет бейджа статуса
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ожидает</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Подтверждено</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Выполнено</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Отменено</Badge>;
      case 'no_show':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Не явился</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  // Получаем название статуса
  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтверждено';
      case 'completed': return 'Выполнено';
      case 'cancelled': return 'Отменено';
      case 'no_show': return 'Не явился';
      default: return 'Неизвестно';
    }
  };

  // Рендеринг списка временных слотов
  const renderTimeSlots = () => {
    if (isLoadingTimeSlots) {
      return <div className="text-center py-4">Загрузка доступного времени...</div>;
    }
    
    if (timeSlotsError) {
      return <div className="text-center py-4 text-red-500">Ошибка загрузки доступного времени</div>;
    }
    
    if (!timeSlotsData || timeSlotsData.slots.length === 0) {
      return <div className="text-center py-4">Нет доступного времени на выбранную дату</div>;
    }
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {availableTimeSlots.map(slot => (
          <Button
            key={slot.id}
            type="button"
            variant={newBooking.timeSlot === slot.id ? "default" : "outline"}
            className="justify-center"
            onClick={() => setNewBooking(prev => ({ ...prev, timeSlot: slot.id }))}
          >
            {slot.label}
          </Button>
        ))}
      </div>
    );
  };

  // Получаем данные услуги
  const getServiceById = (id: number): Service | undefined => {
    return servicesData?.data.find(service => service.id === id);
  };

  // Получаем данные сотрудника
  const getEmployeeById = (id: number): Employee | undefined => {
    return employeesData?.data.find(employee => employee.id === id);
  };

  // Отображение состояния загрузки
  if (isLoadingBookings && !bookingsData) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <div className="ml-auto">
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Отображение ошибки
  if (bookingsError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Не удалось загрузить список бронирований. Пожалуйста, попробуйте позже или обновите страницу.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10" 
              placeholder="Поиск бронирований..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleSearch}
            >
              <Filter size={16} />
              <span>Поиск</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <span>Статус: {selectedStatus === "all" ? "Все" : getStatusText(selectedStatus as BookingStatus)}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Фильтр по статусу</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleStatusFilter("all")}>
                  Все статусы
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("pending")}>
                  Ожидает
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("confirmed")}>
                  Подтверждено
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("completed")}>
                  Выполнено
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("cancelled")}>
                  Отменено
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusFilter("no_show")}>
                  Не явился
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  <span>Выбрать даты</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Выберите диапазон дат</h3>
                </div>
                <div className="flex gap-2 p-3">
                  <div>
                    <Label>Начальная дата</Label>
                    <div className="mt-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            {selectedDateRange.dateFrom ? (
                              format(selectedDateRange.dateFrom, "dd.MM.yyyy")
                            ) : (
                              <span>Выберите дату</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDateRange.dateFrom}
                            onSelect={(date) => handleDateRangeChange('dateFrom', date)}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div>
                    <Label>Конечная дата</Label>
                    <div className="mt-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-[200px] justify-start text-left font-normal"
                          >
                            {selectedDateRange.dateTo ? (
                              format(selectedDateRange.dateTo, "dd.MM.yyyy")
                            ) : (
                              <span>Выберите дату</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDateRange.dateTo}
                            onSelect={(date) => handleDateRangeChange('dateTo', date)}
                            disabled={(date) => selectedDateRange.dateFrom ? date < selectedDateRange.dateFrom : false}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t flex justify-end">
                  <Button onClick={handleApplyDateFilter} size="sm">
                    Применить
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            
            <Dialog open={isNewBookingDialogOpen} onOpenChange={setIsNewBookingDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 whitespace-nowrap">
                  <Plus size={16} />
                  Новое бронирование
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Создание нового бронирования</DialogTitle>
                  <DialogDescription>
                    Заполните форму для создания нового бронирования услуги
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateBooking}>
                  <div className="grid gap-4 py-4">
                    <Tabs defaultValue="service" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="service">Услуга</TabsTrigger>
                        <TabsTrigger value="time">Время</TabsTrigger>
                        <TabsTrigger value="customer">Клиент</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="service">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="service">Услуга*</Label>
                            <Select 
                              value={newBooking.serviceId} 
                              onValueChange={handleServiceChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите услугу" />
                              </SelectTrigger>
                              <SelectContent>
                                {servicesData?.data.map(service => (
                                  <SelectItem key={service.id} value={service.id.toString()}>
                                    {service.name} - {service.price} ₽ ({service.duration} мин.)
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="employee">Сотрудник*</Label>
                            <Select 
                              value={newBooking.employeeId} 
                              onValueChange={handleEmployeeChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите сотрудника" />
                              </SelectTrigger>
                              <SelectContent>
                                {employeesData?.data.map(employee => (
                                  <SelectItem key={employee.id} value={employee.id.toString()}>
                                    {employee.name} - {employee.position}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="time">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label>Дата бронирования*</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <Calendar className="mr-2 h-4 w-4" />
                                  {newBooking.bookingDate ? (
                                    format(newBooking.bookingDate, "dd.MM.yyyy")
                                  ) : (
                                    <span>Выберите дату</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <CalendarComponent
                                  mode="single"
                                  selected={newBooking.bookingDate}
                                  onSelect={handleBookingDateChange}
                                  disabled={(date) => date < new Date()}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          
                          <div className="grid gap-2">
                            <Label>Время*</Label>
                            {newBooking.serviceId && newBooking.bookingDate ? (
                              renderTimeSlots()
                            ) : (
                              <div className="text-center py-4 text-gray-500">
                                Сначала выберите услугу и дату
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="customer">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="customerName">Имя клиента*</Label>
                            <Input 
                              id="customerName" 
                              value={newBooking.customerName} 
                              onChange={(e) => setNewBooking(prev => ({ ...prev, customerName: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="customerPhone">Телефон*</Label>
                            <Input 
                              id="customerPhone" 
                              value={newBooking.customerPhone} 
                              onChange={(e) => setNewBooking(prev => ({ ...prev, customerPhone: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="customerEmail">Email</Label>
                            <Input 
                              id="customerEmail" 
                              type="email" 
                              value={newBooking.customerEmail} 
                              onChange={(e) => setNewBooking(prev => ({ ...prev, customerEmail: e.target.value }))}
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="notes">Примечания</Label>
                            <Textarea 
                              id="notes" 
                              value={newBooking.notes} 
                              onChange={(e) => setNewBooking(prev => ({ ...prev, notes: e.target.value }))}
                              placeholder="Дополнительная информация"
                            />
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsNewBookingDialogOpen(false)}
                      disabled={isCreatingBooking}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" disabled={isCreatingBooking}>
                      {isCreatingBooking ? "Создание..." : "Создать бронирование"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Клиент</TableHead>
              <TableHead>Услуга</TableHead>
              <TableHead>Дата и время</TableHead>
              <TableHead>Сотрудник</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingsData?.data.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.customer.name}</p>
                    <p className="text-xs text-gray-500">{booking.customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{booking.service.name}</p>
                    <p className="text-xs text-gray-500">{booking.service.price} ₽</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p>{format(new Date(booking.startTime), "dd.MM.yyyy")}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(booking.startTime), "HH:mm")} - {format(new Date(booking.endTime), "HH:mm")}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{booking.employee.name}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewBooking(booking)}
                    >
                      <Eye size={16} />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Действия</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {booking.status === 'pending' && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                            disabled={isUpdatingStatus}
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                            Подтвердить
                          </DropdownMenuItem>
                        )}
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateStatus(booking.id, 'completed')}
                            disabled={isUpdatingStatus}
                          >
                            <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                            Отметить как выполненное
                          </DropdownMenuItem>
                        )}
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                            disabled={isUpdatingStatus}
                          >
                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                            Отменить
                          </DropdownMenuItem>
                        )}
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <DropdownMenuItem 
                            onClick={() => handleUpdateStatus(booking.id, 'no_show')}
                            disabled={isUpdatingStatus}
                          >
                            <XCircle className="mr-2 h-4 w-4 text-gray-500" />
                            Отметить как неявку
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem 
                          onClick={() => handleDeleteBooking(booking.id)}
                          disabled={isDeletingBooking}
                          className="text-red-500"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {bookingsData?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Бронирования не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {bookingsData && bookingsData.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-gray-500">
              Показано {bookingsData.data.length} из {bookingsData.pagination.total} бронирований
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={bookingsData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Диалог просмотра бронирования */}
      <Dialog open={isViewBookingDialogOpen} onOpenChange={setIsViewBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Детали бронирования</DialogTitle>
          </DialogHeader>
          {currentBooking && (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{currentBooking.service.name}</h3>
                  <p className="text-sm text-gray-500">{currentBooking.service.price} ₽</p>
                </div>
                {getStatusBadge(currentBooking.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Дата и время</p>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <p>{format(new Date(currentBooking.startTime), "dd.MM.yyyy")}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <p>
                      {format(new Date(currentBooking.startTime), "HH:mm")} - 
                      {format(new Date(currentBooking.endTime), "HH:mm")}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Сотрудник</p>
                  <div className="flex items-center gap-2 mt-1">
                    <UserCheck className="h-4 w-4 text-gray-500" />
                    <p>{currentBooking.employee.name}</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Информация о клиенте</p>
                <p className="font-medium">{currentBooking.customer.name}</p>
                <p>{currentBooking.customer.phone}</p>
                {currentBooking.customer.email && <p>{currentBooking.customer.email}</p>}
              </div>
              
              {currentBooking.notes && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Примечания</p>
                  <p>{currentBooking.notes}</p>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Создано: {format(new Date(currentBooking.createdAt), "dd.MM.yyyy HH:mm")}
                </p>
                {currentBooking.paymentStatus && (
                  <Badge variant={currentBooking.paymentStatus === 'paid' ? 'outline' : 'secondary'}>
                    {currentBooking.paymentStatus === 'paid' ? 'Оплачено' : 'Не оплачено'}
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-between pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500"
                  onClick={() => handleDeleteBooking(currentBooking.id)}
                  disabled={isDeletingBooking}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </Button>
                
                <div className="flex gap-2">
                  {currentBooking.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => handleUpdateStatus(currentBooking.id, 'confirmed')}
                      disabled={isUpdatingStatus}
                    >
                      Подтвердить
                    </Button>
                  )}
                  {(currentBooking.status === 'pending' || currentBooking.status === 'confirmed') && (
                    <Button 
                      size="sm" 
                      onClick={() => handleUpdateStatus(currentBooking.id, 'cancelled')}
                      disabled={isUpdatingStatus}
                      variant="outline"
                      className="text-red-500"
                    >
                      Отменить
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingsTab;
