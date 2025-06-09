
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/ui/Layout";
import { products } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingCart,
  Calendar,
  ArrowLeft,
  Check,
  Info,
  AlertCircle,
  Heart,
  Share2,
  Plus,
  Minus,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCart } from "@/components/cart/CartContext";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Дополнительные изображения товара
const productImages = [
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1613274554329-70f997b9d73d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1581578017093-cd30fce4edf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
];

// Отзывы о товаре
const reviews = [
  {
    id: 1,
    author: "Алексей П.",
    rating: 5,
    date: "15.04.2025",
    text: "Отличный инструмент! Взял на неделю для ремонта, всё работает безупречно. Доставка была вовремя.",
  },
  {
    id: 2,
    author: "Мария К.",
    rating: 4,
    date: "02.04.2025",
    text: "Хороший перфоратор, мощный. Единственный минус - немного тяжеловат. В целом доволен арендой.",
  },
  {
    id: 3,
    author: "Дмитрий С.",
    rating: 5,
    date: "25.03.2025",
    text: "Инструмент в отличном состоянии, как новый. Очень удобно, что есть доставка. Буду обращаться ещё.",
  },
];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id.toString() === id);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [mainImage, setMainImage] = useState(product?.image || "");
  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, rentalDays);
    }
  };

  const handleBooking = () => {
    setIsBookingOpen(false);
    toast({
      title: "Бронирование подтверждено",
      description: `${product?.name} забронирован на ${rentalDays} дней`,
      variant: "default",
    });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
      description: product?.name,
      variant: "default",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Ссылка скопирована",
      description: "Теперь вы можете поделиться товаром",
      variant: "default",
    });
  };

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <p className="mb-8">Запрашиваемый вами инструмент не существует или был удален.</p>
          <Button asChild>
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Главная</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/catalog">Каталог</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/catalog/${product.category.toLowerCase()}`}>
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-4">
          <Button asChild variant="outline" size="sm">
            <Link to="/catalog" className="flex items-center gap-2">
              <ArrowLeft size={16} /> Назад в каталог
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="overflow-hidden rounded-lg border">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-96 object-cover transition-all hover:scale-105"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2 mt-4">
              <button 
                onClick={() => setMainImage(product.image)}
                className={`rounded-md overflow-hidden border ${mainImage === product.image ? 'ring-2 ring-primary' : ''}`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} 1`}
                  className="h-20 w-full object-cover"
                />
              </button>
              {productImages.slice(0, 3).map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`rounded-md overflow-hidden border ${mainImage === img ? 'ring-2 ring-primary' : ''}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleFavorite}>
                  <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-4">{product.category}</div>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${star <= 4 ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-7.5 4.03a.5.5 0 01-.731-.532l1.442-8.376-6.094-5.95a.5.5 0 01.28-.858l8.429-1.23L10 .558l3.874 7.912 8.43 1.23a.5.5 0 01.28.858l-6.095 5.95 1.442 8.376a.5.5 0 01-.731.532L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">4.0 (12 отзывов)</span>
              <Badge variant="secondary" className="ml-4">Популярный</Badge>
            </div>
            
            <div className="text-2xl font-bold mb-6">{product.price} ₽/день</div>
            
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Описание:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Информация о залоге</AlertTitle>
                <AlertDescription>
                  Для аренды этого инструмента необходим залог в размере 5000 ₽ или документ (паспорт, водительское удостоверение).
                </AlertDescription>
              </Alert>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Количество:</h3>
              <div className="flex items-center mb-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <span className="mx-4 font-medium w-10 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Срок аренды:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {[1, 3, 7, 30].map((days) => (
                  <Button 
                    key={days}
                    variant={rentalDays === days ? "default" : "outline"}
                    onClick={() => setRentalDays(days)}
                  >
                    {days === 1 ? "1 день" : `${days} дней`}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
                <ShoppingCart size={18} /> Добавить в корзину
              </Button>
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 gap-2" size="lg">
                    <Calendar size={18} /> Забронировать
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Бронирование инструмента</DialogTitle>
                    <DialogDescription>
                      Заполните форму для бронирования инструмента на выбранные даты.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Дата начала аренды</label>
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full rounded-md border border-input px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Срок аренды</label>
                      <select 
                        className="w-full rounded-md border border-input px-3 py-2"
                        value={rentalDays}
                        onChange={(e) => setRentalDays(Number(e.target.value))}
                      >
                        <option value={1}>1 день</option>
                        <option value={3}>3 дня</option>
                        <option value={7}>7 дней</option>
                        <option value={14}>14 дней</option>
                        <option value={30}>30 дней</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Комментарий к заказу</label>
                      <textarea 
                        className="w-full rounded-md border border-input px-3 py-2 min-h-[100px]"
                        placeholder="Укажите удобное время доставки или другие пожелания"
                      ></textarea>
                    </div>
                    <div className="font-semibold text-lg">
                      Итого: {product.price * rentalDays * quantity} ₽
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleBooking}>
                      Подтвердить бронирование
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-8 flex gap-6">
              <div className="flex items-center gap-2">
                <Check size={18} className="text-green-600" />
                <span className="text-sm">В наличии</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <span className="text-sm">Доступен сейчас</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="details">Характеристики</TabsTrigger>
              <TabsTrigger value="delivery">Доставка и оплата</TabsTrigger>
              <TabsTrigger value="rental">Условия аренды</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Технические характеристики</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Бренд:</span>
                      <span className="font-medium">Bosch</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Тип:</span>
                      <span className="font-medium">Электрический</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Мощность:</span>
                      <span className="font-medium">800 Вт</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Вес:</span>
                      <span className="font-medium">2.7 кг</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Энергия удара:</span>
                      <span className="font-medium">2.3 Дж</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Частота ударов:</span>
                      <span className="font-medium">0-4000 уд/мин</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Скорость вращения:</span>
                      <span className="font-medium">0-900 об/мин</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Комплектация</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Инструмент в кейсе</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Набор сверл (3 шт)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Дополнительная рукоятка</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Инструкция по эксплуатации</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Глубиномер</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Смазка для буров</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delivery" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Доставка</h3>
                  <p className="mb-4">
                    Мы доставляем инструмент в любую точку города в течение 3 часов с момента оформления заказа.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Доставка по городу:</span>
                      <span className="font-medium">300 ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">За пределы города:</span>
                      <span className="font-medium">от 500 ₽</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Самовывоз:</span>
                      <span className="font-medium">Бесплатно</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Оплата</h3>
                  <p className="mb-4">
                    Доступны различные способы оплаты для вашего удобства.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Наличными при получении</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Банковской картой при получении</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Онлайн-оплата (банковская карта, СБП)</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={18} className="text-green-600 shrink-0" />
                      <span>Безналичный расчет для юридических лиц</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="rental" className="mt-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Условия аренды инструмента</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="font-bold">1.</span>
                    <div>
                      <p className="font-medium">Требуемые документы</p>
                      <p className="text-gray-600">
                        Для оформления аренды необходим паспорт гражданина РФ. Для юридических лиц дополнительно требуется доверенность.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">2.</span>
                    <div>
                      <p className="font-medium">Залог</p>
                      <p className="text-gray-600">
                        В качестве залога принимаются: денежные средства, паспорт, водительское удостоверение или другой документ по согласованию.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">3.</span>
                    <div>
                      <p className="font-medium">Ответственность</p>
                      <p className="text-gray-600">
                        Клиент несет полную материальную ответственность за сохранность арендуемого инструмента в период аренды.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold">4.</span>
                    <div>
                      <p className="font-medium">Продление аренды</p>
                      <p className="text-gray-600">
                        Продление срока аренды возможно по телефону, не позднее чем за 2 часа до окончания срока аренды.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Отзывы клиентов</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Написать отзыв</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Оставить отзыв</DialogTitle>
                        <DialogDescription>
                          Поделитесь своим опытом использования этого инструмента
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Оценка</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button key={star} className="text-gray-300 hover:text-yellow-400">
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 15.585l-7.5 4.03a.5.5 0 01-.731-.532l1.442-8.376-6.094-5.95a.5.5 0 01.28-.858l8.429-1.23L10 .558l3.874 7.912 8.43 1.23a.5.5 0 01.28.858l-6.095 5.95 1.442 8.376a.5.5 0 01-.731.532L10 15.585z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Ваш отзыв</label>
                          <textarea 
                            className="w-full rounded-md border border-input px-3 py-2 min-h-[100px]"
                            placeholder="Расскажите о вашем опыте использования инструмента"
                          ></textarea>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Отмена</Button>
                        <Button>Отправить отзыв</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="flex mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 15.585l-7.5 4.03a.5.5 0 01-.731-.532l1.442-8.376-6.094-5.95a.5.5 0 01.28-.858l8.429-1.23L10 .558l3.874 7.912 8.43 1.23a.5.5 0 01.28.858l-6.095 5.95 1.442 8.376a.5.5 0 01-.731.532L10 15.585z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
                
                <div className="text-center mt-4">
                  <Button variant="outline">Показать больше отзывов</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Похожие инструменты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <div key={relatedProduct.id} className="border rounded-lg overflow-hidden group">
                  <Link to={`/product/${relatedProduct.id}`} className="block">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium line-clamp-1">{relatedProduct.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{relatedProduct.category}</p>
                      <p className="font-bold">{relatedProduct.price} ₽/день</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
