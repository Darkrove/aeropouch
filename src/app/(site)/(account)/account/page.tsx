"use client";
import LargeHeading from "@/components/ui/large-heading";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Paragraph from "@/components/ui/paragraph";
import { Separator } from "@/components/ui/separator";
import clsx from "clsx";
import Badge from "@/components/ui/badge";
import client from "@/lib/commerce";
import { verifyAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/customer";
import { format } from "date-fns";
import { UUID } from "crypto";

interface Props {}

// const orders = [
//   {
//     order: "#CMMRC-27806401",
//     date: "Dec 28th 2023",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     fullfillment: "Processing",
//   },
//   {
//     order: "#CMMRC-27806402",
//     date: "Dec 28th 2023",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     fullfillment: "Processing",
//   },
//   {
//     order: "#CMMRC-27806403",
//     date: "Dec 28th 2023",
//     paymentStatus: "Paid",
//     totalAmount: "$350.00",
//     fullfillment: "Delivered",
//   },
//   {
//     order: "#CMMRC-27806404",
//     date: "Dec 28th 2023",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     fullfillment: "Processing",
//   },
//   {
//     order: "#CMMRC-27806405",
//     date: "Dec 28th 2023",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     fullfillment: "Delivered",
//   },
//   {
//     order: "#CMMRC-27806406",
//     date: "Dec 28th 2023",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     fullfillment: "Processing",
//   },
//   {
//     order: "#CMMRC-27806407",
//     date: "Dec 28th 2023",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     fullfillment: "Processing",
//   },
// ];

const Account = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[] | null>([]);
  useEffect(() => {
    const handle = async () => {
      setIsLoading(true);
      const isLogged = await verifyAuth();
      if (isLogged) {
        const customer = await client.customer.about();
        setUser(customer);
        const orders = await client.customer.getOrders(user?.id);
        console.log(orders);
        setOrders(orders.data);
      } else {
        router.replace("/");
      }
      setIsLoading(false);
    };
    handle();
  }, [router, user?.id]);

  return (
    <div>
      <LargeHeading size={"sm"} className="text-center mb-5">
        My Account
      </LargeHeading>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-2">
          {/* <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> */}
          <div className="loader-pulse"></div>
          <h1 className="text-2xl font-semibold tracking-tight">Loading</h1>
        </div>
      ) : (
        <div>
          <Paragraph className="font-bold">Your Profile</Paragraph>
          <div className="border p-4">
            <h1 className="text-2xl font-semibold tracking-tight">
              {`${user?.firstname} ${user?.lastname}`}
            </h1>
            <h2 className="text-md text-blue-500 tracking-tight">
              {user?.email}
            </h2>
          </div>
          <Separator className="my-2" />
          <Paragraph className="font-bold">Order History</Paragraph>
          {orders ? (
            <Table className="border">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] sm:w-[200px]">
                    Order
                  </TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Fulfillment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      <p className="text-blue-500">
                        #{order.customer_reference}
                      </p>
                      <p className="text-sm">
                        {format(new Date(order.created * 1000), "MMM dd, yyyy")}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={clsx("text-white w-fit", {
                          "bg-red-500": order.status_payment === "not-paid",
                          "bg-green-500": order.status_payment === "paid",
                          "bg-gray-500": order.status_payment === "refunded",
                        })}
                      >
                        {order.status_payment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={clsx("text-white w-fit", {
                          "bg-yellow-500":
                            order.status_fulfillment === "fulfilled",
                          "bg-gray-500":
                            order.status_fulfillment === "processing",
                        })}
                      >
                        {order.status_fulfillment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {order.order_value.formatted_with_symbol}
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="text-blue-400 hover:underline">
                        view order
                      </p>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>
              <p>You haven&apos;t placed any orders yet!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
