
import { useState, useEffect } from "react";
import {
  Plus,
  Package,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  ArrowUp,
  ArrowDown,
  Calendar,
  Home,
  PieChart,
  FileText,
  Tag,
  Truck,
  RefreshCw,
  AlertTriangle,
  Activity,
  HelpCircle,
  Filter,
  Database,
  Layers,
  List,
  Grid3X3,
  ChevronDown,
  Bell,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Моковые данные заказов
const orders = [
  {
    id: 1,
    customer: "Иванов Иван",
    date: "02.05.2025",
    status: "Активен",
    total: 2500,
    items: 3,
  },
  {
    id: 2,
    customer: "Петров Петр",
    date: "01.05.2025",
    status: "Завершен",
    total: 1200,
    items: 2,
  },
  {
    id: 3,
    customer: "Сидорова Елена",
    date: "30.04.2025",
    status: "Отменен",
    total: 3600,
    items: 1,
  },
  {
    id: 4,
    customer: "Козлов Дмитрий",
    date: "28.04.2025",
    status: "Завершен",
    total: 5400,
    items: 4,
  },
  {
    id: 5,
    customer: "Смирнова Ольга",
    date: "27.04.2025",
    status: "Активен",
    total: 1800,
    items: 2,
  },
  {
    id: 6,
    customer: "Антонов Артём",
    date: "26.04.2025",
    status: "Активен",
    total: 3200,
    items: 1,
  },
  {
    id: 7,
    customer: "Кузнецова Марина",
    date: "25.04.2025",
    status: "Завершен",
    total: 4100,
    items: 3,
  },
  {
    id: 8,
    customer: "Николаев Сергей",
    date: "24.04.2025",
    status: "Отменен",
    total: 1500,
    items: 2,
  },
];

// Моковые данные клиентов
const customers = [
  {
    id: 1,
    name: "Иванов Иван",
    email: "ivanov@example.com",
    phone: "+7 (901) 123-45-67",
    orders: 4,
  },
  {
    id: 2,
    name: "Петров Петр",
    email: "petrov@example.com",
    phone: "+7 (902) 234-56-78",
    orders: 2,
  },
  {
    id: 3,
    name: "Сидорова Елена",
    email: "sidorova@example.com",
    phone: "+7 (903) 345-67-89",
    orders: 3,
  },
  {
    id: 4,
    name: "Козлов Дмитрий",
    email: "kozlov@example.com",
    phone: "+7 (904) 456-78-90",
    orders: 7,
  },
  {
    id: 5,
    name: "Смирнова Ольга",
    email: "smirnova@example.com",
    phone: "+7 (905) 567-89-01",
    orders: 1,
  },
  {
    id: 6,
    name: "Антонов Артём",
    email: "antonov@example.com",
    phone: "+7 (906) 678-90-12",
    orders: 2,
  },
  {
    id: 7,
    name: "Кузнецова Марина",
    email: "kuznetsova@example.com",
    phone: "+7 (907) 789-01-23",
    orders: 5,
  },
  {
    id: 8,
    name: "Николаев Сергей",
    email: "nikolaev@example.com",
    phone: "+7 (908) 890-12-34",
    orders: 3,
  },
];

// Моковые данные уведомлений
const notifications = [
  {
    id: 1,
    title: "Новый заказ",
    description: "Поступил новый заказ №1234 от Иванова Ивана",
    time: "10 минут назад",
    read: false,
  },
  {
    id: 2,
    title: "Отмена заказа",
    description: "Клиент отменил заказ №1230",
    time: "1 час назад",
    read: false,
  },
  {
    id: 3,
    title: "Оплата получена",
    description: "Получена оплата за заказ №1228",
    time: "3 часа назад",
    read: true,
  },
  {
    id: 4,
    title: "Товар закончился",
    description: "Перфоратор Bosch GBH 2-26 заканчивается на складе",
    time: "5 часов назад",
    read: true,
  },
];

// Моковые данные для графиков
const chartData = {
  revenue: [
    { month: "Янв", value: 45000 },
    { month: "Фев", value: 52000 },
    { month: "Мар", value: 49000 },
    { month: "Апр", value: 58000 },
    { month: "Май", value: 63000 },
    { month: "Июн", value: 47000 },
  ],
  products: [
    { name: "Электроинструмент", value: 45 },
    { name: "Строительное оборудование", value: 25 },
    { name: "Лестницы и стремянки", value: 15 },
    { name: "Генераторы", value: 10 },
    { name: "Прочее", value: 5 },
  ],
};

// Компонент плашки с метрикой
const MetricCard = ({ title, value, icon, trend, color }: any) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
          </div>
          <div className={`p-2 rounded-full bg-${color}-100`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-4 text-sm">
            {trend.direction === "up" ? (
              <ArrowUp className="text-green-500 mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="text-red-500 mr-1 h-4 w-4" />
            )}
            <span
              className={trend.direction === "up" ? "text-green-500" : "text-red-500"}
            >
              {trend.value} ({trend.percentage})
            </span>
            <span className="text-muted-foreground ml-1">по сравнению с прошлым месяцем</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState<"table" | "grid">("table");
  const [editableProduct, setEditableProduct] = useState<any>(null);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.filter((n) => !n.read).length
  );

  // Загрузка аутентификации из localStorage
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация аутентификации
    if (username === "admin" && password === "admin") {
      localStorage.setItem("adminAuth", "true");
      setIsLoggedIn(true);
    } else {
      alert("Неверный логин или пароль. Используйте admin/admin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsLoggedIn(false);
  };

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0);
  };

  // Фильтрация заказов по статусу
  const filteredOrders = filterStatus === "all"
    ? orders
    : orders.filter(order => order.status.toLowerCase() === filterStatus.toLowerCase());

  // Мок функций редактирования
  const handleProductEdit = (product: any) => {
    setEditableProduct(product);
  };

  const handleProductUpdate = () => {
    // Симуляция обновления продукта
    setEditableProduct(null);
    alert("Товар успешно обновлен!");
  };

  const handleProductDelete = (id: number) => {
    // Симуляция удаления
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      alert(`Товар #${id} успешно удален!`);
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
                <Button type="submit" className="w-full">
                  Войти
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
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Выручка"
                value="321,500 ₽"
                icon={<BarChart3 className="h-5 w-5 text-primary" />}
                trend={{ direction: "up", value: "13,500 ₽", percentage: "4.2%" }}
                color="primary"
              />
              <MetricCard
                title="Активные заказы"
                value="24"
                icon={<ShoppingCart className="h-5 w-5 text-indigo-500" />}
                trend={{ direction: "up", value: "3", percentage: "12.5%" }}
                color="indigo"
              />
              <MetricCard
                title="Клиенты"
                value="487"
                icon={<Users className="h-5 w-5 text-green-500" />}
                trend={{ direction: "up", value: "12", percentage: "2.5%" }}
                color="green"
              />
              <MetricCard
                title="Доступные товары"
                value="134"
                icon={<Package className="h-5 w-5 text-amber-500" />}
                trend={{ direction: "down", value: "3", percentage: "2.2%" }}
                color="amber"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Выручка за последние 6 месяцев</CardTitle>
                  <CardDescription>
                    Динамика доходов от аренды инструментов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end gap-2">
                    {chartData.revenue.map((item) => (
                      <div key={item.month} className="relative flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-primary/90 rounded-t-sm"
                          style={{ height: `${(item.value / 70000) * 100}%` }}
                        ></div>
                        <span className="mt-2 text-sm">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Популярные категории</CardTitle>
                  <CardDescription>
                    Распределение аренды по категориям
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {chartData.products.map((item) => (
                      <div key={item.name} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm">{item.name}</span>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Последние заказы</CardTitle>
                  <CardDescription>
                    Недавно оформленные заказы на аренду
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Клиент</TableHead>
                        <TableHead>Дата</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.slice(0, 5).map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                order.status === "Активен"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : order.status === "Завершен"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{order.total} ₽</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="ghost" size="sm" className="gap-1" onClick={() => setActiveTab("orders")}>
                    Все заказы <ChevronRight size={14} />
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Активность клиентов</CardTitle>
                  <CardDescription>
                    Недавние действия пользователей на сайте
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>ИИ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Иванов Иван</p>
                        <p className="text-xs text-gray-500">Оформил заказ #1234</p>
                      </div>
                      <p className="text-xs text-gray-500">10 мин назад</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>КД</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Козлов Дмитрий</p>
                        <p className="text-xs text-gray-500">Продлил аренду перфоратора</p>
                      </div>
                      <p className="text-xs text-gray-500">1 час назад</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>СЕ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Сидорова Елена</p>
                        <p className="text-xs text-gray-500">Отменила заказ #1230</p>
                      </div>
                      <p className="text-xs text-gray-500">3 часа назад</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>ПП</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Петров Петр</p>
                        <p className="text-xs text-gray-500">Вернул шуруповерт Makita</p>
                      </div>
                      <p className="text-xs text-gray-500">5 часов назад</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>СО</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Смирнова Ольга</p>
                        <p className="text-xs text-gray-500">Зарегистрировалась на сайте</p>
                      </div>
                      <p className="text-xs text-gray-500">8 часов назад</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "products":
        return (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input className="pl-10" placeholder="Поиск товаров..." />
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter size={16} />
                    <span>Фильтр</span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Tag size={16} />
                        <span>Категория</span>
                        <ChevronDown size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Фильтр по категории</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Все категории</DropdownMenuItem>
                      <DropdownMenuItem>Электроинструмент</DropdownMenuItem>
                      <DropdownMenuItem>Строительное оборудование</DropdownMenuItem>
                      <DropdownMenuItem>Лестницы и стремянки</DropdownMenuItem>
                      <DropdownMenuItem>Генераторы</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="flex bg-gray-100 rounded-md">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`px-2 ${view === "table" ? "bg-white shadow-sm" : ""}`}
                      onClick={() => setView("table")}
                    >
                      <List size={18} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`px-2 ${view === "grid" ? "bg-white shadow-sm" : ""}`}
                      onClick={() => setView("grid")}
                    >
                      <Grid3X3 size={18} />
                    </Button>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2 whitespace-nowrap">
                        <Plus size={16} />
                        Добавить товар
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Добавление нового товара</DialogTitle>
                        <DialogDescription>
                          Заполните форму для добавления нового товара в каталог
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label htmlFor="name" className="text-sm font-medium">Название товара</label>
                          <Input id="name" placeholder="Введите название" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="category" className="text-sm font-medium">Категория</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electro">Электроинструмент</SelectItem>
                              <SelectItem value="building">Строительное оборудование</SelectItem>
                              <SelectItem value="ladders">Лестницы и стремянки</SelectItem>
                              <SelectItem value="generators">Генераторы</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="price" className="text-sm font-medium">Цена (₽/день)</label>
                          <Input id="price" type="number" placeholder="0" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="description" className="text-sm font-medium">Описание</label>
                          <Textarea 
                            id="description" 
                            placeholder="Введите описание товара"
                            className="min-h-[100px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="image" className="text-sm font-medium">Изображение</label>
                          <Input id="image" type="file" />
                        </div>
                        <div className="grid gap-2">
                          <div className="flex items-center gap-2">
                            <Switch id="available" defaultChecked />
                            <Label htmlFor="available">Доступен для аренды</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Отмена</Button>
                        <Button>Добавить</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {view === "table" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Название</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цена (₽/день)</TableHead>
                      <TableHead>Наличие</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            В наличии
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleProductEdit(product)}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleProductDelete(product.id)}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          В наличии
                        </Badge>
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base">{product.name}</CardTitle>
                        <CardDescription>{product.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="font-bold">{product.price} ₽/день</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleProductEdit(product)}
                        >
                          <Edit size={14} className="mr-1" /> Редактировать
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleProductDelete(product.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={14} className="mr-1" /> Удалить
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between p-4 border-t">
                <div className="text-sm text-gray-500">
                  Показано {products.length} из {products.length} товаров
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    Предыдущая
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary text-white">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Следующая
                  </Button>
                </div>
              </div>
            </div>

            {/* Модальное окно редактирования товара */}
            <Dialog open={!!editableProduct} onOpenChange={(open) => !open && setEditableProduct(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Редактирование товара</DialogTitle>
                  <DialogDescription>
                    Измените информацию о товаре и нажмите "Сохранить"
                  </DialogDescription>
                </DialogHeader>
                {editableProduct && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="edit-name" className="text-sm font-medium">Название товара</label>
                      <Input 
                        id="edit-name" 
                        defaultValue={editableProduct.name} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-category" className="text-sm font-medium">Категория</label>
                      <Select defaultValue={editableProduct.category.toLowerCase().replace(/\s+/g, '-')}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="электроинструмент">Электроинструмент</SelectItem>
                          <SelectItem value="строительное-оборудование">Строительное оборудование</SelectItem>
                          <SelectItem value="лестницы-и-стремянки">Лестницы и стремянки</SelectItem>
                          <SelectItem value="генераторы">Генераторы</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-price" className="text-sm font-medium">Цена (₽/день)</label>
                      <Input 
                        id="edit-price" 
                        type="number" 
                        defaultValue={editableProduct.price} 
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-description" className="text-sm font-medium">Описание</label>
                      <Textarea 
                        id="edit-description" 
                        defaultValue={editableProduct.description}
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-image" className="text-sm font-medium">Текущее изображение</label>
                      <div className="h-40 w-full rounded-md overflow-hidden">
                        <img
                          src={editableProduct.image}
                          alt={editableProduct.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="edit-new-image" className="text-sm font-medium">Загрузить новое изображение</label>
                      <Input id="edit-new-image" type="file" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Switch id="edit-available" defaultChecked />
                        <Label htmlFor="edit-available">Доступен для аренды</Label>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditableProduct(null)}>Отмена</Button>
                  <Button onClick={handleProductUpdate}>Сохранить</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        );
      case "orders":
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input className="pl-10" placeholder="Поиск заказов..." />
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Filter size={16} />
                      <span>Статус</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Фильтр по статусу</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterStatus("all")}>Все статусы</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("активен")}>Активен</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("завершен")}>Завершен</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFilterStatus("отменен")}>Отменен</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Период</span>
                      <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Фильтр по периоду</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Сегодня</DropdownMenuItem>
                    <DropdownMenuItem>Вчера</DropdownMenuItem>
                    <DropdownMenuItem>Неделя</DropdownMenuItem>
                    <DropdownMenuItem>Месяц</DropdownMenuItem>
                    <DropdownMenuItem>Квартал</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <RefreshCw size={16} />
                  <span>Обновить</span>
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Позиций</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          order.status === "Активен"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : order.status === "Завершен"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.total} ₽</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Подробнее <ChevronRight size={14} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Заказ #{order.id}</DialogTitle>
                            <DialogDescription>
                              Детальная информация о заказе
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-1">Информация о клиенте</h3>
                                <p className="text-sm">{order.customer}</p>
                                <p className="text-sm">client@example.com</p>
                                <p className="text-sm">+7 (999) 123-45-67</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Информация о заказе</h3>
                                <p className="text-sm">Дата: {order.date}</p>
                                <p className="text-sm">Статус: {order.status}</p>
                                <p className="text-sm">Способ оплаты: Банковская карта</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">Товары в заказе</h3>
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded overflow-hidden">
                                    <img 
                                      src="https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                                      alt="Перфоратор" 
                                      className="h-full w-full object-cover" 
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">Перфоратор Bosch GBH 2-26</p>
                                    <p className="text-xs text-gray-500">7 дней × 500 ₽/день</p>
                                  </div>
                                  <p className="text-sm font-medium">3 500 ₽</p>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                  <div className="h-12 w-12 rounded overflow-hidden">
                                    <img 
                                      src="https://images.unsplash.com/photo-1581578017093-cd30fce4edf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                                      alt="Бетономешалка" 
                                      className="h-full w-full object-cover" 
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">Бетономешалка ЗУБР БС-120</p>
                                    <p className="text-xs text-gray-500">3 дня × 800 ₽/день</p>
                                  </div>
                                  <p className="text-sm font-medium">2 400 ₽</p>
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-1">Информация о доставке</h3>
                                <p className="text-sm">Адрес: ул. Примерная, д. 123, кв. 45</p>
                                <p className="text-sm">Дата доставки: 03.05.2025</p>
                                <p className="text-sm">Время: 10:00 - 14:00</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Итого</h3>
                                <div className="text-sm flex justify-between">
                                  <span>Товары:</span>
                                  <span>5 900 ₽</span>
                                </div>
                                <div className="text-sm flex justify-between">
                                  <span>Доставка:</span>
                                  <span>300 ₽</span>
                                </div>
                                <div className="text-sm flex justify-between font-bold mt-1">
                                  <span>К оплате:</span>
                                  <span>{order.total} ₽</span>
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-sm font-medium mb-1">Изменить статус заказа</h3>
                              <div className="flex gap-2">
                                <Select defaultValue={order.status.toLowerCase()}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите статус" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="активен">Активен</SelectItem>
                                    <SelectItem value="завершен">Завершен</SelectItem>
                                    <SelectItem value="отменен">Отменен</SelectItem>
                                  </SelectContent>
                                </Select>
                                <Button>Обновить</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-500">
                Показано {filteredOrders.length} из {orders.length} заказов
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Предыдущая
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Следующая
                </Button>
              </div>
            </div>
          </div>
        );
      case "customers":
        return (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input className="pl-10" placeholder="Поиск клиентов..." />
              </div>
              <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter size={16} />
                  <span>Фильтр</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus size={16} />
                      Добавить клиента
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Добавление нового клиента</DialogTitle>
                      <DialogDescription>
                        Заполните форму для добавления нового клиента в базу
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Имя</Label>
                          <Input id="firstName" placeholder="Иван" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Фамилия</Label>
                          <Input id="lastName" placeholder="Иванов" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@mail.ru" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" placeholder="+7 (___) ___-__-__" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="address">Адрес</Label>
                        <Textarea id="address" placeholder="г. Москва, ул. Примерная, д.123" className="mt-1" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Отмена</Button>
                      <Button>Добавить клиента</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Имя</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Телефон</TableHead>
                  <TableHead>Заказов</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span>{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="gap-1">
                            Подробнее <ChevronRight size={14} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                          <DialogHeader>
                            <DialogTitle>Клиент: {customer.name}</DialogTitle>
                            <DialogDescription>
                              Детальная информация о клиенте
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg">{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h2 className="text-xl font-bold">{customer.name}</h2>
                                <p className="text-gray-500">Клиент с {customer.id < 4 ? "2023" : "2024"} года</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium mb-1">Контактная информация</h3>
                                <p className="text-sm">Email: {customer.email}</p>
                                <p className="text-sm">Телефон: {customer.phone}</p>
                                <p className="text-sm">Адрес: г. Москва, ул. Примерная, д. {100 + customer.id}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium mb-1">Статистика</h3>
                                <p className="text-sm">Количество заказов: {customer.orders}</p>
                                <p className="text-sm">Общая сумма: {customer.orders * 1500} ₽</p>
                                <p className="text-sm">Средний чек: {1500} ₽</p>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-sm font-medium mb-2">История заказов</h3>
                              <div className="space-y-3">
                                {[...Array(Math.min(3, customer.orders))].map((_, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                                      <ShoppingCart size={16} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">Заказ #{1000 + customer.id + idx}</p>
                                      <p className="text-xs text-gray-500">{new Date(2025, 3, 30 - idx * 5).toLocaleDateString()}</p>
                                    </div>
                                    <Badge 
                                      variant="outline"
                                      className={idx === 0 ? "bg-blue-50 text-blue-700" : "bg-green-50 text-green-700"}
                                    >
                                      {idx === 0 ? "Активен" : "Завершен"}
                                    </Badge>
                                    <p className="text-sm font-medium">{1200 + idx * 300} ₽</p>
                                  </div>
                                ))}
                              </div>
                              {customer.orders > 3 && (
                                <Button variant="ghost" size="sm" className="mt-2 w-full">
                                  Показать все заказы ({customer.orders})
                                </Button>
                              )}
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="text-sm font-medium mb-1">Примечания</h3>
                              <Textarea 
                                placeholder="Добавьте примечание о клиенте..." 
                                className="min-h-[80px]"
                              />
                              <div className="mt-2 flex justify-end">
                                <Button size="sm">Сохранить примечание</Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-gray-500">
                Показано {customers.length} из {customers.length} клиентов
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Предыдущая
                </Button>
                <Button variant="outline" size="sm" className="bg-primary text-white">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Следующая
                </Button>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Общие настройки</CardTitle>
                <CardDescription>
                  Настройте основные параметры магазина
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-name">Название магазина</Label>
                  <Input id="store-name" defaultValue="ИнструментПрокат" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-description">Описание</Label>
                  <Textarea 
                    id="store-description" 
                    defaultValue="Профессиональный инструмент в аренду по доступным ценам."
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Контактный email</Label>
                  <Input id="contact-email" type="email" defaultValue="info@instrumentprokat.ru" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Контактный телефон</Label>
                  <Input id="contact-phone" defaultValue="+7 (495) 123-45-67" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-address">Адрес</Label>
                  <Input id="store-address" defaultValue="г. Москва, ул. Строителей, 15" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Сохранить настройки</Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки доставки</CardTitle>
                  <CardDescription>
                    Настройте параметры доставки
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Доставка по городу</Label>
                      <p className="text-sm text-muted-foreground">
                        Стоимость доставки внутри города
                      </p>
                    </div>
                    <Input 
                      type="number" 
                      defaultValue="300" 
                      className="w-24 text-right" 
                      min="0"
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Доставка за город</Label>
                      <p className="text-sm text-muted-foreground">
                        Стоимость доставки за пределы города
                      </p>
                    </div>
                    <Input 
                      type="number" 
                      defaultValue="500" 
                      className="w-24 text-right" 
                      min="0"
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Бесплатная доставка от</Label>
                      <p className="text-sm text-muted-foreground">
                        Минимальная сумма для бесплатной доставки
                      </p>
                    </div>
                    <Input 
                      type="number" 
                      defaultValue="5000" 
                      className="w-24 text-right" 
                      min="0"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Сохранить настройки</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Настройки оплаты</CardTitle>
                  <CardDescription>
                    Настройте способы оплаты
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-card" defaultChecked />
                    <Label htmlFor="payment-card">Оплата картой</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-cash" defaultChecked />
                    <Label htmlFor="payment-cash">Оплата наличными</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-sbp" defaultChecked />
                    <Label htmlFor="payment-sbp">Система быстрых платежей (СБП)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="payment-invoice" defaultChecked />
                    <Label htmlFor="payment-invoice">Безналичный расчет (счет)</Label>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="merchant-id">ID мерчанта</Label>
                    <Input id="merchant-id" defaultValue="merchant_12345678" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API-ключ платежной системы</Label>
                    <Input id="api-key" type="password" defaultValue="sk_test_12345678" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Сохранить настройки</Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
                <CardDescription>
                  Настройте email и SMS уведомления
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="email">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email уведомления</TabsTrigger>
                    <TabsTrigger value="sms">SMS уведомления</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email" className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-new-order" defaultChecked />
                      <Label htmlFor="email-new-order">Новый заказ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-order-status" defaultChecked />
                      <Label htmlFor="email-order-status">Изменение статуса заказа</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-delivery" defaultChecked />
                      <Label htmlFor="email-delivery">Информация о доставке</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-promos" />
                      <Label htmlFor="email-promos">Акции и специальные предложения</Label>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="sender-email">Email отправителя</Label>
                      <Input id="sender-email" defaultValue="noreply@instrumentprokat.ru" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sender-name">Имя отправителя</Label>
                      <Input id="sender-name" defaultValue="ИнструментПрокат" />
                    </div>
                  </TabsContent>
                  <TabsContent value="sms" className="space-y-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-new-order" defaultChecked />
                      <Label htmlFor="sms-new-order">Новый заказ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-delivery" defaultChecked />
                      <Label htmlFor="sms-delivery">Информация о доставке</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-promo" />
                      <Label htmlFor="sms-promo">Акции и специальные предложения</Label>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="sms-api">API интеграции SMS</Label>
                      <Input id="sms-api" defaultValue="https://api.sms-provider.com/send" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sms-api-key">API-ключ SMS</Label>
                      <Input id="sms-api-key" type="password" defaultValue="sms_api_12345678" />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Сохранить настройки</Button>
              </CardFooter>
            </Card>
          </div>
        );
      case "help":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Справка и поддержка</CardTitle>
                <CardDescription>
                  Документация и ответы на часто задаваемые вопросы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Как добавить новый товар?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Чтобы добавить новый товар, перейдите на вкладку "Товары" и нажмите кнопку "Добавить товар".
                        Заполните все необходимые поля в форме и нажмите "Сохранить".
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        Обязательно укажите название, категорию, описание, цену и загрузите фотографию товара.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Как изменить статус заказа?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Для изменения статуса заказа перейдите на вкладку "Заказы", найдите нужный заказ 
                        и нажмите "Подробнее". В открывшемся окне выберите новый статус в выпадающем списке 
                        и нажмите "Обновить".
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Как настроить способы оплаты?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Настройка способов оплаты доступна на вкладке "Настройки" в разделе "Настройки оплаты". 
                        Вы можете включить или выключить различные способы оплаты и настроить параметры 
                        платежных систем.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Как добавить нового пользователя?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Для добавления нового пользователя перейдите в раздел "Настройки" и выберите вкладку 
                        "Пользователи администрации". Нажмите кнопку "Добавить пользователя" и заполните необходимые данные. 
                        Не забудьте установить соответствующие права доступа.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Как экспортировать данные?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-gray-700">
                        Вы можете экспортировать данные в формате CSV или Excel. Для этого перейдите в нужный 
                        раздел (например, "Заказы" или "Клиенты"), нажмите кнопку "Экспорт" и выберите формат 
                        экспорта.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" className="gap-1">
                  <FileText size={16} /> Полная документация
                </Button>
                <Button className="gap-1">
                  <HelpCircle size={16} /> Связаться с поддержкой
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Видеоинструкции</CardTitle>
                <CardDescription>
                  Обучающие видео по работе с административной панелью
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">Обзор административной панели</h3>
                    <p className="text-sm text-gray-500">5:45 мин</p>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0  001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">Управление товарами</h3>
                    <p className="text-sm text-gray-500">7:20 мин</p>
                  </div>
                </div>
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">Работа с заказами</h3>
                    <p className="text-sm text-gray-500">6:15 мин</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                onClick={() => setActiveTab("customers")}
                className={`flex w-full items-center p-2 rounded-md ${
                  activeTab === "customers" ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="mr-2 h-5 w-5" />
                <span>Клиенты</span>
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
                {activeTab === "customers" && "Управление клиентами"}
                {activeTab === "settings" && "Настройки системы"}
                {activeTab === "help" && "Справка и поддержка"}
              </h1>
              <p className="text-sm text-gray-600 hidden sm:block">
                {activeTab === "dashboard" && "Обзор и статистика"}
                {activeTab === "products" && "Добавление, редактирование и удаление товаров"}
                {activeTab === "orders" && "Просмотр и управление заказами"}
                {activeTab === "customers" && "Информация о клиентах"}
                {activeTab === "settings" && "Настройка магазина, доставки и оплаты"}
                {activeTab === "help" && "Документация и ответы на вопросы"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
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
                    onClick={markAllNotificationsAsRead}
                    className="text-xs h-7 px-2"
                  >
                    Отметить все как прочитанные
                  </Button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-80">
                  {notifications.map((notification) => (
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
                  ))}
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
