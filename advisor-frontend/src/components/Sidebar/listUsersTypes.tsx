/**
 * Defines the viewable content of each user type, in the form of Map<string, boolean>
 */

const user = new Map<string, boolean>([
  ["home", true],
  ["evaluation", true],
  ["teams", true],
  ["individuals", false],
  ["signout", true],
  ["settings", true],
  ["template", false],
]);

const assessor = new Map<string, boolean>([
  ["home", true],
  ["evaluation", false],
  ["teams", true],
  ["individuals", false],
  ["signout", true],
  ["settings", true],
  ["template", false],
]);

const admin = new Map<string, boolean>([
  ["home", true],
  ["evaluation", false],
  ["teams", false],
  ["individuals", true],
  ["signout", true],
  ["settings", true],
  ["template", true],
]);

const none = new Map<string, boolean>([
  ["home", true],
  ["evaluation", false],
  ["teams", false],
  ["individuals", false],
  ["signout", true],
  ["settings", false],
  ["template", false],
]);
/**
 * Enum object where the different userTypes can be called through. Example: "userType.ADMIN"
 */
const userTypes = {
  ADMIN: admin,
  USER: user,
  ASSESSOR: assessor,
  NONE: none,
};

export default userTypes;
