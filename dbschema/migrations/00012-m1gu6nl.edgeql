CREATE MIGRATION m1gu6nlxubil5g2lqv7cj6dvrn4vqccple2b3654qbhfio3mftb4tq
    ONTO m12hpsu5caplvulwvbn7su3cqutkzjrrbjmekmeyogsxbq4ahvblkq
{
  ALTER TYPE default::Account {
      DROP PROPERTY password;
  };
  ALTER TYPE default::Account {
      CREATE PROPERTY passwordEncrypted: std::bytes;
  };
};
