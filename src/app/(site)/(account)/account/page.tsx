import LargeHeading from "@/components/ui/large-heading";
import React from "react";
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

interface Props {}

const orders = [
  {
    order: "#CMMRC-27806401",
    date: "Dec 28th 2023",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    fullfillment: "Processing",
  },
  {
    order: "#CMMRC-27806402",
    date: "Dec 28th 2023",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    fullfillment: "Processing",
  },
  {
    order: "#CMMRC-27806403",
    date: "Dec 28th 2023",
    paymentStatus: "Paid",
    totalAmount: "$350.00",
    fullfillment: "Delivered",
  },
  {
    order: "#CMMRC-27806404",
    date: "Dec 28th 2023",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    fullfillment: "Processing",
  },
  {
    order: "#CMMRC-27806405",
    date: "Dec 28th 2023",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    fullfillment: "Delivered",
  },
  {
    order: "#CMMRC-27806406",
    date: "Dec 28th 2023",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    fullfillment: "Processing",
  },
  {
    order: "#CMMRC-27806407",
    date: "Dec 28th 2023",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    fullfillment: "Processing",
  },
];

const page = () => {
  return (
    <div>
      <LargeHeading size={"sm"} className="text-center">
        My Account
      </LargeHeading>
      <div>
        <Paragraph className="font-bold">Your Profile</Paragraph>
        <div className="border p-4">
          <h1 className="text-2xl font-semibold tracking-tight">
            sajjad shaikh
          </h1>
        </div>
        <Separator className="my-2" />
        <Paragraph className="font-bold">Order History</Paragraph>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] sm:w-[200px]">Order</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Fulfillment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order}>
                <TableCell className="font-medium">
                  {order.order}
                  <br />
                  <p className="text-sm">{order.date}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    className={clsx("text-white w-fit", {
                      "bg-red-500": order.paymentStatus === "Unpaid",
                      "bg-green-500": order.paymentStatus === "Paid",
                      "bg-gray-500": order.paymentStatus === "Pending",
                    })}
                  >
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    className={clsx("text-white w-fit", {
                      "bg-green-500": order.fullfillment === "Delivered",
                      "bg-gray-500": order.fullfillment === "Processing",
                    })}
                  >
                    {order.fullfillment}
                  </Badge>
                </TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell className="text-right">
                  <p className="text-blue-400 hover:underline">view order</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
