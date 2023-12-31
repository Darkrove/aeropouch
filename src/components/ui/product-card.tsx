import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Image from "next/image";
import Badge from "@/components/ui/badge";
import { isNew } from "@/lib/utils";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  price: string;
  imageUrl: string;
  permalink: string;
  sale?: boolean;
  createdAt: number;
  aspectRatio?: number;
}

const ProductCard: FC<ProductCardProps> = ({
  name,
  price,
  imageUrl,
  permalink,
  sale,
  createdAt,
  aspectRatio = 3 / 4,
  className,
  ...props
}) => {
  return (
    <div className={cn("bg-muted rounded-md border", className)} {...props}>
      <Link href={`/products/${permalink}`}>
        <AspectRatio
          ratio={aspectRatio}
          className="relative overflow-hidden rounded-t-md bg-purple-200"
        >
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-all hover:scale-105"
          />
          {isNew(createdAt) && (
            <div className="absolute top-0 left-0 mt-2 ml-2">
              <Badge variant="info" size="sm">
                New
              </Badge>
            </div>
          )}
        </AspectRatio>
        <div className="space-y-1 text-sm font-sans p-4">
          <h3 className="font-bold leading-tight">{name}</h3>
          <p className="text-xs text-gray-500">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
