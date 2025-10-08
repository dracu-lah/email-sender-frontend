/* FITERS CATEGORIES*/
function filterAndMapCategories(
  categories,
  membershipProgramId,
  membershipTierId,
) {
  if (!categories?.data?.length) return [];

  return categories.data
    .filter(
      (category) =>
        category.membershipProgramId === membershipProgramId &&
        category.tierId === membershipTierId,
    )
    .map(({ id, categoryName }) => ({
      value: id.toString(),
      label: categoryName,
    }));
}
/* FITERS TIERS*/
function filterAndMapTiers(tiers, membershipProgramId) {
  if (!tiers?.data?.length) return [];

  return tiers.data
    .filter((tier) => tier.membershipProgramId === membershipProgramId)
    .map(({ id, tierName }) => ({
      value: id.toString(),
      label: tierName,
    }));
}

export { filterAndMapTiers, filterAndMapCategories };
