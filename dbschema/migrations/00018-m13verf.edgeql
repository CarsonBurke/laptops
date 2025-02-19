CREATE MIGRATION m13verfwxn2ubkbzxlhbc7og2ut3ljtbwhoml465rcadufhvzi7rya
    ONTO m1nyu4fs3q3n656npxd2yk3q3lok654l5ndwrnf4gn3aq7slmt2yna
{
  ALTER TYPE default::Laptop {
      ALTER PROPERTY sharedMemory {
          RENAME TO unifiedMemory;
      };
      ALTER PROPERTY size {
          SET TYPE std::float32 USING (<std::float32>.size);
      };
  };
};
