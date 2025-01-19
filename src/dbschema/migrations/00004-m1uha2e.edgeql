CREATE MIGRATION m1uha2eewebnimkmskb7htmtydytwmkzkfkf6us55h7j4ctnxfadtq
    ONTO m1ry77aezjplbsgsnu3gthituaib7njw4e6cw3n4trbouea2hj7dua
{
  CREATE TYPE default::Newsletter {
      CREATE REQUIRED PROPERTY emails: array<std::str>;
      CREATE REQUIRED PROPERTY last_email: std::datetime;
  };
};
