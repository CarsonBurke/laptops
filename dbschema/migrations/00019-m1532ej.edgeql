CREATE MIGRATION m1532ejadut6nacoany2sjyhqzqk2fxacprgensd7lk25jqjatt4tq
    ONTO m13verfwxn2ubkbzxlhbc7og2ut3ljtbwhoml465rcadufhvzi7rya
{
  ALTER TYPE default::Article {
      CREATE PROPERTY keywords: array<std::str>;
      CREATE PROPERTY summary: std::str;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY refurbished: std::bool;
      CREATE PROPERTY touchscreen: std::bool;
  };
};
