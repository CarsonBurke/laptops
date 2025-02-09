CREATE MIGRATION m1bs6e4ijiecfn4ioh2irpyfexazol4hys2aobufe4ndll6yevljwq
    ONTO m14gozhjx53myqhm65p6qkau54gso32j2a6wapx6vdi2vjcik5s3sa
{
  ALTER TYPE default::Article {
      CREATE PROPERTY authorId: std::uuid;
  };
};
