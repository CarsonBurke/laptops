CREATE MIGRATION m1nyu4fs3q3n656npxd2yk3q3lok654l5ndwrnf4gn3aq7slmt2yna
    ONTO m1z5h3kmjh3ou6kwgpff2eydaxc5mt3u4nlmh53k76rjx3wfgc5ihq
{
  ALTER TYPE default::Laptop {
      ALTER PROPERTY screenType {
          RENAME TO displayName;
      };
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY sharedMemory: std::bool;
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY titleImageId: std::uuid;
  };
  ALTER TYPE default::Laptop {
      ALTER PROPERTY titleImageName {
          RENAME TO storageName;
      };
  };
};
