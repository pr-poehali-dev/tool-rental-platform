
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, X, ChevronDown, Home, Package, Info, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/components/cart/CartContext";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Каталог", href: "/catalog" },
    { name: "О нас", href: "/about" },
    { name: "Контакты", href: "/contacts" }
  ];
  
  const catalogCategories = [
    { name: "Электроинструмент", href: "/catalog?category=Электроинструмент" },
    { name: "Строительное оборудование", href: "/catalog?category=Строительное оборудование" },
    { name: "Лестницы и стремянки", href: "/catalog?category=Лестницы и стремянки" },
    { name: "Генераторы", href: "/catalog?category=Генераторы" },
    { name: "Все категории", href: "/catalog" }
  ];
  
  const year = new Date().getFullYear();
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Хедер */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                ИнструментПрокат
              </Link>
            </div>
            
            {/* Навигация для больших экранов */}
            <nav className="hidden md:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink 
                        className={navigationMenuTriggerStyle()}
                        active={isActive("/")}
                      >
                        Главная
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                        {catalogCategories.map((category) => (
                          <li key={category.name} className="row-span-1">
                            <NavigationMenuLink asChild>
                              <Link
                                to={category.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  {category.name}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink 
                        className={navigationMenuTriggerStyle()}
                        active={isActive("/about")}
                      >
                        О нас
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="/contacts">
                      <NavigationMenuLink 
                        className={navigationMenuTriggerStyle()}
                        active={isActive("/contacts")}
                      >
                        Контакты
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            
            {/* Иконки действий */}
            <div className="flex items-center space-x-2">
              <Link to="/cart" className="relative p-2">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {itemCount}
                  </Badge>
                )}
              </Link>
              
              <Link to="/admin" className="hidden md:block">
                <Button variant="outline" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span>Войти</span>
                </Button>
              </Link>
              
              {/* Меню-бургер для мобильных устройств */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 flex justify-between items-center border-b">
                      <div className="text-xl font-bold text-primary">
                        ИнструментПрокат
                      </div>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-6 w-6" />
                        </Button>
                      </SheetClose>
                    </div>
                    
                    <nav className="flex-1 overflow-auto py-4">
                      <ul className="space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <SheetClose asChild>
                              <Link
                                to={item.href}
                                className={`flex items-center px-4 py-3 hover:bg-gray-100 ${
                                  isActive(item.href) ? "text-primary font-medium" : ""
                                }`}
                              >
                                {item.name === "Главная" && <Home className="mr-3 h-5 w-5" />}
                                {item.name === "Каталог" && <Package className="mr-3 h-5 w-5" />}
                                {item.name === "О нас" && <Info className="mr-3 h-5 w-5" />}
                                {item.name === "Контакты" && <Phone className="mr-3 h-5 w-5" />}
                                {item.name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                      
                      {item.name === "Каталог" && (
                        <div className="mt-2 pl-8">
                          <button
                            onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                            className="flex items-center px-4 py-2 text-sm"
                          >
                            <ChevronDown className={`mr-1 h-4 w-4 transition-transform ${isSubMenuOpen ? "rotate-180" : ""}`} />
                            Категории
                          </button>
                          {isSubMenuOpen && (
                            <ul className="ml-4 space-y-1">
                              {catalogCategories.map((category) => (
                                <li key={category.name}>
                                  <SheetClose asChild>
                                    <Link
                                      to={category.href}
                                      className="block px-4 py-2 text-sm hover:text-primary"
                                    >
                                      {category.name}
                                    </Link>
                                  </SheetClose>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </nav>
                    
                    <div className="p-4 border-t">
                      <SheetClose asChild>
                        <Link to="/admin">
                          <Button className="w-full gap-2">
                            <User className="h-4 w-4" />
                            Личный кабинет
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      {/* Основной контент */}
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
      
      {/* Футер */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">О компании</h3>
              <p className="text-gray-400 mb-4">
                ИнструментПрокат - прокат строительного инструмента и оборудования с доставкой.
              </p>
              <div className="flex space-x-2">
                <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Категории</h3>
              <ul className="space-y-2">
                {catalogCategories.map((category) => (
                  <li key={category.name}>
                    <Link 
                      to={category.href}
                      className="text-gray-400 hover:text-white transition"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Информация</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-white transition">
                    О компании
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="text-gray-400 hover:text-white transition">
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="text-gray-400 hover:text-white transition">
                    Доставка и оплата
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition">
                    Условия аренды
                  </Link>
                </li>
                <li>
                  <Link to="/policy" className="text-gray-400 hover:text-white transition">
                    Политика конфиденциальности
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">+7 (900) 123-45-67</span>
                </li>
                <li className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">info@instrumentprokat.ru</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">г. Москва, ул. Примерная, д. 123</span>
                </li>
                <li className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                  <span className="text-gray-400">Пн-Пт: 9:00-20:00<br />Сб-Вс: 10:00-18:00</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>© {year} ИнструментПрокат. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
