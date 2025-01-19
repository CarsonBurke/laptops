CREATE MIGRATION m1aefo2todjzfxt5wxeigfkaysaumhsqlyghd63wegkm646ldba2eq
    ONTO m1jbkm4y44e6nhehi3rzza5kfylv3ymj4iy6vx6fftwae3pj5523fq
{
  ALTER TYPE default::BlogPost {
      DROP PROPERTY content;
  };
  DROP TYPE default::BlogPost;
  CREATE TYPE default::Ingredient {
      CREATE PROPERTY amount: std::float32;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY unit: std::str;
  };
  CREATE SCALAR TYPE default::Appliance EXTENDING enum<Microwave, Stovetop, Oven, AirFryer>;
  CREATE SCALAR TYPE default::Cousine EXTENDING enum<American, Asain, British>;
  CREATE SCALAR TYPE default::Meal EXTENDING enum<Breakfast, Lunch, Dinner, Snack, Dessert>;
  CREATE TYPE default::Recipe {
      CREATE MULTI LINK ingredients: default::Ingredient;
      CREATE PROPERTY appliance: default::Appliance;
      CREATE PROPERTY cookingInstructions: std::str;
      CREATE PROPERTY cousine: default::Cousine;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY isStewOrSoup: std::bool;
      CREATE PROPERTY mealType: default::Meal;
      CREATE PROPERTY summary: std::str;
      CREATE PROPERTY timeToCook: std::int32;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE PROPERTY titleImage: std::bytes;
  };
  CREATE SCALAR TYPE default::Diet EXTENDING enum<Vegetarian, Pescetarian, Vegan, Omnivorous>;
};
