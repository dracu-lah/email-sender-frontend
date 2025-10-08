/**
 * Checks if a specific permission is included in a list of permissions.
 *
 * @param {string[]} permissions - Array of permission strings
 * @param {string} permission - The permission to check for
 * @returns {boolean} True if the permission is included, false otherwise
 */
export const hasPermissions = (permissions, permission) => {
  return permissions.includes(permission);
};
