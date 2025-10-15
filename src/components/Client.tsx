// components/PopularAccountsClient.tsx
"use client";

import PopularAccounts from "./Sections/PopularAccounts";
import PopularCurrency from "./Sections/PopularCurrency";
import PopularItems from "./Sections/PopularItems";
import PopularBoostingServices from "./Sections/PopularBoostingServices";

export default function Client() {
  return (
    <>
      <PopularCurrency />
      <PopularAccounts />
    </>
  );
}
