
import { useParams, Link } from "react-router-dom";
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
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id.toString() === id);

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
          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-sm text-gray-500 mb-4">{product.category}</div>
            
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
              <h3 className="font-semibold mb-2">Срок аренды:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline">1 день</Button>
                <Button variant="outline">3 дня</Button>
                <Button variant="outline">7 дней</Button>
                <Button variant="outline">30 дней</Button>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
              <Button className="flex-1 gap-2" size="lg">
                <ShoppingCart size={18} /> Добавить в корзину
              </Button>
              <Button variant="outline" className="flex-1 gap-2" size="lg">
                <Calendar size={18} /> Забронировать
              </Button>
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
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
