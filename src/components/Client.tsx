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

  const accountService = services.find((s) => s.name === "Account");
  const currencyService = services.find((s) => s.name === "Currency");

  return (
    <>
      <PopularCurrency service={currencyService} />
      <PopularAccounts service={accountService} />
    </>
  );
}
