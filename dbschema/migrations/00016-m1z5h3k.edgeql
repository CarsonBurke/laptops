CREATE MIGRATION m1z5h3kmjh3ou6kwgpff2eydaxc5mt3u4nlmh53k76rjx3wfgc5ihq
    ONTO m1hjkkyxezurdacvvk5w4q7aafphckkuom3jy5k7hibltqkgqen6qa
{
  ALTER TYPE default::Article {
      CREATE PROPERTY contentImageIds: array<std::uuid>;
  };
  ALTER TYPE default::Article {
      CREATE PROPERTY titleImageId: std::uuid;
  };
  ALTER TYPE default::Article {
      DROP PROPERTY titleImageName;
  };
};
