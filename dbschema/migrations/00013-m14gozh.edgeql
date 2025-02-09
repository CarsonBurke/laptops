CREATE MIGRATION m14gozhjx53myqhm65p6qkau54gso32j2a6wapx6vdi2vjcik5s3sa
    ONTO m1gu6nlxubil5g2lqv7cj6dvrn4vqccple2b3654qbhfio3mftb4tq
{
  ALTER TYPE default::Account {
      CREATE PROPERTY password: std::str;
  };
  ALTER TYPE default::Account {
      DROP PROPERTY passwordEncrypted;
  };
};
