
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Circle,
  Home,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Layout } from "@/components/ui/Layout";
import ProductCard from "@/components/ProductCard";
import { products as mockProducts, categories as mockCategories } from "@/lib/data";
import { useCart } from "@/components/cart/CartContext";

// Интерфейсы для фильтров и сортировки
interface FilterState {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  search: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "name-asc", label: "Название: А-Я" },
  { value: "name-desc", label: "Название: Я-А" },
];

const Catalog = () => {
  // Состояния для фильтров и параметров каталога
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sorts] = useState<SortOption[]>(sortOptions);
  const [categories] = useState<string[]>(mockCategories);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    inStock: false,
    search: "",
  });
  const [tempFilters, setTempFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 5000],
    inStock: false,
    search: "",
  });
  const [sort, setSort] = useState<string>("price-asc");
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  // Определяем минимальную и максимальную цену для слайдера
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // Загрузка товаров с учетом фильтров, сортировки и пагинации
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Имитация задержки сети
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Фильтрация товаров
        let filteredProducts = [...mockProducts];
        
        // Поиск по названию
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchLower) ||
            product.description.toLowerCase().includes(searchLower)
          );
        }
        
        // Фильтр по категориям
        if (filters.categories.length > 0) {
          filteredProducts = filteredProducts.filter(product => 
            filters.categories.includes(product.category)
          );
        }
        
        // Фильтр по цене
        filteredProducts = filteredProducts.filter(product => 
          product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
        );
        
        // Сортировка
        if (sort) {
          const [field, direction] = sort.split("-");
          filteredProducts.sort((a, b) => {
            if (field === "price") {
              return direction === "asc" 
                ? a.price - b.price 
                : b.price - a.price;
            } else if (field === "name") {
              return direction === "asc" 
                ? a.name.localeCompare(b.name) 
                : b.name.localeCompare(a.name);
            }
            return 0;
          });
        }
        
        // Пагинация
        const total = filteredProducts.length;
        const totalPages = Math.ceil(total / pagination.limit);
        
        const start = (pagination.page - 1) * pagination.limit;
        const end = start + pagination.limit;
        const paginatedProducts = filteredProducts.slice(start, end);
        
        setProducts(paginatedProducts);
        setPagination({
          ...pagination,
          total,
          totalPages,
        });
        
        setLoading(false);
      } catch (err) {
        setError("Произошла ошибка при загрузке товаров");
        setLoading(false);
        console.error(err);
      }
    };
    
    fetchProducts();
  }, [filters, sort, pagination.page, pagination.limit]);

  // Определяем минимальную и максимальную цену среди всех товаров при первой загрузке
  useEffect(() => {
    if (mockProducts.length > 0) {
      const prices = mockProducts.map(product => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
      setFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
      setTempFilters(prev => ({
        ...prev,
        priceRange: [minPrice, maxPrice]
      }));
    }
  }, []);

  // Обработчики изменения фильтров
  const handleCategoryChange = (category: string) => {
    setTempFilters(prev => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category];
      
      return { ...prev, categories };
    });
  };

  const handlePriceChange = (values: number[]) => {
    setTempFilters(prev => ({
      ...prev,
      priceRange: [values[0], values[1]]
    }));
  };

  const handleInStockChange = (checked: boolean) => {
    setTempFilters(prev => ({
      ...prev,
      inStock: checked
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
    
    // Сбрасываем страницу при поиске
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      page
    }));
    
    // Прокручиваем страницу наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    setIsMobileFiltersOpen(false);
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const resetFilters = () => {
    const resetState = {
      categories: [],
      priceRange,
      inStock: false,
      search: "",
    };
    
    setTempFilters(resetState);
    setFilters(resetState);
    setPagination(prev => ({
      ...prev,
      page: 1
    }));
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  // Расчет активных фильтров для отображения
  const activeFiltersCount = 
    filters.categories.length + 
    (filters.inStock ? 1 : 0) + 
    (filters.search ? 1 : 0);

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
            <BreadcrumbLink>Каталог</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Боковая панель фильтров (десктоп) */}
          <div className="w-full md:w-64 hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Фильтры</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs h-8 px-2"
                >
                  Сбросить
                </Button>
              </div>
              
              <Accordion type="multiple" defaultValue={["categories", "price"]} className="space-y-4">
                <AccordionItem value="categories" className="border-none">
                  <AccordionTrigger className="py-2 px-0">
                    <span className="text-sm font-medium">Категории</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={filters.categories.includes(category)}
                            onCheckedChange={() => {
                              setFilters(prev => {
                                const updatedCategories = prev.categories.includes(category)
                                  ? prev.categories.filter(c => c !== category)
                                  : [...prev.categories, category];
                                
                                return { ...prev, categories: updatedCategories };
                              });
                              setPagination(prev => ({ ...prev, page: 1 }));
                            }}
                          />
                          <Label
                            htmlFor={`category-${category}`}
                            className="text-sm cursor-pointer"
                          >
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="price" className="border-none">
                  <AccordionTrigger className="py-2 px-0">
                    <span className="text-sm font-medium">Цена</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={filters.priceRange}
                        min={priceRange[0]}
                        max={priceRange[1]}
                        step={100}
                        value={filters.priceRange}
                        onValueChange={(values) => {
                          setFilters(prev => ({
                            ...prev,
                            priceRange: [values[0], values[1]]
                          }));
                          setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          {filters.priceRange[0]} ₽
                        </div>
                        <div className="text-sm">
                          {filters.priceRange[1]} ₽
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="availability" className="border-none">
                  <AccordionTrigger className="py-2 px-0">
                    <span className="text-sm font-medium">Наличие</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="in-stock" 
                        checked={filters.inStock}
                        onCheckedChange={(checked) => {
                          setFilters(prev => ({
                            ...prev,
                            inStock: checked as boolean
                          }));
                          setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                      />
                      <Label
                        htmlFor="in-stock"
                        className="text-sm cursor-pointer"
                      >
                        Только в наличии
                      </Label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Основной контент каталога */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Поиск товаров..." 
                    className="pl-10"
                    value={filters.search}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Select value={sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder="Сортировка" />
                    </SelectTrigger>
                    <SelectContent>
                      {sorts.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                      >
                        <Filter className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                      <SheetHeader>
                        <SheetTitle>Фильтры</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <Accordion type="multiple" defaultValue={["categories", "price"]} className="space-y-4">
                          <AccordionItem value="categories" className="border-none">
                            <AccordionTrigger className="py-2 px-0">
                              <span className="text-sm font-medium">Категории</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2">
                                {categories.map((category) => (
                                  <div key={category} className="flex items-center space-x-2">
                                    <Checkbox 
                                      id={`mobile-category-${category}`} 
                                      checked={tempFilters.categories.includes(category)}
                                      onCheckedChange={() => handleCategoryChange(category)}
                                    />
                                    <Label
                                      htmlFor={`mobile-category-${category}`}
                                      className="text-sm cursor-pointer"
                                    >
                                      {category}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="price" className="border-none">
                            <AccordionTrigger className="py-2 px-0">
                              <span className="text-sm font-medium">Цена</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4">
                                <Slider
                                  defaultValue={tempFilters.priceRange}
                                  min={priceRange[0]}
                                  max={priceRange[1]}
                                  step={100}
                                  value={tempFilters.priceRange}
                                  onValueChange={handlePriceChange}
                                />
                                <div className="flex items-center justify-between">
                                  <div className="text-sm">
                                    {tempFilters.priceRange[0]} ₽
                                  </div>
                                  <div className="text-sm">
                                    {tempFilters.priceRange[1]} ₽
                                  </div>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="availability" className="border-none">
                            <AccordionTrigger className="py-2 px-0">
                              <span className="text-sm font-medium">Наличие</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="mobile-in-stock" 
                                  checked={tempFilters.inStock}
                                  onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
                                />
                                <Label
                                  htmlFor="mobile-in-stock"
                                  className="text-sm cursor-pointer"
                                >
                                  Только в наличии
                                </Label>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                      <SheetFooter className="flex-row gap-3 sm:justify-start mt-4">
                        <Button onClick={applyFilters}>Применить</Button>
                        <SheetClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
              
              {/* Активные фильтры */}
              {activeFiltersCount > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-gray-500">Активные фильтры:</span>
                    
                    {filters.categories.map(category => (
                      <Badge 
                        key={category} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <button 
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              categories: prev.categories.filter(c => c !== category)
                            }));
                            setPagination(prev => ({ ...prev, page: 1 }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </Badge>
                    ))}
                    
                    {filters.inStock && (
                      <Badge 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        В наличии
                        <button 
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              inStock: false
                            }));
                            setPagination(prev => ({ ...prev, page: 1 }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </Badge>
                    )}
                    
                    {filters.search && (
                      <Badge 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        Поиск: {filters.search}
                        <button 
                          className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              search: ""
                            }));
                            setPagination(prev => ({ ...prev, page: 1 }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </Badge>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-xs h-7 px-2"
                    >
                      Сбросить все
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Список товаров */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                    <div className="aspect-square bg-gray-200 mb-4 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="flex gap-2">
                      <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">Ошибка</h2>
                <p className="mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Обновить страницу
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h2 className="text-xl font-bold mb-2">Товары не найдены</h2>
                <p className="mb-4">Попробуйте изменить параметры фильтрации или поиска</p>
                <Button onClick={resetFilters}>
                  Сбросить все фильтры
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                    />
                  ))}
                </div>
                
                {/* Пагинация */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={pagination.page}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
