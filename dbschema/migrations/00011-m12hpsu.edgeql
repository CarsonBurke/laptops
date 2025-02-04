CREATE MIGRATION m12hpsu5caplvulwvbn7su3cqutkzjrrbjmekmeyogsxbq4ahvblkq
    ONTO m1muqaekfk4tgf2rkdxx3ntpv4faadqx7cl7niawkunm25vlpkmkma
{
  ALTER TYPE default::Article {
      ALTER PROPERTY titleImageUrl {
          RENAME TO titleImageName;
      };
  };
  ALTER TYPE default::Author {
      ALTER PROPERTY profileImageUrl {
          RENAME TO profileImageName;
      };
  };
  ALTER TYPE default::Laptop {
      ALTER PROPERTY titleImageUrl {
          RENAME TO titleImageName;
      };
  };
};
