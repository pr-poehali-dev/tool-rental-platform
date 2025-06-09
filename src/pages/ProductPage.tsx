
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ChevronRight, 
  ShoppingCart, 
  Heart, 
  Share, 
  Clock, 
  Star, 
  ShieldCheck, 
  Truck,
  Home,
  Minus,
  Plus,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/components/cart/CartContext";
import { products as mockProducts } from "@/lib/data";
import { Layout } from "@/components/ui/Layout";

interface ProductAttribute {
  name: string;
  value: string;
}

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  images: string[];
  stock: number;
  isAvailable: boolean;
  attributes: ProductAttribute[];
  reviews: {
    id: number;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
  relatedProducts: number[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [rentalDays, setRentalDays] = useState(1);
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // В реальном приложении здесь был бы API запрос
        // Имитируем загрузку данных
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const productId = parseInt(id || "0");
        const foundProduct = mockProducts.find(p => p.id === productId);
        
        if (!foundProduct) {
          setError("Товар не найден");
          setLoading(false);
          return;
        }
        
        // Расширяем данные о товаре для демонстрации
        const productDetail: ProductDetail = {
          ...foundProduct,
          images: [
            foundProduct.image,
            "https://images.unsplash.com/photo-1573766689362-3cd9e496e476?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550441251-724d3d04e5e9?w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1545273125-181e9211572f?w=800&auto=format&fit=crop"
          ],
          stock: 5,
          isAvailable: true,
          attributes: [
            { name: "Вес", value: "2.5 кг" },
            { name: "Мощность", value: "800 Вт" },
            { name: "Аккумулятор", value: "Li-ion 18V" },
            { name: "Гарантия", value: "12 месяцев" },
            { name: "Комплектация", value: "Инструмент, кейс, зарядное устройство, 2 аккумулятора" }
          ],
          reviews: [
            {
              id: 1,
              rating: 5,
              comment: "Отличный инструмент, удобный и мощный. Рекомендую всем, кто занимается ремонтом.",
              author: "Алексей П.",
              date: "15.04.2025"
            },
            {
              id: 2,
              rating: 4,
              comment: "Хороший инструмент за свои деньги. Есть небольшие недочеты, но в целом все отлично.",
              author: "Мария С.",
              date: "03.04.2025"
            }
          ],
          relatedProducts: [1, 2, 3].filter(relId => relId !== productId)
        };
        
        setProduct(productDetail);
        setMainImage(productDetail.image);
        
        // Загружаем связанные товары
        const related = mockProducts.filter(p => 
          productDetail.relatedProducts.includes(p.id)
        ).slice(0, 4);
        
        setRelatedProducts(related);
        
        setLoading(false);
      } catch (err) {
        setError("Произошла ошибка при загрузке товара");
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    // Конвертируем наш детальный продукт в формат, который ожидает корзина
    const cartProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category
    };
    
    addToCart(cartProduct, quantity, rentalDays);
    
    toast({
      title: "Товар добавлен в корзину",
      description: `${product.name} (${quantity} шт.) на ${rentalDays} ${getRentalDaysText(rentalDays)}`,
    });
  };
  
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };
  
  // Функция для склонения слова "день"
  const getRentalDaysText = (days: number) => {
    if (days % 10 === 1 && days % 100 !== 11) {
      return "день";
    } else if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100)) {
      return "дня";
    } else {
      return "дней";
    }
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-12 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ошибка</h2>
          <p className="mb-6">{error || "Товар не найден"}</p>
          <Button asChild>
            <Link to="/catalog">Вернуться в каталог</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
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
            <BreadcrumbLink asChild>
              <Link to="/catalog">Каталог</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink>{product.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded cursor-pointer overflow-hidden border ${mainImage === image ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleImageClick(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - вид ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star}
                      className={`h-4 w-4 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.reviews.length} отзывов</span>
              </div>
            </div>
            
            <div>
              <Badge variant="outline" className="text-sm font-medium">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600 font-medium">
                  В наличии: {product.stock} шт.
                </span>
              </div>
            </div>
            
            <div>
              <div className="text-3xl font-bold">{product.price} ₽/день</div>
              <div className="text-sm text-gray-500 mt-1">Стоимость аренды за 1 день</div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Количество</label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 mx-2 text-center"
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Срок аренды</label>
                <Select 
                  value={rentalDays.toString()} 
                  onValueChange={(value) => setRentalDays(parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите срок аренды" />
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
            
            <div className="text-xl font-bold">
              Итого: {product.price * quantity * rentalDays} ₽
              <span className="text-sm font-normal text-gray-500 ml-2">
                за {rentalDays} {getRentalDaysText(rentalDays)}
              </span>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              <Button size="lg" className="gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                В корзину
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Heart className="h-5 w-5" />
                В избранное
              </Button>
              <Button size="lg" variant="ghost" className="gap-2">
                <Share className="h-5 w-5" />
                Поделиться
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Доставка</h3>
                    <p className="text-sm text-gray-600">Доставка по городу в день заказа</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">Гарантия</h3>
                    <p className="text-sm text-gray-600">Гарантия на весь срок аренды</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Табы с информацией */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание</TabsTrigger>
              <TabsTrigger value="specs">Характеристики</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({product.reviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-4 mt-4 bg-white rounded-lg border">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <p>
                  Профессиональный инструмент для ремонтных работ подходит для использования в домашних условиях и на строительных объектах. 
                  Идеально подойдет для сверления отверстий в различных материалах, а также для закручивания и откручивания крепежных элементов.
                </p>
                <h3>Особенности</h3>
                <ul>
                  <li>Высокая мощность и производительность</li>
                  <li>Эргономичная рукоятка с резиновыми вставками</li>
                  <li>Быстрозажимной патрон для быстрой смены оснастки</li>
                  <li>Регулировка скорости вращения</li>
                  <li>Компактный размер и небольшой вес</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="p-4 mt-4 bg-white rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                {product.attributes.map((attr, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="font-medium min-w-32">{attr.name}:</span>
                    <span>{attr.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-4 mt-4 bg-white rounded-lg border">
              <div className="space-y-6">
                {product.reviews.map(review => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{review.author}</h3>
                        <div className="flex mt-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
                
                <div className="text-center">
                  <Button>Оставить отзыв</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Связанные товары */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name} 
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1 line-clamp-1">{relatedProduct.name}</h3>
                    <p className="text-lg font-bold">{relatedProduct.price} ₽/день</p>
                    <div className="mt-3">
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/product/${relatedProduct.id}`}>Подробнее</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductPage;
