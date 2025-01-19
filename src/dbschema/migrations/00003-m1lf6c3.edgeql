CREATE MIGRATION m1lf6c3j2jzgmlj4jin4rnasj6zrjgzlnsvwh7bzqmzp6i24x3p6na
    ONTO m1e3mtikya3hk6jandyaqarg3gw2bgenmuxgc2rqnvlkw7yrdoxzea
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY affiliate: std::str;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY forGaming: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY forProgrammers: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY forStudents: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY forWork: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY linux: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY macos: std::bool;
  };
  ALTER TYPE default::Laptop {
      DROP PROPERTY os;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY windows: std::bool;
  };
  DROP SCALAR TYPE default::OS;
};
