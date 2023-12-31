"use client";
import React, { useState } from "react";
import LargeHeading from "@ui/large-heading";
import { Button } from "@ui/button";
import Paragraph from "@ui/paragraph";
import { Separator } from "@ui/separator";
import Badge from "@ui/badge";
import Quantity from "@/components/quantity";
import InventoryStatus from "@/components/inventory-status";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartDispatch } from "@/store/cart";
import client from "@/lib/commerce";
import { toast } from "sonner";
import { Product, Variant } from "@/types/product";
import { Loader2 } from "lucide-react";
interface Props {
  product: Product;
  variants: Variant;
}

const ProductInfo = ({ product, variants }: Props) => {
  const { setCart } = useCartDispatch();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [variantId, setVariantId] = useState<string | null>(null);
  const addToCart = async (productId: string, variantId?: string | null) => {
    if (product.inventory.available < 1) {
      toast.info("Out of Stock", {
        description: "This product is out of stock.",
      });
    } else {
      setLoading(true);
      const cart = await client.cart.add(productId, quantity, variantId);
      setCart(cart);
      setLoading(false);
      toast.success("Added to Cart", {
        description: "This product has been added to your cart.",
      });
    }
  };
  const handlePlusClick = () => {
    setQuantity(quantity + 1);
  };
  const handleMinusClick = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.info("Minimum Quantity", {
        description: "You can't add less than 1 quantity.",
      });
    }
  };
  const inventorySize = variants?.data?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.inventory,
    0
  );
  return (
    <div className="md:px-10">
      <div className="flex flex-row justify-between items-center ">
        <Paragraph size="xs" className="uppercase">
          SKU - {product.sku}
        </Paragraph>
        <Paragraph size="xs" className="uppercase">
          ID - {product.id}
        </Paragraph>
      </div>
      <LargeHeading size="sm">{product.name}</LargeHeading>
      <Paragraph className="lowercase">
        {product.description.replace("<p>", "").replace("</p>", "")}
      </Paragraph>
      <Separator className="my-4" />
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-between items-start">
          <Paragraph size="sm" className="">
            Fabric
          </Paragraph>
          <Paragraph size="sm" className="font-bold">
            Pure Linen
          </Paragraph>
        </div>
        <div className="flex flex-col justify-between items-start">
          <Paragraph size="sm" className="">
            GSM
          </Paragraph>
          <Paragraph size="sm" className="font-bold">
            129 gsm
          </Paragraph>
        </div>
        <div className="flex flex-col justify-between items-start">
          <Paragraph size="sm" className="">
            Width
          </Paragraph>
          <Paragraph size="sm" className="font-bold">
            --
          </Paragraph>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row space-x-2">
        <Paragraph
          className={`${
            product.inventory.available < 10 ? "text-red-900" : ""
          }`}
        >
          {product.price.formatted_with_symbol}
        </Paragraph>
        <Paragraph className="line-through">₹3299.00</Paragraph>
        <Paragraph>
          <Badge variant="destructive" size="lg">
            Sale
          </Badge>
        </Paragraph>
      </div>
      <Paragraph size="xs">
        Tax included. Shipping calculated at checkout.
      </Paragraph>

      {variants?.data?.length > 0 ? (
        <InventoryStatus available={inventorySize} />
      ) : (
        <InventoryStatus available={product.inventory.available} />
      )}
      <Paragraph className="font-bold">Select Quantity</Paragraph>
      <Quantity
        quantity={quantity}
        plusClickAction={handlePlusClick}
        minusClickAction={handleMinusClick}
      />

      {variants?.data?.length > 0 ? (
        <>
          <Paragraph className="font-bold">Select Size</Paragraph>
          <div className="flex flex-row space-x-2">
            {variants.data.map((variant) => (
              <Button
                key={variant.id}
                variant="outline"
                // className={`${
                //   variantId === variant.id ? "bg-stone-200" : null
                // } "w-10 h-10"`}
                className={`border rounded-md text-center py-3 font-medium  ${
                  variantId === variant.id ? "border-black " : ""
                }`}
                onClick={() => setVariantId(variant.id)}
                disabled={variant.inventory > 0 ? false : true}
              >
                {variant.description}
              </Button>
            ))}
          </div>
        </>
      ) : null}

      <div className="my-3 flex flex-col space-y-3">
        <Button
          className="w-full rounded-lg"
          onClick={() => addToCart(product.id, variantId)}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
            </>
          ) : null}
          Add To Cart
        </Button>
        <Button variant="subtle" className="w-full rounded-lg">
          Add to Wishlist
        </Button>
      </div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Materials</AccordionTrigger>
          <AccordionContent>
            100% Premiun Linen <br />
            Fabric Construction is{" "}
            <span className="font-semibold">60 Lea x 60 Lea</span>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping & Returns</AccordionTrigger>
          <AccordionContent>
            We offer free shipping on all prepaid orders within India.
            <br />
            COD order have standard shiping charges you will find on chekout.
            <br />
            Most of our orders are shipped within 1-2 days of purchase. Once
            your order is shipped, we estimate you will receive your order
            within 2-5 business days of its ship date.
            <br />
            <span className="font-semibold">Return</span>- Easy 10 Days Return &
            Refund Policy we have And Size Change also we offer as per available
            stock.
            <br />
            <span className="font-semibold">Note</span>- Fabric purchase is not
            available For return And exchnage.
            <br />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Care Instructions</AccordionTrigger>
          <AccordionContent>
            <span className="font-semibold">Ideally</span> :<br />
            Use mild Detergent
            <br />
            Hand wash or Short cycle alone
            <br />
            (15 to 30 minutes) or &quot;Delicate cycle&quot;.
            <br />
            <span className="font-semibold">Avoid</span> :<br />
            <ul>
              <li>Hot Wash</li>
              <li>Dry Clean</li>
              <li>Combo Wash</li>
              <li>Tumble Dry</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductInfo;
