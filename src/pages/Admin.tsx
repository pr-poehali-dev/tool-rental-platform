
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { Separator } from "@/components/ui/separator";

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
];

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
];

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Имитация аутентификации
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("Неверный логин или пароль. Используйте admin/admin");
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">ИнструментПрокат</h1>
          <p className="text-sm text-gray-600">Панель управления</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#dashboard"
                className="flex items-center p-2 rounded-md bg-primary text-white"
              >
                <Package className="mr-2 h-5 w-5" />
                <span>Товары</span>
              </a>
            </li>
            <li>
              <a
                href="#orders"
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span>Заказы</span>
              </a>
            </li>
            <li>
              <a
                href="#customers"
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Users className="mr-2 h-5 w-5" />
                <span>Клиенты</span>
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <Settings className="mr-2 h-5 w-5" />
                <span>Настройки</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => setIsLoggedIn(false)}
          >
            <LogOut className="mr-2 h-5 w-5" />
            <span>Выйти</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Управление товарами</h1>
            <p className="text-sm text-gray-600">
              Добавление, редактирование и удаление товаров
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} />
                Добавить товар
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                  <Input id="category" placeholder="Выберите категорию" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="price" className="text-sm font-medium">Цена (₽/день)</label>
                  <Input id="price" type="number" placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">Описание</label>
                  <textarea 
                    id="description" 
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Введите описание товара"
                  ></textarea>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="image" className="text-sm font-medium">Изображение</label>
                  <Input id="image" type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Отмена</Button>
                <Button>Добавить</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="p-6">
          <Tabs defaultValue="products">
            <TabsList className="mb-6">
              <TabsTrigger value="products">Товары</TabsTrigger>
              <TabsTrigger value="orders">Заказы</TabsTrigger>
              <TabsTrigger value="customers">Клиенты</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input className="pl-10" placeholder="Поиск товаров..." />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Фильтр
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Категория
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
                  </div>
                </div>

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
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between p-4 border-t">
                  <div className="text-sm text-gray-500">
                    Показано 6 из 24 товаров
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
            </TabsContent>

            <TabsContent value="orders">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input className="pl-10" placeholder="Поиск заказов..." />
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Статус
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Фильтр по статусу</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Все статусы</DropdownMenuItem>
                        <DropdownMenuItem>Активен</DropdownMenuItem>
                        <DropdownMenuItem>Завершен</DropdownMenuItem>
                        <DropdownMenuItem>Отменен</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
                    {orders.map((order) => (
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
                          <Button variant="ghost" size="sm" className="gap-1">
                            Подробнее <ChevronRight size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between p-4 border-t">
                  <div className="text-sm text-gray-500">
                    Показано 5 из 15 заказов
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
            </TabsContent>

            <TabsContent value="customers">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 flex justify-between items-center border-b">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input className="pl-10" placeholder="Поиск клиентов..." />
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
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.phone}</TableCell>
                        <TableCell>{customer.orders}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            Подробнее <ChevronRight size={14} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex items-center justify-between p-4 border-t">
                  <div className="text-sm text-gray-500">
                    Показано 5 из 20 клиентов
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
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Admin;
