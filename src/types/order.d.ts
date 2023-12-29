type Order = {
  id: string;
  customer_reference: string;
  created: number;
  status_payment: string;
  status_fulfillment: string;
  order_value: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
};
