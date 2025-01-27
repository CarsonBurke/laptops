CREATE MIGRATION m15m5uo6bpk2sivkytj5n3am7eodiqizjdkg7efiaqznjj7iwl6wqa
    ONTO m1j25yqcl54xw3opgbyos5qnzkngxwjjexfkjvkzc6lwiktofg6ota
{
  ALTER TYPE default::Laptop {
      CREATE PROPERTY hasDedicatedGpu: std::bool;
      CREATE PROPERTY vram: std::int32;
  };
};
