
import { useEffect, useState } from "react";
import { BarChart3, ShoppingCart, Users, Package, ArrowUp, ArrowDown, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useApi } from "@/hooks/useApi";
import { mockAnalyticsAPI } from "@/lib/mock-api";
import { DashboardStats, RevenueData, CategoryDistribution } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Компонент плашки с метрикой
const MetricCard = ({
  title,
  value,
  icon,
  trend,
  isLoading = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    direction: "up" | "down";
    value: string;
    percentage: string;
  };
  isLoading?: boolean;
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <Skeleton className="h-4 w-48 mt-4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h4 className="text-2xl font-bold">{value}</h4>
          </div>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center mt-4 text-sm">
            {trend.direction === "up" ? (
              <ArrowUp className="text-green-500 mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="text-red-500 mr-1 h-4 w-4" />
            )}
            <span
              className={trend.direction === "up" ? "text-green-500" : "text-red-500"}
            >
              {trend.value} ({trend.percentage})
            </span>
            <span className="text-muted-foreground ml-1">по сравнению с прошлым месяцем</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const DashboardTab = () => {
  const [revenueChartPeriod, setRevenueChartPeriod] = useState<"week" | "month" | "quarter" | "year">("quarter");

  // Получение общей статистики для дашборда
  const {
    data: statsData,
    isLoading: isLoadingStats,
    error: statsError,
    execute: fetchStats
  } = useApi<DashboardStats>(
    () => mockAnalyticsAPI.getDashboardStats(),
    { loadOnMount: true }
  );

  // Получение данных о выручке для графика
  const {
    data: revenueData,
    isLoading: isLoadingRevenue,
    error: revenueError,
    execute: fetchRevenueData
  } = useApi<RevenueData>(
    (period) => mockAnalyticsAPI.getRevenueData(period),
    { loadOnMount: true, initialParams: "quarter" }
  );

  // Получение распределения по категориям
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: categoriesError,
    execute: fetchCategoriesData
  } = useApi<CategoryDistribution[]>(
    () => mockAnalyticsAPI.getCategoryDistribution(),
    { loadOnMount: true }
  );

  // Обновление данных о выручке при изменении периода
  useEffect(() => {
    fetchRevenueData(revenueChartPeriod);
  }, [revenueChartPeriod, fetchRevenueData]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Выручка"
          value={statsData ? `${statsData.revenue.total.toLocaleString()} ₽` : "---"}
          icon={<div className="p-2 rounded-full bg-blue-100"><BarChart3 className="h-5 w-5 text-primary" /></div>}
          trend={statsData ? {
            direction: statsData.revenue.change.direction,
            value: `${statsData.revenue.change.value.toLocaleString()} ₽`,
            percentage: `${statsData.revenue.change.percentage}%`
          } : undefined}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Активные заказы"
          value={statsData ? statsData.activeOrders.count.toString() : "---"}
          icon={<div className="p-2 rounded-full bg-indigo-100"><ShoppingCart className="h-5 w-5 text-indigo-500" /></div>}
          trend={statsData ? {
            direction: statsData.activeOrders.change.direction,
            value: statsData.activeOrders.change.value.toString(),
            percentage: `${statsData.activeOrders.change.percentage}%`
          } : undefined}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Клиенты"
          value={statsData ? statsData.customers.total.toString() : "---"}
          icon={<div className="p-2 rounded-full bg-green-100"><Users className="h-5 w-5 text-green-500" /></div>}
          trend={statsData ? {
            direction: statsData.customers.change.direction,
            value: statsData.customers.change.value.toString(),
            percentage: `${statsData.customers.change.percentage}%`
          } : undefined}
          isLoading={isLoadingStats}
        />
        <MetricCard
          title="Доступные товары"
          value={statsData ? statsData.products.available.toString() : "---"}
          icon={<div className="p-2 rounded-full bg-amber-100"><Package className="h-5 w-5 text-amber-500" /></div>}
          trend={statsData ? {
            direction: statsData.products.change.direction,
            value: statsData.products.change.value.toString(),
            percentage: `${statsData.products.change.percentage}%`
          } : undefined}
          isLoading={isLoadingStats}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Выручка</CardTitle>
                <CardDescription>
                  Динамика доходов от аренды инструментов
                </CardDescription>
              </div>
              <Tabs 
                value={revenueChartPeriod} 
                onValueChange={(value) => setRevenueChartPeriod(value as any)}
                className="w-auto"
              >
                <TabsList className="grid grid-cols-4 h-8">
                  <TabsTrigger value="week" className="text-xs">Неделя</TabsTrigger>
                  <TabsTrigger value="month" className="text-xs">Месяц</TabsTrigger>
                  <TabsTrigger value="quarter" className="text-xs">Квартал</TabsTrigger>
                  <TabsTrigger value="year" className="text-xs">Год</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingRevenue && !revenueData ? (
              <div className="h-[300px] flex items-center justify-center">
                <Skeleton className="w-full h-[250px]" />
              </div>
            ) : revenueData ? (
              <div className="h-[300px] flex items-end gap-2">
                {revenueData.labels.map((label, index) => {
                  const value = revenueData.datasets[0].data[index];
                  const maxValue = Math.max(...revenueData.datasets[0].data);
                  const percentage = (value / maxValue) * 100;
                  
                  return (
                    <div key={label} className="relative flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-primary/90 rounded-t-sm relative group"
                        style={{ height: `${Math.max(percentage, 5)}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {value.toLocaleString()} ₽
                        </div>
                      </div>
                      <span className="mt-2 text-xs text-gray-500">{label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Не удалось загрузить данные
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Популярные категории</CardTitle>
            <CardDescription>
              Распределение аренды по категориям
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingCategories && !categoriesData ? (
              <div className="space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : categoriesData ? (
              <div className="space-y-4">
                {categoriesData.map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Не удалось загрузить данные
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <span>Последние события</span>
          </CardTitle>
          <CardDescription>
            Важные события за последние 24 часа
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-700 p-2 rounded-full">
                <ShoppingCart size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Новый заказ #1234</p>
                <p className="text-xs text-gray-500">Клиент: Иванов Иван</p>
                <p className="text-xs text-gray-500">10 минут назад</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                <Package size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Товар заканчивается на складе</p>
                <p className="text-xs text-gray-500">Перфоратор Bosch GBH 2-26</p>
                <p className="text-xs text-gray-500">1 час назад</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                <Users size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Новый клиент зарегистрирован</p>
                <p className="text-xs text-gray-500">Смирнова Ольга</p>
                <p className="text-xs text-gray-500">3 часа назад</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full">
                <ShoppingCart size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Заказ доставлен #1230</p>
                <p className="text-xs text-gray-500">Клиент: Петров Петр</p>
                <p className="text-xs text-gray-500">5 часов назад</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
