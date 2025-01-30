CREATE MIGRATION m1rjql442wucg3dxmbngtwmuk4ncerhgh74rycn5toyikw3cusjmda
    ONTO m1c2fkwcdhluxircpwnaeq6vjrnh7rv5zqfh33hrxgrcfmzaqjhwcq
{
  CREATE TYPE default::Contact {
      CREATE PROPERTY content: std::str;
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY title: std::str;
  };
};
