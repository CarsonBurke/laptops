CREATE MIGRATION m1yuj2xdvip2lbueloxngcsljwzqesnkzww2ccmxkxe2xvhvxfgtvq
    ONTO m1uha2eewebnimkmskb7htmtydytwmkzkfkf6us55h7j4ctnxfadtq
{
  ALTER TYPE default::Recipe {
      CREATE REQUIRED PROPERTY last_modified: std::datetime {
          SET REQUIRED USING (<std::datetime>{});
      };
  };
};
