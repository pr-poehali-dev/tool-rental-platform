
import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Tag,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  List,
  Grid3X3,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { mockProductsAPI } from "@/lib/mock-api";
import { Product, ProductsResponse } from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsTab = () => {
  const { toast } = useToast();
  
  // Состояния для фильтрации и пагинации
  const [view, setView] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editableProduct, setEditableProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  
  // Загрузка списка товаров с фильтрацией и пагинацией
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
    execute: fetchProducts
  } = useApi<ProductsResponse>(
    (params) => mockProductsAPI.getAll(params),
    { loadOnMount: true, initialParams: { page: 1, limit: 10 } }
  );

  // Загрузка категорий
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    execute: fetchCategories
  } = useApi<string[]>(
    () => mockProductsAPI.getCategories(),
    { loadOnMount: true }
  );

  // API для создания товара
  const {
    isLoading: isCreating,
    error: createError,
    execute: createProduct
  } = useApi<Product>(
    (data) => mockProductsAPI.create(data),
    { successMessage: "Товар успешно добавлен" }
  );

  // API для обновления товара
  const {
    isLoading: isUpdating,
    error: updateError,
    execute: updateProduct
  } = useApi<Product>(
    (params) => mockProductsAPI.update(params.id, params.data),
    { successMessage: "Товар успешно обновлен" }
  );

  // API для удаления товара
  const {
    isLoading: isDeleting,
    error: deleteError,
    execute: deleteProduct
  } = useApi<{ success: boolean }>(
    (id) => mockProductsAPI.delete(id),
    { successMessage: "Товар успешно удален" }
  );
  
  // Обновляем список категорий при загрузке
  useEffect(() => {
    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [categoriesData]);
  
  // Обработка изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts({
      page,
      limit: 10,
      search: searchTerm,
      category: selectedCategory !== "all" ? selectedCategory : undefined
    });
  };
  
  // Обработка поиска
  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts({
      page: 1,
      limit: 10,
      search: searchTerm,
      category: selectedCategory !== "all" ? selectedCategory : undefined
    });
  };
  
  // Обработка фильтрации по категории
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchProducts({
      page: 1,
      limit: 10,
      search: searchTerm,
      category: category !== "all" ? category : undefined
    });
  };
  
  // Обработка редактирования товара
  const handleProductEdit = (product: Product) => {
    setEditableProduct(product);
  };
  
  // Обработка обновления товара
  const handleProductUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editableProduct) return;
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Проверка обязательных полей
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    
    if (!name || !price || !category) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const result = await updateProduct({
      id: editableProduct.id,
      data: formData
    });
    
    if (result) {
      setEditableProduct(null);
      fetchProducts({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        category: selectedCategory !== "all" ? selectedCategory : undefined
      });
    }
  };
  
  // Обработка добавления товара
  const handleProductAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Проверка обязательных полей
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    
    if (!name || !price || !category) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const result = await createProduct(formData);
    
    if (result) {
      setIsAddDialogOpen(false);
      form.reset();
      fetchProducts({
        page: 1,
        limit: 10,
        search: searchTerm,
        category: selectedCategory !== "all" ? selectedCategory : undefined
      });
      setCurrentPage(1);
    }
  };
  
  // Обработка удаления товара
  const handleProductDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      const result = await deleteProduct(id);
      
      if (result && result.success) {
        fetchProducts({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          category: selectedCategory !== "all" ? selectedCategory : undefined
        });
      }
    }
  };
  
  // Отображение состояния загрузки
  if (isLoadingProducts && !productsData) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b">
            <div className="flex justify-between">
              <Skeleton className="h-10 w-64" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-md" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <div className="ml-auto">
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Отображение ошибки
  if (productsError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Не удалось загрузить список товаров. Пожалуйста, попробуйте позже или обновите страницу.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="pl-10" 
              placeholder="Поиск товаров..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={handleSearch}
            >
              <Filter size={16} />
              <span>Поиск</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Tag size={16} />
                  <span>Категория: {selectedCategory === "all" ? "Все" : selectedCategory}</span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Фильтр по категории</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleCategoryFilter("all")}>
                  Все категории
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category} 
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex bg-gray-100 rounded-md">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 ${view === "table" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("table")}
              >
                <List size={18} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`px-2 ${view === "grid" ? "bg-white shadow-sm" : ""}`}
                onClick={() => setView("grid")}
              >
                <Grid3X3 size={18} />
              </Button>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 whitespace-nowrap">
                  <Plus size={16} />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Добавление нового товара</DialogTitle>
                  <DialogDescription>
                    Заполните форму для добавления нового товара в каталог
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleProductAdd}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Название товара*</Label>
                      <Input id="name" name="name" placeholder="Введите название" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Категория*</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Цена (₽/день)*</Label>
                      <Input id="price" name="price" type="number" min="0" placeholder="0" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        placeholder="Введите описание товара"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="image">Изображение</Label>
                      <Input id="image" name="image" type="file" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Switch id="available" name="available" defaultChecked />
                        <Label htmlFor="available">Доступен для аренды</Label>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsAddDialogOpen(false)}
                      disabled={isCreating}
                    >
                      Отмена
                    </Button>
                    <Button type="submit" disabled={isCreating}>
                      {isCreating ? "Добавление..." : "Добавить"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {view === "table" ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Категория</TableHead>
                <TableHead>Цена (₽/день)</TableHead>
                <TableHead>Наличие</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productsData?.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      В наличии
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleProductEdit(product)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleProductDelete(product.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {productsData?.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Товары не найдены
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productsData?.data.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    В наличии
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="font-bold">{product.price} ₽/день</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleProductEdit(product)}
                  >
                    <Edit size={14} className="mr-1" /> Редактировать
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleProductDelete(product.id)}
                    className="text-red-500 hover:text-red-600"
                    disabled={isDeleting}
                  >
                    <Trash2 size={14} className="mr-1" /> Удалить
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {productsData?.data.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Товары не найдены
              </div>
            )}
          </div>
        )}

        {productsData && productsData.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-gray-500">
              Показано {productsData.data.length} из {productsData.pagination.total} товаров
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={productsData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Модальное окно редактирования товара */}
      <Dialog open={!!editableProduct} onOpenChange={(open) => !open && setEditableProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактирование товара</DialogTitle>
            <DialogDescription>
              Измените информацию о товаре и нажмите "Сохранить"
            </DialogDescription>
          </DialogHeader>
          {editableProduct && (
            <form onSubmit={handleProductUpdate}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Название товара*</Label>
                  <Input 
                    id="edit-name" 
                    name="name"
                    defaultValue={editableProduct.name} 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Категория*</Label>
                  <Select name="category" defaultValue={editableProduct.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Цена (₽/день)*</Label>
                  <Input 
                    id="edit-price" 
                    name="price"
                    type="number"
                    min="0" 
                    defaultValue={editableProduct.price} 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Описание</Label>
                  <Textarea 
                    id="edit-description" 
                    name="description"
                    defaultValue={editableProduct.description}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-image">Текущее изображение</Label>
                  <div className="h-40 w-full rounded-md overflow-hidden">
                    <img
                      src={editableProduct.image}
                      alt={editableProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-new-image">Загрузить новое изображение</Label>
                  <Input id="edit-new-image" name="image" type="file" />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Switch id="edit-available" name="available" defaultChecked />
                    <Label htmlFor="edit-available">Доступен для аренды</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditableProduct(null)}
                  disabled={isUpdating}
                >
                  Отмена
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductsTab;
