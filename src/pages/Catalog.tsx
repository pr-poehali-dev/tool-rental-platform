
import { useState } from "react";
import Layout from "@/components/ui/Layout";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 1500]);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Mobile Filter Button */}
          <div className="w-full md:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full flex items-center gap-2">
                  <Filter size={16} />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                  <SheetDescription>
                    Настройте параметры поиска инструментов
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Категории</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={`mobile-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <label
                            htmlFor={`mobile-${category}`}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Цена (₽/день)</h3>
                    <Slider
                      value={priceRange}
                      min={0}
                      max={1500}
                      step={50}
                      onValueChange={setPriceRange}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>{priceRange[0]} ₽</span>
                      <span>{priceRange[1]} ₽</span>
                    </div>
                  </div>

                  <Button variant="outline" onClick={clearFilters} className="w-full">
                    Сбросить фильтры
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden md:block w-1/4 bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Категории</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={category}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="mb-6">
              <h3 className="font-semibold mb-3">Цена (₽/день)</h3>
              <Slider
                value={priceRange}
                min={0}
                max={1500}
                step={50}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0]} ₽</span>
                <span>{priceRange[1]} ₽</span>
              </div>
            </div>

            <Button variant="outline" onClick={clearFilters} className="w-full">
              Сбросить фильтры
            </Button>
          </div>

          {/* Product Grid with Search */}
          <div className="w-full md:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  className="pl-10"
                  placeholder="Поиск инструментов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Все инструменты</h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">По вашему запросу ничего не найдено</h3>
                <p className="text-gray-600 mb-4">Попробуйте изменить параметры фильтрации</p>
                <Button onClick={clearFilters}>Сбросить фильтры</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
