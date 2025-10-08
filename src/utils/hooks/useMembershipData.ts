import { useQuery } from "@tanstack/react-query";
import {
  GetMembershipCategoriesAPI,
  GetMembershipProgramsAPI,
  GetMembershipTiersAPI,
} from "@/services/api"; // Adjust import path as needed

export const useMembershipData = ({ showEnrollmentTiersOnly = false } = {}) => {
  const {
    data: membershipCategoriesData,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["GetMembershipCategoriesAPI"],
    queryFn: GetMembershipCategoriesAPI,
  });

  const {
    data: membershipProgramsData,
    isLoading: isProgramsLoading,
    error: programsError,
  } = useQuery({
    queryKey: ["GetMembershipProgramsAPI"],
    queryFn: GetMembershipProgramsAPI,
  });

  const {
    data: membershipTiersData,
    isLoading: isTiersLoading,
    error: tiersError,
  } = useQuery({
    queryKey: ["GetMembershipTiersAPI"],
    queryFn: GetMembershipTiersAPI,
  });

  const membershipPrograms =
    membershipProgramsData?.data.map(({ id, memberShipProgramName }) => ({
      value: id.toString(),
      label: memberShipProgramName,
    })) || [];

  const membershipTiers =
    membershipTiersData?.data

      .filter((t) => !showEnrollmentTiersOnly || t.enrollmentTier)
      .map(({ id, tierName, membershipProgramId }) => ({
        value: id.toString(),
        label: tierName,
        membershipProgramId,
      })) || [];

  const membershipCategories =
    membershipCategoriesData?.data.map(({ id, categoryName, tierId }) => ({
      value: id.toString(),
      label: categoryName,
      tierId,
    })) || [];

  const isLoading = isCategoriesLoading || isProgramsLoading || isTiersLoading;
  const error = categoriesError || programsError || tiersError;

  return {
    membershipPrograms,
    membershipTiers,
    membershipCategories,
    isLoading,
    error,
    // Return raw data in case it's needed
    rawData: {
      categoriesData: membershipCategoriesData?.data,
      programsData: membershipProgramsData?.data,
      tiersData: membershipTiersData?.data,
    },
  };
};
