export type User = {
  id: string;
  external_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  meta: {
    utm_campaign: string;
  };
  created: number;
  updated: number;
};
