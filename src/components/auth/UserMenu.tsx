
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import AuthModal from "./AuthModal";
import { User, LogOut, Settings, ShoppingBag, Heart, CreditCard } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserMenu = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Проверяем статус аутентификации из localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);

    if (authStatus) {
      const userString = localStorage.getItem("user");
      if (userString) {
        setUserData(JSON.parse(userString));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);

    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
      variant: "default",
    });
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    const userString = localStorage.getItem("user");
    if (userString) {
      setUserData(JSON.parse(userString));
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthModal 
        trigger={
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <User size={16} />
            <span>Войти</span>
          </Button>
        }
        onSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-white">
              {userData?.name.slice(0, 2).toUpperCase() || "ИП"}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">{userData?.name || "Пользователь"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Профиль</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="flex items-center cursor-pointer">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Мои заказы</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/favorites" className="flex items-center cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>Избранное</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/payment-methods" className="flex items-center cursor-pointer">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Способы оплаты</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Настройки</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Выйти</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
