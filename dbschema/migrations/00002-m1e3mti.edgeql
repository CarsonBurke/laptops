CREATE MIGRATION m1e3mtikya3hk6jandyaqarg3gw2bgenmuxgc2rqnvlkw7yrdoxzea
    ONTO m1qmpl23krss4btczgcn6ggj3ud4nijntreatotgwmybofdbxcon6a
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY priceHistory: array<std::int32>;
  };
  ALTER TYPE default::Article {
      CREATE PROPERTY published: std::datetime;
  };
};
