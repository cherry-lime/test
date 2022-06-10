const user = new Map<string, boolean>([
  ["home", true],
  ["evaluation", true],
  ["teams", true],
  ["signout", true],
  ["settings", true],
  ["template", false],
]);

const assessor = new Map<string, boolean>([
  ["home", true],
  ["evaluation", false],
  ["teams", true],
  ["signout", true],
  ["settings", true],
  ["template", false],
]);

const admin = new Map<string, boolean>([
  ["home", true],
  ["evaluation", false],
  ["teams", true],
  ["signout", true],
  ["settings", true],
  ["template", true],
]);

export { user, assessor, admin };
