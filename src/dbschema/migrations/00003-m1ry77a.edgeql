CREATE MIGRATION m1ry77aezjplbsgsnu3gthituaib7njw4e6cw3n4trbouea2hj7dua
    ONTO m1aefo2todjzfxt5wxeigfkaysaumhsqlyghd63wegkm646ldba2eq
{
  ALTER TYPE default::Ingredient {
      ALTER PROPERTY amount {
          SET REQUIRED USING (<std::float32>{});
      };
      ALTER PROPERTY name {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY unit {
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::Recipe {
      ALTER LINK ingredients {
          CREATE CONSTRAINT std::exclusive;
          SET REQUIRED USING (<default::Ingredient>{});
      };
      ALTER PROPERTY appliance {
          SET REQUIRED USING (<default::Appliance>{});
      };
      ALTER PROPERTY cookingInstructions {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY cousine {
          SET REQUIRED USING (<default::Cousine>{});
      };
      ALTER PROPERTY description {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY isStewOrSoup {
          SET REQUIRED USING (<std::bool>{});
      };
      ALTER PROPERTY mealType {
          SET REQUIRED USING (<default::Meal>{});
      };
      ALTER PROPERTY summary {
          SET REQUIRED USING (<std::str>{});
      };
      ALTER PROPERTY timeToCook {
          SET REQUIRED USING (<std::int32>{});
      };
      ALTER PROPERTY titleImage {
          SET REQUIRED USING (<std::bytes>{});
      };
  };
};
