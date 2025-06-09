
import Layout from "@/components/ui/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Award, Users, Star, HeartHandshake } from "lucide-react";

const About = () => {
  return (
    <Layout>
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">О нашей компании</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Мы предлагаем аренду профессионального инструмента для строителей,
            ремонтников и частных мастеров с 2010 года.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Кто мы</h2>
            <p className="text-gray-700 mb-4">
              Компания «ИнструментПрокат» была основана в 2010 году группой профессиональных строителей, 
              которые на собственном опыте знали, как важно иметь доступ к качественному инструменту.
            </p>
            <p className="text-gray-700 mb-4">
              Наша миссия — сделать профессиональный инструмент доступным для всех, 
              кто в нем нуждается, будь то крупная строительная компания или частный мастер.
            </p>
            <p className="text-gray-700">
              За 14 лет работы мы обслужили более 50 000 клиентов и собрали парк из 3000+ единиц инструмента 
              от ведущих мировых производителей.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Наша команда" 
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Наши преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <Award className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Качественный инструмент</h3>
              <p className="text-gray-600">
                Только профессиональные инструменты от проверенных производителей с регулярным техобслуживанием.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Опытные специалисты</h3>
              <p className="text-gray-600">
                Наши консультанты помогут подобрать инструмент под ваши задачи и дадут рекомендации по использованию.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <HeartHandshake className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Гибкие условия</h3>
              <p className="text-gray-600">
                Аренда от 1 дня до нескольких месяцев с возможностью продления. Доставка и самовывоз.
              </p>
            </div>
          </div>
        </div>

        <div className="my-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Алексей Иванов" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Алексей Иванов</h3>
              <p className="text-gray-600">Генеральный директор</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Елена Петрова" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Елена Петрова</h3>
              <p className="text-gray-600">Руководитель отдела аренды</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Дмитрий Сидоров" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Дмитрий Сидоров</h3>
              <p className="text-gray-600">Технический специалист</p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                  alt="Мария Козлова" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Мария Козлова</h3>
              <p className="text-gray-600">Менеджер по работе с клиентами</p>
            </div>
          </div>
        </div>

        <div className="my-16 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
          <Tabs defaultValue="rent">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="rent">Аренда</TabsTrigger>
              <TabsTrigger value="payment">Оплата</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
            </TabsList>
            <TabsContent value="rent">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Как арендовать инструмент?</h3>
                  <p className="text-gray-700">
                    Вы можете выбрать инструмент на сайте, добавить его в корзину и оформить заказ. 
                    Также можно позвонить нам, и мы поможем подобрать нужный инструмент и оформим заказ по телефону.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Какие документы нужны для аренды?</h3>
                  <p className="text-gray-700">
                    Для аренды инструмента необходим паспорт гражданина РФ. Для юридических лиц дополнительно требуется доверенность.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Какой залог требуется?</h3>
                  <p className="text-gray-700">
                    В качестве залога принимаются: денежные средства, паспорт, водительское удостоверение или другой документ по согласованию.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="payment">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Какие способы оплаты вы принимаете?</h3>
                  <p className="text-gray-700">
                    Мы принимаем наличные, банковские карты, онлайн-платежи и безналичный расчет для юридических лиц.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Когда нужно оплачивать аренду?</h3>
                  <p className="text-gray-700">
                    Оплата производится в момент получения инструмента. При продлении срока аренды нужно оплатить дополнительные дни.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Есть ли у вас скидки?</h3>
                  <p className="text-gray-700">
                    Да, мы предоставляем скидки при долгосрочной аренде. Также действуют специальные предложения для постоянных клиентов.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="delivery">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">Вы доставляете инструмент?</h3>
                  <p className="text-gray-700">
                    Да, мы предлагаем доставку по городу и области. Стоимость доставки по городу — 300 рублей, за пределы города — от 500 рублей.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Сколько времени занимает доставка?</h3>
                  <p className="text-gray-700">
                    Доставка по городу осуществляется в течение 3 часов после оформления заказа. Точное время доставки согласовывается с менеджером.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Можно ли самостоятельно забрать инструмент?</h3>
                  <p className="text-gray-700">
                    Да, вы можете забрать инструмент самостоятельно из нашего пункта выдачи по адресу: ул. Строителей, 15. Самовывоз бесплатный.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы сотрудничать?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Свяжитесь с нами, чтобы узнать больше о наших услугах или оформить аренду инструмента.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/contacts">Контакты</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/catalog">Каталог инструментов</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
