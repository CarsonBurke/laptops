CREATE MIGRATION m1j25yqcl54xw3opgbyos5qnzkngxwjjexfkjvkzc6lwiktofg6ota
    ONTO m1ar3rxygru2b4fwy4ayncbaipnen4uv7ywosjk3nxx5j55fjrgstq
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY resolution: std::int32;
  };
};
