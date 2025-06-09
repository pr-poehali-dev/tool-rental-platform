
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/ui/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Contacts = () => {
  const { toast } = useToast();
  
  // Состояние для формы обратной связи
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  // Состояние для ошибок валидации
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Состояние загрузки при отправке формы
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Обработчик изменения полей формы
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    
    // Сбрасываем ошибку при вводе
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Валидация формы
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!contactForm.name.trim()) errors.name = "Введите ваше имя";
    
    if (!contactForm.email.trim()) {
      errors.email = "Введите ваш email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = "Введите корректный email";
    }
    
    if (!contactForm.phone.trim()) errors.phone = "Введите ваш номер телефона";
    
    if (!contactForm.message.trim()) errors.message = "Введите ваше сообщение";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Имитация отправки данных на сервер
    try {
      // В реальном приложении здесь был бы API-запрос
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      
      // Сбрасываем форму после успешной отправки
      setContactForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Ошибка при отправке",
        description: "Пожалуйста, попробуйте позже",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Данные о филиалах компании
  const locations = [
    {
      id: "main",
      name: "Центральный офис",
      address: "г. Москва, ул. Примерная, д. 123",
      phone: "+7 (900) 123-45-67",
      email: "info@instrumentprokat.ru",
      workHours: "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
      coordinates: [55.753215, 37.622504], // Координаты для карты (Москва)
    },
    {
      id: "branch1",
      name: "Филиал на Севере",
      address: "г. Москва, ул. Северная, д. 45",
      phone: "+7 (900) 123-45-68",
      email: "north@instrumentprokat.ru",
      workHours: "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
      coordinates: [55.778655, 37.592053], // Координаты для карты
    },
    {
      id: "branch2",
      name: "Филиал на Юге",
      address: "г. Москва, ул. Южная, д. 78",
      phone: "+7 (900) 123-45-69",
      email: "south@instrumentprokat.ru",
      workHours: "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
      coordinates: [55.729853, 37.650374], // Координаты для карты
    },
  ];
  
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
            <BreadcrumbLink>Контакты</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Контакты</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом или оставьте заявку, и мы перезвоним вам в ближайшее время.
          </p>
        </div>
        
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Phone className="h-5 w-5 text-primary mr-2" />
                Телефон
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">+7 (900) 123-45-67</p>
              <p className="text-sm text-gray-500">Горячая линия</p>
              <p className="text-lg font-medium mt-2">+7 (900) 123-45-68</p>
              <p className="text-sm text-gray-500">Отдел аренды</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Mail className="h-5 w-5 text-primary mr-2" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">info@instrumentprokat.ru</p>
              <p className="text-sm text-gray-500">Общие вопросы</p>
              <p className="text-lg font-medium mt-2">support@instrumentprokat.ru</p>
              <p className="text-sm text-gray-500">Техническая поддержка</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Clock className="h-5 w-5 text-primary mr-2" />
                Режим работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">Пн-Пт: 9:00-20:00</p>
              <p className="text-lg font-medium">Сб-Вс: 10:00-18:00</p>
              <p className="text-sm text-gray-500 mt-2">Без перерывов</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Карта и информация о филиалах */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Наши офисы</h2>
          
          <Tabs defaultValue="main">
            <TabsList className="mb-6">
              {locations.map(location => (
                <TabsTrigger key={location.id} value={location.id}>
                  {location.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {locations.map(location => (
              <TabsContent key={location.id} value={location.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Адрес:</p>
                          <p className="text-gray-600">{location.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Телефон:</p>
                          <p className="text-gray-600">{location.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Email:</p>
                          <p className="text-gray-600">{location.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Режим работы:</p>
                          <p className="text-gray-600">{location.workHours}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button variant="outline" className="gap-2">
                        Построить маршрут
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg overflow-hidden h-80 md:h-auto">
                    {/* Здесь будет карта. В реальном приложении используйте компонент карты */}
                    <div className="w-full h-full flex items-center justify-center">
                      <iframe 
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.6!2d${location.coordinates[1]}!3d${location.coordinates[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzExLjYiTiAzN8KwMzcnMzMuMCJF!5e0!3m2!1sru!2sru!4v1635000000000!5m2!1sru!2sru`} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={false} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Форма обратной связи */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Обратная связь</h2>
            <p className="text-gray-600 mb-6">
              Если у вас есть вопросы или предложения, заполните форму и мы свяжемся с вами в ближайшее время.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя <span className="text-red-500">*</span></Label>
                <Input
                  id="name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  className={formErrors.name ? "border-red-500" : ""}
                />
                {formErrors.name && (
                  <p className="text-red-500 text-sm">{formErrors.name}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
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
                    value={contactForm.phone}
                    onChange={handleFormChange}
                    className={formErrors.phone ? "border-red-500" : ""}
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-sm">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение <span className="text-red-500">*</span></Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={handleFormChange}
                  className={formErrors.message ? "border-red-500" : ""}
                />
                {formErrors.message && (
                  <p className="text-red-500 text-sm">{formErrors.message}</p>
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-4">
                  Нажимая кнопку "Отправить", вы соглашаетесь с <Link to="/policy" className="text-primary hover:underline">политикой конфиденциальности</Link>.
                </p>
                <Button type="submit" className="gap-2" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Отправить
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800" 
              alt="Поддержка клиентов" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex flex-col justify-center p-8">
              <h3 className="text-white text-2xl font-bold mb-4">Служба поддержки</h3>
              <p className="text-white/80 mb-6">
                Наши специалисты всегда готовы помочь вам с выбором инструмента и ответить на все ваши вопросы.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MessageCircle className="text-white h-5 w-5 mr-3" />
                  <span className="text-white">Онлайн-чат на сайте</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-white h-5 w-5 mr-3" />
                  <span className="text-white">+7 (900) 123-45-67</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Остались вопросы?</h2>
          <p className="text-gray-600 mb-6">
            Посетите раздел часто задаваемых вопросов или свяжитесь с нами.
          </p>
          <Button asChild className="gap-2">
            <Link to="/about#faq">
              Перейти к FAQ
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Contacts;
