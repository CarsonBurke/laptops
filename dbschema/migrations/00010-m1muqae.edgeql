CREATE MIGRATION m1muqaekfk4tgf2rkdxx3ntpv4faadqx7cl7niawkunm25vlpkmkma
    ONTO m1rjql442wucg3dxmbngtwmuk4ncerhgh74rycn5toyikw3cusjmda
{
  CREATE TYPE default::Account {
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY isAdmin: std::bool;
      CREATE PROPERTY password: std::str;
      CREATE PROPERTY username: std::str;
  };
  ALTER TYPE default::Article {
      DROP PROPERTY titleImage;
  };
  ALTER TYPE default::Article {
      CREATE PROPERTY titleImageUrl: std::str;
  };
  ALTER TYPE default::Author {
      DROP PROPERTY profileImage;
  };
  ALTER TYPE default::Author {
      CREATE PROPERTY profileImageUrl: std::str;
  };
  ALTER TYPE default::Laptop {
      DROP PROPERTY titleImage;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY titleImageUrl: std::str;
  };
};
