
import { useState } from "react";
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, Calendar, ArrowRight, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PaymentForm from "@/components/payment/PaymentForm";
import { useCart } from "@/components/cart/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, updateDays, subtotal, deliveryFee, total, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      toast({
        title: "Промокод применен",
        description: "Скидка 10% на все товары",
        variant: "default",
      });
    } else {
      toast({
        title: "Неверный промокод",
        description: "Попробуйте другой код",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину перед оформлением",
        variant: "destructive",
      });
      return;
    }
    
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentOpen(false);
    setIsOrderComplete(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    setIsOrderComplete(false);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Корзина</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {items.map((item) => (
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
                          onClick={() => removeFromCart(item.product.id)}
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
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </Button>
                            <span className="w-10 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
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
                            onChange={(e) => updateDays(item.product.id, Number(e.target.value))}
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
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Итого</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Товаров</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость аренды</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span>{deliveryFee} ₽</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>К оплате</span>
                    <span>{total} ₽</span>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full text-lg" size="lg" onClick={handleCheckout}>
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
                  <Input 
                    placeholder="Введите промокод" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleApplyPromo}>Применить</Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Попробуйте промокод "DISCOUNT10" для демонстрации
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
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

      {/* Модальное окно оплаты */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оплата заказа</DialogTitle>
          </DialogHeader>
          <PaymentForm 
            amount={total} 
            onSuccess={handlePaymentSuccess}
            onCancel={() => setIsPaymentOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Модальное окно успешного заказа */}
      <Dialog open={isOrderComplete} onOpenChange={setIsOrderComplete}>
        <DialogContent className="sm:max-w-md">
          <div className="py-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Заказ успешно оформлен!</h2>
            <p className="text-gray-600 mb-6">
              Ваш заказ №{Math.floor(10000 + Math.random() * 90000)} успешно оформлен и оплачен. 
              Мы свяжемся с вами в ближайшее время для уточнения деталей доставки.
            </p>
            <Button onClick={handleOrderComplete}>Вернуться на главную</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Cart;
