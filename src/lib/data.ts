
import { Product } from "@/components/ProductCard";

export const products: Product[] = [
  {
    id: 1,
    name: "Перфоратор Bosch GBH 2-26",
    description: "Мощный перфоратор для бурения и долбления. Три режима работы: сверление, сверление с ударом, долбление.",
    price: 500,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Электроинструмент"
  },
  {
    id: 2,
    name: "Шуруповерт Makita DDF456Z",
    description: "Аккумуляторный шуруповерт с высоким крутящим моментом и двухскоростным редуктором.",
    price: 350,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Электроинструмент"
  },
  {
    id: 3,
    name: "Бетономешалка ЗУБР БС-120",
    description: "Бетономешалка с объемом барабана 120 литров для приготовления растворов.",
    price: 800,
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4edf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Строительное оборудование"
  },
  {
    id: 4,
    name: "Углошлифовальная машина DeWalt DWE4257",
    description: "Мощная болгарка с регулировкой оборотов и защитой от перегрузки.",
    price: 400,
    image: "https://images.unsplash.com/photo-1613274554329-70f997b9d73d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Электроинструмент"
  },
  {
    id: 5,
    name: "Лестница-стремянка 5 ступеней",
    description: "Алюминиевая стремянка с широкими ступенями и платформой.",
    price: 200,
    image: "https://images.unsplash.com/photo-1598301257982-0cf014dabbcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Лестницы и стремянки"
  },
  {
    id: 6,
    name: "Генератор бензиновый CHAMPION GG3300",
    description: "Надежный генератор мощностью 3 кВт для автономного электроснабжения.",
    price: 1200,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    category: "Генераторы"
  }
];

export const categories = [
  "Электроинструмент",
  "Строительное оборудование",
  "Лестницы и стремянки",
  "Генераторы",
  "Садовый инструмент",
  "Измерительный инструмент"
];
