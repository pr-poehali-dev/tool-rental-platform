
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
        <div className="text-sm text-gray-500">{product.category}</div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xl font-bold">{product.price} ₽/день</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between">
        <Button asChild variant="outline">
          <Link to={`/product/${product.id}`}>Подробнее</Link>
        </Button>
        <Button className="flex items-center gap-1">
          <ShoppingCart size={16} />
          <span>В корзину</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
