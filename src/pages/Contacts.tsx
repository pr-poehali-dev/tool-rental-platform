
import Layout from "@/components/ui/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contacts = () => {
  return (
    <Layout>
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Свяжитесь с нами, чтобы арендовать инструмент или задать вопросы
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">Наши контакты</h2>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                  <p className="text-gray-700 mb-1">
                    <a href="tel:+74951234567" className="hover:text-primary">+7 (495) 123-45-67</a>
                  </p>
                  <p className="text-gray-700">
                    <a href="tel:+79031234567" className="hover:text-primary">+7 (903) 123-45-67</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Электронная почта</h3>
                  <p className="text-gray-700">
                    <a href="mailto:info@instrumentprokat.ru" className="hover:text-primary">info@instrumentprokat.ru</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                  <p className="text-gray-700">
                    ул. Строителей, 15<br />
                    Москва, Россия, 123456
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                  <p className="text-gray-700">
                    Понедельник – Пятница: 9:00 – 20:00<br />
                    Суббота – Воскресенье: 10:00 – 18:00
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Как добраться</h3>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.5887578529904!2d37.620795376942036!3d55.75184997346018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2sThe%20Kremlin!5e0!3m2!1sen!2sru!4v1651222342092!5m2!1sen!2sru"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта проезда"
                ></iframe>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Ближайшее метро: Строительная, выход №3
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-6">Связаться с нами</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Имя
                    </label>
                    <Input id="name" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Телефон
                    </label>
                    <Input id="phone" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Электронная почта
                  </label>
                  <Input id="email" type="email" placeholder="example@mail.ru" />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Тема сообщения
                  </label>
                  <Input id="subject" placeholder="Тема вашего сообщения" />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Сообщение
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Напишите ваше сообщение здесь..."
                    rows={6}
                  />
                </div>
                
                <Button className="w-full" size="lg">
                  <Send className="mr-2 h-5 w-5" /> Отправить сообщение
                </Button>
              </form>
            </div>
            
            <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg mb-4">Часто задаваемые вопросы</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Как быстро я получу ответ на свое сообщение?</h4>
                  <p className="text-gray-600 text-sm">
                    Мы стараемся отвечать на все сообщения в течение 2 часов в рабочее время.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Можно ли заказать доставку в выходные?</h4>
                  <p className="text-gray-600 text-sm">
                    Да, доставка работает и в выходные дни с 10:00 до 18:00.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Как оформить бронирование инструмента?</h4>
                  <p className="text-gray-600 text-sm">
                    Вы можете забронировать инструмент через форму на сайте, по телефону или отправив запрос через форму обратной связи.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
