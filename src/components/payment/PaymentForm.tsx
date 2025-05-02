
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Building, Phone } from "lucide-react";

interface PaymentFormProps {
  amount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const PaymentForm = ({ amount, onSuccess, onCancel }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Данные для оплаты картой
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");
    // Форматируем номер карты: XXXX XXXX XXXX XXXX
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned;
    return formatted.slice(0, 19); // Максимум 16 цифр + 3 пробела
  };

  const formatExpiryDate = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, "");
    // Форматируем: MM/YY
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Здесь будет интеграция с платежной системой
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Платеж успешно обработан",
        description: `С вашей карты списано ${amount} ₽`,
        variant: "default",
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Ошибка обработки платежа",
        description: "Пожалуйста, проверьте данные карты и попробуйте снова",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBankTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Заказ создан",
      description: "Реквизиты для оплаты отправлены на вашу почту",
      variant: "default",
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleSbpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "QR-код для оплаты сформирован",
      description: "Отсканируйте код в приложении банка для завершения оплаты",
      variant: "default",
    });
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Оплата заказа</h2>
          <p className="text-gray-500">Сумма к оплате: {amount} ₽</p>
        </div>

        <Tabs defaultValue="card">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>Карта</span>
            </TabsTrigger>
            <TabsTrigger value="sbp" className="flex items-center gap-2">
              <Phone size={16} />
              <span>СБП</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center gap-2">
              <Building size={16} />
              <span>Счет</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="mt-6">
            <form onSubmit={handleCardSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardData.cardNumber}
                  onChange={(e) => {
                    e.target.value = formatCardNumber(e.target.value);
                    handleCardChange(e);
                  }}
                  required
                  maxLength={19}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardName">Имя владельца</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="IVAN IVANOV"
                  value={cardData.cardName}
                  onChange={handleCardChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Срок действия</Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={(e) => {
                      e.target.value = formatExpiryDate(e.target.value);
                      handleCardChange(e);
                    }}
                    required
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV/CVC</Label>
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="***"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Обработка..." : "Оплатить"}
                </Button>
                {onCancel && (
                  <Button type="button" variant="ghost" onClick={onCancel}>
                    Отмена
                  </Button>
                )}
              </div>
              <p className="text-sm text-gray-500 text-center">
                Данные карты защищены и передаются по зашифрованному каналу
              </p>
            </form>
          </TabsContent>

          <TabsContent value="sbp" className="mt-6">
            <div className="text-center space-y-4">
              <div className="bg-gray-100 p-6 rounded-lg mx-auto w-48 h-48 flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/714/714390.png" 
                  alt="QR Code" 
                  className="w-full h-full"
                />
              </div>
              <p className="text-sm">
                Отсканируйте QR-код с помощью приложения вашего банка для оплаты через Систему Быстрых Платежей
              </p>
              <form onSubmit={handleSbpSubmit}>
                <div className="flex flex-col space-y-2">
                  <Button type="submit">Я оплатил через СБП</Button>
                  {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="bank" className="mt-6">
            <div className="space-y-4">
              <p>
                Для оплаты по безналичному расчету мы выставим счет на вашу организацию.
                Заполните данные для выставления счета:
              </p>
              <form onSubmit={handleBankTransferSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Название организации</Label>
                  <Input
                    id="companyName"
                    placeholder="ООО 'Компания'"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inn">ИНН</Label>
                  <Input
                    id="inn"
                    placeholder="10 или 12 цифр"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email для получения счета</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="company@example.com"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Button type="submit">Выставить счет</Button>
                  {onCancel && (
                    <Button type="button" variant="ghost" onClick={onCancel}>
                      Отмена
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
