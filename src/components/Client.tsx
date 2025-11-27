"use client";

import PopularAccounts from "./Sections/PopularAccounts";
import PopularCurrency from "./Sections/PopularCurrency";

interface ClientProps {
  dynamicdata: {
    services: any[];
    settings: any;
  };
}

export default function Client({ dynamicdata }: ClientProps) {
  const { services } = dynamicdata;

  const accountService = services.find((s) => s.name === "account");
  const currencyService = services.find((s) => s.name === "currency");

  return (
    <>
      <PopularCurrency service={currencyService} />
      <PopularAccounts service={accountService} />
    </>
  );
}
