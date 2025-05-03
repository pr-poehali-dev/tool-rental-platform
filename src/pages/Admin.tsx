
import { useState, useEffect } from "react";
import {
  Home,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Bell,
  Search,
  HelpCircle,
  CalendarRange,
  ClipboardList,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import ProductsTab from "@/components/admin/ProductsTab";
import DashboardTab from "@/components/admin/DashboardTab";
import BookingsTab from "@/components/admin/BookingsTab";
import ServicesTab from "@/components/admin/ServicesTab";
import { useApi } from "@/hooks/useApi";
import { mockAuthAPI, mockNotificationsAPI } from "@/lib/mock-api";
import { NotificationsResponse, AuthResponse, LoginCredentials } from "@/lib/types";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  // API для авторизации
  const {
    data: authData,
    isLoading: isAuthLoading,
    error: authError,
    execute: loginExecute
  } = useApi<AuthResponse, LoginCredentials>(
    (credentials) => mockAuthAPI.login(credentials)
  );

  // API для получения уведомлений
  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    error: notificationsError,
    execute: fetchNotifications
  } = useApi<NotificationsResponse>(
    (params) => mockNotificationsAPI.getAll(params),
    { loadOnMount: false }
  );

  // API для отметки всех уведомлений как прочитанных
  const {
    isLoading: isMarkingAllRead,
    error: markAllReadError,
    execute: markAllAsRead
  } = useApi<{ success: boolean }>(
    () => mockNotificationsAPI.markAllAsRead(),
    { successMessage: "Все уведомления отмечены как прочитанные" }
  );

  // Загрузка аутентификации из localStorage
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Загрузка уведомлений после успешной авторизации
  useEffect(() => {
    if (isLoggedIn) {
      fetchNotifications();
    }
  }, [isLoggedIn, fetchNotifications]);

  // Обновление счетчика непрочитанных уведомлений
  useEffect(() => {
    if (notificationsData) {
      setUnreadCount(notificationsData.unreadCount);
    }
  }, [notificationsData]);

  // Обработка успешной авторизации
  useEffect(() => {
    if (authData) {
      setIsLoggedIn(true);
      fetchNotifications();
    }
  }, [authData, fetchNotifications]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await loginExecute({ username, password });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы"
    });
  };

  const handleMarkAllNotificationsAsRead = async () => {
    const result = await markAllAsRead();
    if (result && result.success) {
      setUnreadCount(0);
      fetchNotifications();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">Вход в админ-панель</h1>
              <p className="text-gray-600">
                Введите свои учетные данные для доступа
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium mb-1">
                    Имя пользователя
                  </label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Пароль
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {authError && (
                  <div className="text-red-500 text-sm">
                    {authError.message || "Ошибка входа. Проверьте учетные данные."}
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={isAuthLoading}>
                  {isAuthLoading ? "Вход..." : "Войти"}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-sm text-center text-gray-600">
              Для демо-доступа используйте: admin / admin
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Содержимое для разных табов
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "products":
        return <ProductsTab />;
      case "bookings":
        return <BookingsTab />;
      case "services":
        return <ServicesTab />;
      case "orders":
        return (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Управление заказами</h3>
            <p className="text-gray-500 mb-4">Здесь будет отображаться список заказов.</p>
            <Button>Загрузить заказы</Button>
          </div>
        );
      case "customers":
        return (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Управление клиентами</h3>
            <p className="text-gray-500 mb-4">Здесь будет отображаться список клиентов.</p>
            <Button>Загрузить клиентов</Button>
          </div>
        );
      case "employees":
        return (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <UserCog className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Управление сотрудниками</h3>
            <p className="text-gray-500 mb-4">Здесь будет отображаться список сотрудников и их расписание.</p>
            <Button>Загрузить сотрудников</Button>
          </div>
        );
      case "settings":
        return (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Settings className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Настройки системы</h3>
            <p className="text-gray-500 mb-4">Здесь будут доступны настройки магазина.</p>
            <Button>Редактировать настройки</Button>
          </div>
        );
      case "help":
        return (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Справка и поддержка</h3>
            <p className="text-gray-500 mb-4">Здесь будут доступны материалы справки.</p>
            <Button>Открыть справку</Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Мобильный сайдбар */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">ИнструментПрокат</h1>
            <p className="text-sm text-gray-600">Панель управления</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveTab("dashboard");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "dashboard" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Home className="mr-2 h-5 w-5" />
                  <span>Дашборд</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("products");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "products" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Package className="mr-2 h-5 w-5" />
                  <span>Товары</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("orders");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "orders" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  <span>Заказы</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("bookings");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "bookings" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <CalendarRange className="mr-2 h-5 w-5" />
                  <span>Бронирования</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("services");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "services" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ClipboardList className="mr-2 h-5 w-5" />
                  <span>Услуги</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("customers");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "customers" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Users className="mr-2 h-5 w-5" />
                  <span>Клиенты</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("employees");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "employees" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <UserCog className="mr-2 h-5 w-5" />
                  <span>Сотрудники</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("settings");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "settings" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  <span>Настройки</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab("help");
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`flex w-full items-center p-2 rounded-md ${
                    activeTab === "help" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <HelpCircle className="mr-2 h-5 w-5" />
                  <span>Справка</span>
                </button>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span>Выйти</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Десктопный сайдбар */}
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">ИнструментПрокат</h1>
          <p className="text-sm text-gray-600">Панель управления</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "dashboard" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Home className="mr-2 h-5 w-5" />
                <span>Дашборд</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "products" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Package className="mr-2 h-5 w-5" />
                <span>Товары</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "orders" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>Заказы</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "bookings" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CalendarRange className="mr-2 h-5 w-5" />
                <span>Бронирования</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("services")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "services" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ClipboardList className="mr-2 h-5 w-5" />
                <span>Услуги</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "customers" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="mr-2 h-5 w-5" />
                <span>Клиенты</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("employees")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "employees" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UserCog className="mr-2 h-5 w-5" />
                <span>Сотрудники</span>
              </button>
            </li>
            <Separator className="my-4" />
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "settings" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="mr-2 h-5 w-5" />
                <span>Настройки</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("help")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "help" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <HelpCircle className="mr-2 h-5 w-5" />
                <span>Справка</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Выйти</span>
          </Button>
        </div>
      </aside>

      {/* Главный контент */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <SheetTrigger asChild className="md:hidden mr-2">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </Button>
            </SheetTrigger>
            <div>
              <h1 className="text-xl font-bold">
                {activeTab === "dashboard" && "Дашборд"}
                {activeTab === "products" && "Управление товарами"}
                {activeTab === "orders" && "Управление заказами"}
                {activeTab === "bookings" && "Управление бронированием"}
                {activeTab === "services" && "Управление услугами"}
                {activeTab === "customers" && "Управление клиентами"}
                {activeTab === "employees" && "Управление сотрудниками"}
                {activeTab === "settings" && "Настройки системы"}
                {activeTab === "help" && "Справка и поддержка"}
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                {activeTab === "dashboard" && "Обзор и статистика"}
                {activeTab === "products" && "Добавление, редактирование и удаление товаров"}
                {activeTab === "orders" && "Просмотр и управление заказами"}
                {activeTab === "bookings" && "Создание и управление бронированиями услуг"}
                {activeTab === "services" && "Добавление и управление услугами"}
                {activeTab === "customers" && "Информация о клиентах"}
                {activeTab === "employees" && "Управление сотрудниками и их расписанием"}
                {activeTab === "settings" && "Настройка магазина, доставки и оплаты"}
                {activeTab === "help" && "Документация и ответы на вопросы"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 text-gray-400" size={16} />
              <Input
                placeholder="Поиск..."
                className="w-64 pl-9 h-9 text-sm"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex justify-between items-center">
                  <span>Уведомления</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleMarkAllNotificationsAsRead}
                    className="text-xs h-7 px-2"
                    disabled={isMarkingAllRead || unreadCount === 0}
                  >
                    Отметить все как прочитанные
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-80">
                  {isLoadingNotifications ? (
                    <div className="p-4 text-center text-gray-500">
                      Загрузка уведомлений...
                    </div>
                  ) : notificationsError ? (
                    <div className="p-4 text-center text-red-500">
                      Ошибка при загрузке уведомлений
                    </div>
                  ) : notificationsData && notificationsData.data.length > 0 ? (
                    notificationsData.data.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 ${!notification.read ? 'bg-blue-50' : ''} hover:bg-gray-100 cursor-pointer`}
                      >
                        <div className="flex justify-between">
                          <h3 className={`text-sm font-medium ${!notification.read ? 'text-blue-700' : ''}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Нет уведомлений
                    </div>
                  )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <div className="p-2 text-center">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    Просмотреть все уведомления
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>А</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">Администратор</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Профиль</DropdownMenuItem>
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Admin;
