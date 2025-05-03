
import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Tag,
  ChevronDown,
  Edit,
  Trash2,
  Eye,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "@/hooks/useApi";
import { mockBookingAPI } from "@/lib/mock-api";
import { 
  Service, 
  ServicesResponse,
  ServiceCategoriesResponse
} from "@/lib/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ServicesTab = () => {
  const { toast } = useToast();
  
  // Состояния для фильтрации и пагинации
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editableService, setEditableService] = useState<Service | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Загрузка списка услуг с фильтрацией и пагинацией
  const {
    data: servicesData,
    isLoading: isLoadingServices,
    error: servicesError,
    execute: fetchServices
  } = useApi<ServicesResponse>(
    (params) => mockBookingAPI.services.getAll(params),
    { loadOnMount: true, initialParams: { page: 1, limit: 10 } }
  );

  // Загрузка категорий услуг
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    execute: fetchCategories
  } = useApi<ServiceCategoriesResponse>(
    () => mockBookingAPI.services.getCategories(),
    { loadOnMount: true }
  );

  // API для создания услуги
  const {
    isLoading: isCreating,
    error: createError,
    execute: createService
  } = useApi<Service>(
    (data) => mockBookingAPI.services.create(data),
    { successMessage: "Услуга успешно добавлена" }
  );

  // API для обновления услуги
  const {
    isLoading: isUpdating,
    error: updateError,
    execute: updateService
  } = useApi<Service>(
    (params) => mockBookingAPI.services.update(params.id, params.data),
    { successMessage: "Услуга успешно обновлена" }
  );

  // API для удаления услуги
  const {
    isLoading: isDeleting,
    error: deleteError,
    execute: deleteService
  } = useApi<{ success: boolean }>(
    (id) => mockBookingAPI.services.delete(id),
    { successMessage: "Услуга успешно удалена" }
  );
  
  // Обработка изменения страницы
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchServices({
      page,
      limit: 10,
      search: searchTerm,
      category: selectedCategory !== "all" ? selectedCategory : undefined
    });
  };
  
  // Обработка поиска
  const handleSearch = () => {
    setCurrentPage(1);
    fetchServices({
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
    fetchServices({
      page: 1,
      limit: 10,
      search: searchTerm,
      category: category !== "all" ? category : undefined
    });
  };
  
  // Обработ
  // Обработка редактирования услуги
  const handleServiceEdit = (service: Service) => {
    setEditableService(service);
  };
  
  // Обработка обновления услуги
  const handleServiceUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editableService) return;
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Получаем данные из формы
    const serviceData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      category: formData.get("category") as string,
      isActive: formData.get("isActive") === "on"
    };
    
    // Проверка обязательных полей
    if (!serviceData.name || !serviceData.price || !serviceData.duration || !serviceData.category) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const result = await updateService({
      id: editableService.id,
      data: serviceData
    });
    
    if (result) {
      setEditableService(null);
      fetchServices({
        page: currentPage,
        limit: 10,
        search: searchTerm,
        category: selectedCategory !== "all" ? selectedCategory : undefined
      });
    }
  };
  
  // Обработка добавления услуги
  const handleServiceAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Получаем данные из формы
    const serviceData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      duration: Number(formData.get("duration")),
      category: formData.get("category") as string,
      isActive: formData.get("isActive") === "on"
    };
    
    // Проверка обязательных полей
    if (!serviceData.name || !serviceData.price || !serviceData.duration || !serviceData.category) {
      toast({
        title: "Ошибка валидации",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }
    
    const result = await createService(serviceData);
    
    if (result) {
      setIsAddDialogOpen(false);
      form.reset();
      fetchServices({
        page: 1,
        limit: 10,
        search: searchTerm,
        category: selectedCategory !== "all" ? selectedCategory : undefined
      });
      setCurrentPage(1);
    }
  };
  
  // Обработка удаления услуги
  const handleServiceDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить эту услугу?")) {
      const result = await deleteService(id);
      
      if (result && result.success) {
        fetchServices({
          page: currentPage,
          limit: 10,
          search: searchTerm,
          category: selectedCategory !== "all" ? selectedCategory : undefined
        });
      }
    }
  };
  
  // Отображение состояния загрузки
  if (isLoadingServices && !servicesData) {
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
  if (servicesError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ошибка</AlertTitle>
        <AlertDescription>
          Не удалось загрузить список услуг. Пожалуйста, попробуйте позже или обновите страницу.
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
              placeholder="Поиск услуг..." 
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
                {categoriesData?.data.map((category) => (
                  <DropdownMenuItem 
                    key={category.id} 
                    onClick={() => handleCategoryFilter(category.name)}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 whitespace-nowrap">
                  <Plus size={16} />
                  Добавить услугу
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Добавление новой услуги</DialogTitle>
                  <DialogDescription>
                    Заполните форму для добавления новой услуги в каталог
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleServiceAdd}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Название услуги*</Label>
                      <Input id="name" name="name" placeholder="Введите название" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Категория*</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoriesData?.data.map((category) => (
                            <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="price">Цена (₽)*</Label>
                        <Input id="price" name="price" type="number" min="0" placeholder="0" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Длительность (мин)*</Label>
                        <Input id="duration" name="duration" type="number" min="1" placeholder="60" required />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Описание</Label>
                      <Textarea 
                        id="description" 
                        name="description"
                        placeholder="Введите описание услуги"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <Switch id="isActive" name="isActive" defaultChecked />
                        <Label htmlFor="isActive">Услуга активна</Label>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Длительность</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {servicesData?.data.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {service.image ? (
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                        <Briefcase size={16} />
                      </div>
                    )}
                    <span className="font-medium">{service.name}</span>
                  </div>
                </TableCell>
                <TableCell>{service.category}</TableCell>
                <TableCell>{service.price} ₽</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Clock size={14} className="text-gray-400" />
                  {service.duration} мин.
                </TableCell>
                <TableCell>
                  {service.isActive ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Активна
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Неактивна
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleServiceEdit(service)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleServiceDelete(service.id)}
                      disabled={isDeleting}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {servicesData?.data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Услуги не найдены
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {servicesData && servicesData.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-gray-500">
              Показано {servicesData.data.length} из {servicesData.pagination.total} услуг
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={servicesData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {/* Модальное окно редактирования услуги */}
      <Dialog open={!!editableService} onOpenChange={(open) => !open && setEditableService(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Редактирование услуги</DialogTitle>
            <DialogDescription>
              Измените информацию об услуге и нажмите "Сохранить"
            </DialogDescription>
          </DialogHeader>
          {editableService && (
            <form onSubmit={handleServiceUpdate}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Название услуги*</Label>
                  <Input 
                    id="edit-name" 
                    name="name"
                    defaultValue={editableService.name} 
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Категория*</Label>
                  <Select name="category" defaultValue={editableService.category}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesData?.data.map((category) => (
                        <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-price">Цена (₽)*</Label>
                    <Input 
                      id="edit-price" 
                      name="price"
                      type="number"
                      min="0" 
                      defaultValue={editableService.price} 
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-duration">Длительность (мин)*</Label>
                    <Input 
                      id="edit-duration" 
                      name="duration"
                      type="number"
                      min="1" 
                      defaultValue={editableService.duration} 
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-description">Описание</Label>
                  <Textarea 
                    id="edit-description" 
                    name="description"
                    defaultValue={editableService.description}
                    className="min-h-[100px]"
                  />
                </div>
                {editableService.image && (
                  <div className="grid gap-2">
                    <Label htmlFor="edit-image">Текущее изображение</Label>
                    <div className="h-40 w-full rounded-md overflow-hidden">
                      <img
                        src={editableService.image}
                        alt={editableService.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Switch 
                      id="edit-isActive" 
                      name="isActive" 
                      defaultChecked={editableService.isActive} 
                    />
                    <Label htmlFor="edit-isActive">Услуга активна</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditableService(null)}
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

export default ServicesTab;
