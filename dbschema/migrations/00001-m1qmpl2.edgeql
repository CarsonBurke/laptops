CREATE MIGRATION m1qmpl23krss4btczgcn6ggj3ud4nijntreatotgwmybofdbxcon6a
    ONTO initial
{
  CREATE TYPE default::Author {
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY profileImage: std::bytes;
  };
  CREATE TYPE default::Article {
      CREATE LINK author: default::Author;
      CREATE PROPERTY content: std::str;
      CREATE PROPERTY title: std::str;
      CREATE PROPERTY titleImage: std::bytes;
  };
  CREATE SCALAR TYPE default::OS EXTENDING enum<Mac, Windows, Linux>;
  CREATE TYPE default::Laptop {
      CREATE PROPERTY cores: std::int32;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY os: default::OS;
      CREATE PROPERTY price: std::int32;
      CREATE PROPERTY ram: std::int32;
      CREATE PROPERTY saleOf: std::int32;
      CREATE PROPERTY size: std::int32;
      CREATE PROPERTY titleImage: std::bytes;
      CREATE PROPERTY topFrequency: std::float32;
  };
};
