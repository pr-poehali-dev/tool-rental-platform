
import { Link } from "react-router-dom";
import { 
  Home, 
  ChevronRight, 
  Award, 
  Clock, 
  DollarSign, 
  Users, 
  ShieldCheck,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/ui/Layout";

const About = () => {
  // Данные о компании
  const companyStats = [
    {
      value: "5+",
      label: "лет на рынке",
      icon: <Clock className="h-8 w-8 text-primary" />,
    },
    {
      value: "1000+",
      label: "единиц техники",
      icon: <Award className="h-8 w-8 text-primary" />,
    },
    {
      value: "10000+",
      label: "клиентов",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      value: "24/7",
      label: "поддержка",
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    },
  ];

  // Преимущества компании
  const advantages = [
    {
      title: "Качественная техника",
      description: "Мы предлагаем только профессиональное оборудование ведущих производителей, прошедшее техническое обслуживание.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Быстрая доставка",
      description: "Доставляем оборудование в день заказа по городу и в течение 24 часов по области.",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      title: "Выгодные цены",
      description: "Гибкая система скидок для постоянных клиентов и при долгосрочной аренде.",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Техническая поддержка",
      description: "Наши специалисты всегда готовы проконсультировать по вопросам эксплуатации оборудования.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
      title: "Широкий ассортимент",
      description: "В нашем каталоге представлено более 1000 наименований инструментов и оборудования.",
      icon: <Award className="h-6 w-6" />,
    },
    {
      title: "Индивидуальный подход",
      description: "Мы подберем оптимальное решение под ваши задачи и бюджет.",
      icon: <Users className="h-6 w-6" />,
    },
  ];

  // FAQ
  const faqs = [
    {
      question: "Какие документы нужны для аренды?",
      answer: "Для аренды необходим паспорт гражданина РФ и денежный залог. Для юридических лиц потребуются реквизиты компании и доверенность на получение оборудования."
    },
    {
      question: "Как осуществляется доставка?",
      answer: "Доставка осуществляется нашим транспортом в согласованное время. Стоимость доставки по городу составляет 300 рублей. При аренде на сумму от 5000 рублей доставка по городу бесплатная."
    },
    {
      question: "Что делать, если инструмент сломался?",
      answer: "В случае неисправности инструмента необходимо незамедлительно связаться с нами по телефону поддержки. Если поломка произошла не по вине арендатора, мы заменим инструмент на аналогичный. В случае поломки по вине арендатора, ремонт оплачивается арендатором."
    },
    {
      question: "Можно ли продлить срок аренды?",
      answer: "Да, срок аренды можно продлить, заранее уведомив нас об этом. Для продления необходимо связаться с нами не позднее чем за 24 часа до окончания текущего срока аренды."
    },
    {
      question: "Как вернуть инструмент?",
      answer: "Инструмент можно вернуть, привезя его самостоятельно в пункт выдачи или заказав услугу вывоза. Инструмент должен быть возвращен в том же состоянии, в котором был получен."
    },
  ];

  // Команда
  const team = [
    {
      name: "Иванов Иван",
      position: "Генеральный директор",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      name: "Петрова Анна",
      position: "Руководитель отдела аренды",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      name: "Сидоров Алексей",
      position: "Главный инженер",
      photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400",
    },
    {
      name: "Козлова Елена",
      position: "Менеджер по работе с клиентами",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
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
            <BreadcrumbLink>О компании</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">О компании "ИнструментПрокат"</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Мы предоставляем профессиональный инструмент и строительное оборудование в аренду с доставкой по всему городу.
          </p>
        </div>
        
        {/* Основной раздел */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
            <p className="text-gray-600 mb-4">
              Миссия компании "ИнструментПрокат" — сделать профессиональный инструмент доступным для всех. Мы помогаем частным лицам и компаниям экономить на покупке дорогостоящего оборудования, предоставляя его в аренду на выгодных условиях.
            </p>
            <p className="text-gray-600 mb-4">
              Наш приоритет — удобство клиентов и высокое качество сервиса. Мы постоянно расширяем ассортимент и совершенствуем условия аренды, чтобы вы могли решать любые задачи эффективно и с минимальными затратами.
            </p>
            <p className="text-gray-600">
              Компания была основана в 2018 году, и за это время мы успели завоевать доверие тысяч клиентов благодаря профессиональному подходу, честным ценам и надежному оборудованию.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800" 
              alt="Наша компания" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {companyStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="flex justify-center mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Преимущества */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Наши преимущества</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-3 bg-primary/10 p-3 rounded-lg">
                    {advantage.icon}
                  </div>
                  <h3 className="font-bold text-lg">{advantage.title}</h3>
                </div>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Команда */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Наша команда</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((person, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                  <img 
                    src={person.photo} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg">{person.name}</h3>
                <p className="text-gray-600">{person.position}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Вопросы и ответы */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        
        {/* Контакты */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-gray-600 mb-6">
                Если у вас остались вопросы или вы хотите получить консультацию, свяжитесь с нами любым удобным способом.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+7 (900) 123-45-67</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>info@instrumentprokat.ru</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>г. Москва, ул. Примерная, д. 123</span>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild className="gap-2">
                  <Link to="/contacts">
                    Все контакты
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=800" 
                alt="Наш офис" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Готовы начать работу с нами?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Просмотрите наш каталог и найдите нужный инструмент или оборудование для вашего проекта.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/catalog">Перейти в каталог</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contacts">Связаться с нами</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
