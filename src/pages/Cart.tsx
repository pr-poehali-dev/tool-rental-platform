
import { useState } from "react";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/lib/data";

interface CartItem {
  product: typeof products[0];
  quantity: number;
  days: number;
}

const Cart = () => {
  // Инициализируем корзину с тестовыми данными
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1, days: 3 },
    { product: products[2], quantity: 1, days: 7 },
  ]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.product.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleDaysChange = (id: number, days: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.product.id === id) {
          return { ...item, days };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.product.id !== id));
  };

  // Расчет итоговой стоимости
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity * item.days,
    0
  );
  const delivery = cartItems.length > 0 ? 300 : 0;
  const total = subtotal + delivery;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {cartItems.map((item) => (
                <div key={item.product.id} className="mb-6 bg-white rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-1/4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold">
                          <Link to={`/product/${item.product.id}`} className="hover:text-primary">
                            {item.product.name}
                          </Link>
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.product.id)}
                        >
                          <Trash2 size={18} className="text-gray-500 hover:text-red-500" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">{item.product.category}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Количество</label>
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, -1)}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleQuantityChange(item.product.id, 1)}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Дней аренды</label>
                          <select
                            className="w-full h-9 rounded-md border border-input px-3 py-1"
                            value={item.days}
                            onChange={(e) => handleDaysChange(item.product.id, Number(e.target.value))}
                          >
                            <option value={1}>1 день</option>
                            <option value={3}>3 дня</option>
                            <option value={7}>7 дней</option>
                            <option value={14}>14 дней</option>
                            <option value={30}>30 дней</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={16} className="mr-1" />
                          <span>Доступен сейчас</span>
                        </div>
                        <div className="text-lg font-bold">
                          {item.product.price * item.quantity * item.days} ₽
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Итого</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товаров</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость аренды</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span>{delivery} ₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>К оплате</span>
                    <span>{total} ₽</span>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full text-lg" size="lg">
                      Оформить заказ <ArrowRight size={16} className="ml-2" />
                    </Button>
                    <Button variant="outline" className="w-full mt-2" asChild>
                      <Link to="/catalog">Продолжить покупки</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold mb-2">Промокод</h3>
                <div className="flex gap-2">
                  <Input placeholder="Введите промокод" />
                  <Button variant="outline">Применить</Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Ваша корзина пуста</h2>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Добавьте инструменты в корзину, чтобы оформить аренду. Выбирайте из нашего каталога профессиональных инструментов.
            </p>
            <Button asChild size="lg">
              <Link to="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
