CREATE MIGRATION m1sfn5t5ifyhj2hflsongzrygbx5s5fq4t4ylizvoq25zsw6r6xlza
    ONTO m15m5uo6bpk2sivkytj5n3am7eodiqizjdkg7efiaqznjj7iwl6wqa
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY cpuName: std::str;
  };
  ALTER TYPE default::Laptop {
      ALTER PROPERTY forWork {
          RENAME TO forOfficeWork;
      };
  };
  ALTER TYPE default::Laptop {
      CREATE PROPERTY gamingScore: std::int32;
      CREATE PROPERTY gpuName: std::str;
      CREATE PROPERTY officeWorkScore: std::int32;
      CREATE PROPERTY programmingScore: std::int32;
      CREATE PROPERTY screenType: std::str;
      CREATE PROPERTY studentScore: std::int32;
      CREATE PROPERTY videoEditingScore: std::int32;
  };
};
