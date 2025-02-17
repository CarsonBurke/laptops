import { OperatingSystemQuery, UseCaseQuery } from "@/types/laptop";

export function queryUseCaseOnly(key: keyof UseCaseQuery) {
  const query = {
    forStudents: false,
    forGaming: false,
    forProgrammers: false,
    forOfficeWork: false,
    forVideoEditing: false,
  };
  query[key] = true;

  return query;
}

export function queryOperatingSystemOnly(key: keyof OperatingSystemQuery) {
  const query = {
    macos: false,
    windows: false,
    linux: false,
  };
  query[key] = true;

  return query;
}
