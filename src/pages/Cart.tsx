
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  Home,
  ChevronRight,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/components/cart/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { Layout } from "@/components/ui/Layout";

// Шаги оформления заказа
enum CheckoutStep {
  CART = "cart",
  SHIPPING = "shipping",
  PAYMENT = "payment",
  CONFIRMATION = "confirmation"
}

// Типы доставки
enum DeliveryType {
  PICKUP = "pickup",
  COURIER = "courier"
}

// Типы оплаты
enum PaymentMethod {
  CARD = "card",
  CASH = "cash",
  SBP = "sbp"
}

// Интерфейс формы заказа
interface OrderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deliveryType: DeliveryType;
  address: string;
  city: string;
  zipCode: string;
  paymentMethod: PaymentMethod;
  comments: string;
  agreement: boolean;
}

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    updateDays, 
    clearCart, 
    subtotal, 
    total, 
    deliveryFee 
  } = useCart();
  
  // Состояние для оформления заказа
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.CART);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    deliveryType: DeliveryType.COURIER,
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: PaymentMethod.CARD,
    comments: "",
    agreement: false
  });
  
  // Валидация формы
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleDaysChange = (productId: number, newDays: string | number) => {
    const days = typeof newDays === 'string' ? parseInt(newDays) : newDays;
    if (days >= 1) {
      updateDays(productId, days);
    }
  };
  
  const proceedToCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину перед оформлением заказа",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep(CheckoutStep.SHIPPING);
  };
  
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setOrderForm(prev => ({ ...prev, [name]: value }));
    
    // Сбрасываем ошибку при вводе
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setOrderForm(prev => ({ ...prev, [name]: checked }));
    
    // Сбрасываем ошибку при изменении
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleDeliveryTypeChange = (value: DeliveryType) => {
    setOrderForm(prev => ({ ...prev, deliveryType: value }));
  };
  
  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setOrderForm(prev => ({ ...prev, paymentMethod: value }));
  };
  
  const validateShippingForm = () => {
    const errors: Record<string, string> = {};
    
    if (!orderForm.firstName.trim()) errors.firstName = "Введите имя";
    if (!orderForm.lastName.trim()) errors.lastName = "Введите фамилию";
    if (!orderForm.email.trim()) errors.email = "Введите email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderForm.email)) 
      errors.email = "Введите корректный email";
    
    if (!orderForm.phone.trim()) errors.phone = "Введите номер телефона";
    
    if (orderForm.deliveryType === DeliveryType.COURIER) {
      if (!orderForm.address.trim()) errors.address = "Введите адрес доставки";
      if (!orderForm.city.trim()) errors.city = "Введите город";
      if (!orderForm.zipCode.trim()) errors.zipCode = "Введите индекс";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validatePaymentForm = () => {
    const errors: Record<string, string> = {};
    
    if (!orderForm.agreement) 
      errors.agreement = "Необходимо согласиться с условиями";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const proceedToPayment = () => {
    if (validateShippingForm()) {
      setCurrentStep(CheckoutStep.PAYMENT);
    }
  };
  
  const proceedToConfirmation = () => {
    if (validatePaymentForm()) {
      setCurrentStep(CheckoutStep.CONFIRMATION);
    }
  };
  
  const placeOrder = () => {
    // Здесь будет логика отправки заказа на сервер
    
    // Симулируем успешное оформление заказа
    toast({
      title: "Заказ успешно оформлен",
      description: "Номер вашего заказа: #" + Math.floor(10000 + Math.random() * 90000),
    });
    
    // Очищаем корзину
    clearCart();
    
    // Редирект на главную
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  
  const goBack = () => {
    if (currentStep === CheckoutStep.SHIPPING) {
      setCurrentStep(CheckoutStep.CART);
    } else if (currentStep === CheckoutStep.PAYMENT) {
      setCurrentStep(CheckoutStep.SHIPPING);
    } else if (currentStep === CheckoutStep.CONFIRMATION) {
      setCurrentStep(CheckoutStep.PAYMENT);
    }
  };
  
  // Рендеринг шагов оформления заказа
  const renderCheckoutSteps = () => {
    const steps = [
      { id: CheckoutStep.CART, label: "Корзина" },
      { id: CheckoutStep.SHIPPING, label: "Доставка" },
      { id: CheckoutStep.PAYMENT, label: "Оплата" },
      { id: CheckoutStep.CONFIRMATION, label: "Подтверждение" }
    ];
    
    return (
      <div className="mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${
                  currentStep === step.id 
                    ? "bg-primary text-white border-primary" 
                    : currentStep > step.id
                    ? "bg-primary/20 border-primary/20"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <div 
                className="mx-2 text-sm hidden sm:block"
              >
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={`w-8 sm:w-16 h-0.5 ${
                    currentStep > step.id
                      ? "bg-primary/60"
                      : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Рендеринг корзины
  const renderCart = () => {
    if (items.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Ваша корзина пуста</h2>
          <p className="text-gray-600 mb-6">
            Добавьте товары в корзину, чтобы продолжить оформление заказа
          </p>
          <Button asChild>
            <Link to="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      );
    }
    
    return (
      <>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Товары в корзине</h2>
          </div>
          
          <div className="divide-y">
            {items.map((item) => (
              <div key={item.product.id} className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-md overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between gap-2">
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/product/${item.product.id}`} className="hover:text-primary">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {item.product.price * item.quantity * item.days} ₽
                        </div>
                        <div className="text-sm text-gray-500">
                          {item.product.price} ₽/день × {item.quantity} шт. × {item.days} {item.days === 1 ? 'день' : (item.days >= 2 && item.days <= 4) ? 'дня' : 'дней'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 mx-1 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div>
                          <Select
                            value={item.days.toString()}
                            onValueChange={(value) => handleDaysChange(item.product.id, value)}
                          >
                            <SelectTrigger className="h-8 w-24">
                              <SelectValue placeholder="Дни" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 день</SelectItem>
                              <SelectItem value="3">3 дня</SelectItem>
                              <SelectItem value="7">7 дней</SelectItem>
                              <SelectItem value="14">14 дней</SelectItem>
                              <SelectItem value="30">30 дней</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 px-2 -mx-2"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        <span>Удалить</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Подытог:</span>
              <span>{subtotal} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>{deliveryFee} ₽</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Итого:</span>
              <span>{total} ₽</span>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-3">
            <Button
              variant="outline"
              asChild
            >
              <Link to="/catalog">Продолжить покупки</Link>
            </Button>
            <Button
              onClick={proceedToCheckout}
              className="gap-2"
            >
              Оформить заказ
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
    );
  };
  
  // Рендеринг формы доставки
  const renderShipping = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Информация о доставке</CardTitle>
              <CardDescription>Укажите данные для доставки заказа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя <span className="text-red-500">*</span></Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={orderForm.firstName}
                    onChange={handleFormChange}
                    className={formErrors.firstName ? "border-red-500" : ""}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия <span className="text-red-500">*</span></Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={orderForm.lastName}
                    onChange={handleFormChange}
                    className={formErrors.lastName ? "border-red-500" : ""}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={orderForm.email}
                    onChange={handleFormChange}
                    className={formErrors.email ? "border-red-500" : ""}
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={orderForm.phone}
                    onChange={handleFormChange}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Способ доставки</h3>
                <RadioGroup
                  defaultValue={orderForm.deliveryType}
                  onValueChange={(value) => handleDeliveryTypeChange(value as DeliveryType)}
                >
                  <div className="flex items-start space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value={DeliveryType.COURIER} id="courier" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="courier" className="font-medium">
                        Доставка курьером
                      </Label>
                      <p className="text-sm text-gray-500">
                        Доставка по городу в течение 24 часов
                      </p>
                    </div>
                    <div className="ml-auto font-medium">300 ₽</div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value={DeliveryType.PICKUP} id="pickup" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="pickup" className="font-medium">
                        Самовывоз
                      </Label>
                      <p className="text-sm text-gray-500">
                        Из пункта выдачи по адресу ул. Примерная, д. 123
                      </p>
                    </div>
                    <div className="ml-auto font-medium">Бесплатно</div>
                  </div>
                </RadioGroup>
              </div>
              
              {orderForm.deliveryType === DeliveryType.COURIER && (
                <div className="space-y-4">
                  <h3 className="font-medium">Адрес доставки</h3>
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес <span className="text-red-500">*</span></Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Улица, дом, квартира"
                      value={orderForm.address}
                      onChange={handleFormChange}
                      className={formErrors.address ? "border-red-500" : ""}
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Город <span className="text-red-500">*</span></Label>
                      <Input
                        id="city"
                        name="city"
                        value={orderForm.city}
                        onChange={handleFormChange}
                        className={formErrors.city ? "border-red-500" : ""}
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm">{formErrors.city}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Индекс <span className="text-red-500">*</span></Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={orderForm.zipCode}
                        onChange={handleFormChange}
                        className={formErrors.zipCode ? "border-red-500" : ""}
                      />
                      {formErrors.zipCode && (
                        <p className="text-red-500 text-sm">{formErrors.zipCode}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="comments">Комментарий к заказу</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  placeholder="Дополнительная информация по заказу"
                  value={orderForm.comments}
                  onChange={handleFormChange}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium line-clamp-1">{item.product.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.quantity} шт. × {item.days} {item.days === 1 ? 'день' : (item.days >= 2 && item.days <= 4) ? 'дня' : 'дней'}
                      </div>
                      <div className="font-medium">{item.product.price * item.quantity * item.days} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Подытог:</span>
                  <span>{subtotal} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{orderForm.deliveryType === DeliveryType.PICKUP ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  
                  <span>Итого:</span>
                  <span>{orderForm.deliveryType === DeliveryType.PICKUP ? subtotal : total} ₽</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={proceedToPayment} className="w-full gap-2">
                Перейти к оплате
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goBack} className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Вернуться к корзине
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  
  // Рендеринг формы оплаты
  const renderPayment = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Способ оплаты</CardTitle>
              <CardDescription>Выберите удобный способ оплаты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <RadioGroup
                  defaultValue={orderForm.paymentMethod}
                  onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)}
                >
                  <div className="flex items-start space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value={PaymentMethod.CARD} id="card" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="card" className="font-medium">
                        Оплата картой
                      </Label>
                      <p className="text-sm text-gray-500">
                        Visa, Mastercard, Мир
                      </p>
                    </div>
                    <div className="ml-auto">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value={PaymentMethod.CASH} id="cash" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="cash" className="font-medium">
                        Оплата при получении
                      </Label>
                      <p className="text-sm text-gray-500">
                        Наличными или картой курьеру
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-md border">
                    <RadioGroupItem value={PaymentMethod.SBP} id="sbp" />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="sbp" className="font-medium">
                        СБП
                      </Label>
                      <p className="text-sm text-gray-500">
                        Система быстрых платежей
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              {orderForm.paymentMethod === PaymentMethod.CARD && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-600">
                    При нажатии на кнопку "Подтвердить заказ" вы будете перенаправлены на страницу оплаты.
                  </p>
                </div>
              )}
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreement"
                  checked={orderForm.agreement}
                  onCheckedChange={(checked) => handleCheckboxChange('agreement', !!checked)}
                  className={formErrors.agreement ? "border-red-500" : ""}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="agreement"
                    className={`text-sm ${formErrors.agreement ? "text-red-500" : ""}`}
                  >
                    Я согласен с <Link to="/terms" className="text-primary hover:underline">условиями аренды</Link> и <Link to="/policy" className="text-primary hover:underline">политикой конфиденциальности</Link>
                  </Label>
                  {formErrors.agreement && (
                    <p className="text-red-500 text-sm">{formErrors.agreement}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Ваш заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-64 overflow-y-auto space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium line-clamp-1">{item.product.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.quantity} шт. × {item.days} {item.days === 1 ? 'день' : (item.days >= 2 && item.days <= 4) ? 'дня' : 'дней'}
                      </div>
                      <div className="font-medium">{item.product.price * item.quantity * item.days} ₽</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Подытог:</span>
                  <span>{subtotal} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{orderForm.deliveryType === DeliveryType.PICKUP ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span>{orderForm.deliveryType === DeliveryType.PICKUP ? subtotal : total} ₽</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button onClick={proceedToConfirmation} className="w-full gap-2">
                Подтвердить заказ
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goBack} className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Вернуться к доставке
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  };
  
  // Рендеринг подтверждения заказа
  const renderConfirmation = () => {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Подтверждение заказа</CardTitle>
          <CardDescription>
            Пожалуйста, проверьте информацию о заказе перед подтверждением
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">Контактная информация</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500">Имя:</span>
                <span className="font-medium">{orderForm.firstName} {orderForm.lastName}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">{orderForm.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500">Телефон:</span>
                <span className="font-medium">{orderForm.phone}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Способ доставки</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              {orderForm.deliveryType === DeliveryType.PICKUP ? (
                <div className="flex gap-2 items-start">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Самовывоз</p>
                    <p className="text-sm text-gray-600">Из пункта выдачи по адресу ул. Примерная, д. 123</p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 items-start">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Доставка курьером (300 ₽)</p>
                    <p className="text-sm text-gray-600">
                      {orderForm.address}, {orderForm.city}, {orderForm.zipCode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Способ оплаты</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              <div className="flex gap-2 items-center">
                {orderForm.paymentMethod === PaymentMethod.CARD && (
                  <>
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <p className="font-medium">Оплата картой</p>
                  </>
                )}
                {orderForm.paymentMethod === PaymentMethod.CASH && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                    <p className="font-medium">Оплата при получении</p>
                  </>
                )}
                {orderForm.paymentMethod === PaymentMethod.SBP && (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    <p className="font-medium">СБП</p>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="font-medium">Товары в заказе</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium line-clamp-1">{item.product.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.quantity} шт. × {item.days} {item.days === 1 ? 'день' : (item.days >= 2 && item.days <= 4) ? 'дня' : 'дней'}
                    </div>
                    <div className="font-medium">{item.product.price * item.quantity * item.days} ₽</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="flex justify-between">
              <span>Подытог:</span>
              <span>{subtotal} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>{orderForm.deliveryType === DeliveryType.PICKUP ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Итого к оплате:</span>
              <span>{orderForm.deliveryType === DeliveryType.PICKUP ? subtotal : total} ₽</span>
            </div>
          </div>
          
          {orderForm.comments && (
            <div className="space-y-2">
              <h3 className="font-medium">Комментарий к заказу</h3>
              <p className="text-sm text-gray-600">{orderForm.comments}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={goBack} className="sm:flex-1 w-full sm:w-auto gap-2">
            <ArrowLeft className="h-4 w-4" />
            Вернуться к оплате
          </Button>
          <Button onClick={placeOrder} className="sm:flex-1 w-full sm:w-auto">
            Подтвердить и оформить заказ
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        {/* Хлебные крошки */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center">
                <Home className="h-4 w-4 mr-1" />
                <span>Главная</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>Корзина</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {currentStep === CheckoutStep.CART && "Корзина"}
            {currentStep === CheckoutStep.SHIPPING && "Доставка"}
            {currentStep === CheckoutStep.PAYMENT && "Оплата"}
            {currentStep === CheckoutStep.CONFIRMATION && "Подтверждение заказа"}
          </h1>
          <Badge variant="outline" className="text-sm">
            {items.length} {items.length === 1 ? 'товар' : (items.length >= 2 && items.length <= 4) ? 'товара' : 'товаров'}
          </Badge>
        </div>
        
        {/* Шаги оформления заказа */}
        {renderCheckoutSteps()}
        
        {/* Содержимое текущего шага */}
        {currentStep === CheckoutStep.CART && renderCart()}
        {currentStep === CheckoutStep.SHIPPING && renderShipping()}
        {currentStep === CheckoutStep.PAYMENT && renderPayment()}
        {currentStep === CheckoutStep.CONFIRMATION && renderConfirmation()}
      </div>
    </Layout>
  );
};

export default Cart;
