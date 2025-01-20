CREATE MIGRATION m1ar3rxygru2b4fwy4ayncbaipnen4uv7ywosjk3nxx5j55fjrgstq
    ONTO m1lf6c3j2jzgmlj4jin4rnasj6zrjgzlnsvwh7bzqmzp6i24x3p6na
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY storage: std::int32;
  };
};
