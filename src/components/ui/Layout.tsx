
import { Link } from "react-router-dom";
import { ShoppingCart, Tool, Phone, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <Tool className="mr-2" />
              <span>ИнструментПрокат</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-4">
            <Link to="/catalog" className="hover:text-gray-200 transition-colors">
              Каталог
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition-colors">
              О нас
            </Link>
            <Link to="/contacts" className="hover:text-gray-200 transition-colors">
              Контакты
            </Link>
            <Link to="/admin" className="hover:text-gray-200 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="icon" className="bg-white text-primary hover:bg-gray-100">
                <ShoppingCart size={20} />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">ИнструментПрокат</h3>
              <p className="text-gray-300">
                Профессиональный инструмент в аренду для любых задач
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Контакты</h3>
              <address className="not-italic text-gray-300">
                <p>ул. Строителей, 15</p>
                <p>Москва, Россия</p>
                <p className="mt-2">
                  <a href="tel:+74951234567" className="flex items-center">
                    <Phone size={16} className="mr-2" /> +7 (495) 123-45-67
                  </a>
                </p>
              </address>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Режим работы</h3>
              <p className="text-gray-300">Пн-Пт: 9:00 - 20:00</p>
              <p className="text-gray-300">Сб-Вс: 10:00 - 18:00</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; {new Date().getFullYear()} ИнструментПрокат. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
