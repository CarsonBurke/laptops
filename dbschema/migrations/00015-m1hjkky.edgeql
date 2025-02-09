CREATE MIGRATION m1hjkkyxezurdacvvk5w4q7aafphckkuom3jy5k7hibltqkgqen6qa
    ONTO m1bs6e4ijiecfn4ioh2irpyfexazol4hys2aobufe4ndll6yevljwq
{
  ALTER TYPE default::Article {
      DROP LINK author;
  };
};
