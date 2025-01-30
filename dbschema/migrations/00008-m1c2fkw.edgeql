CREATE MIGRATION m1c2fkwcdhluxircpwnaeq6vjrnh7rv5zqfh33hrxgrcfmzaqjhwcq
    ONTO m1sfn5t5ifyhj2hflsongzrygbx5s5fq4t4ylizvoq25zsw6r6xlza
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY forVideoEditing: std::bool;
  };
};
