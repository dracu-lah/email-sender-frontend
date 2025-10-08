// menuItems.js
import routePath from "@/router/routePath";

import {
  CircleUser,
  ClipboardPen,
  Hotel,
  HandCoins,
  Home,
  MessageCircleHeart,
  TicketCheck,
  UsersRound,
  ConciergeBell,
  Settings,
  ShieldPlusIcon,
  FileTerminal,
  CalendarDaysIcon,
} from "lucide-react";
export const menuItems = [
  {
    id: "dashboard",
    icon: Home,
    label: "Dashboard",
    route: routePath.home,
    access: true,
    elements: [
      { id: "view_stats", name: "View Statistics", access: true },
      { id: "export_data", name: "Export Data", access: false },
    ],
  },
  {
    id: "guest_management",
    icon: UsersRound,
    label: "Guest",
    route: routePath.guestManagement,
    access: true,
    elements: [
      { id: "view_guests", name: "View Guests", access: true },
      { id: "manage_guests", name: "Manage Guests", access: false },
    ],
  },
  {
    id: "users",
    icon: CircleUser,
    label: "Users",
    access: true,
    elements: [],
    subPages: [
      {
        id: "manage_users",
        label: "Manage Users",
        route: routePath.userManagement,
        access: true,
        elements: [
          { id: "create_user", name: "Create User", access: true },
          { id: "edit_user", name: "Edit User", access: false },
          { id: "delete_user", name: "Delete User", access: false },
        ],
      },
    ],
  },
  {
    id: "app_content",
    icon: ClipboardPen,
    label: "App Content",
    route: routePath.contentManagement,
    access: true,
    elements: [
      { id: "view_content", name: "View Content", access: true },
      { id: "edit_content", name: "Edit Content", access: false },
    ],
  },
  {
    id: "points",
    icon: HandCoins,
    label: "Points",
    access: true,
    elements: [],
    subPages: [
      {
        id: "earn_points",
        label: "Earn Points",
        route: routePath.earnPoints,
        access: true,
        elements: [
          { id: "view_earn_points", name: "View Earn Points", access: true },
        ],
      },
      {
        id: "burn_points",
        label: "Redeem Points",
        route: routePath.burnPoints,
        access: true,
        elements: [
          { id: "redeem_points", name: "Redeem Points", access: true },
        ],
      },
      {
        id: "revert_points",
        label: "Revert Points",
        route: routePath.revertPoints,
        access: true,
        elements: [
          {
            id: "revert_points_action",
            name: "Revert Points Action",
            access: true,
          },
        ],
      },
    ],
  },
  {
    id: "feedbacks",
    icon: MessageCircleHeart,
    label: "Feedbacks",
    route: routePath.feedbackManagement,
    access: true,
    elements: [
      { id: "view_feedback", name: "View Feedback", access: true },
      { id: "respond_feedback", name: "Respond to Feedback", access: false },
    ],
  },
  {
    id: "claim_feedbacks",
    icon: MessageCircleHeart,
    label: "Claim Feedbacks",
    route: routePath.claimPointsFeedbackManagement,
    access: true,
    elements: [],
  },
  {
    id: "push_notifications",
    icon: ConciergeBell,
    label: "Push Notifications",
    access: true,
    elements: [],
    subPages: [
      {
        id: "manage_templates",
        label: "Manage Templates",
        route: routePath.templatesManagement,
        access: true,
        elements: [
          { id: "view_templates", name: "View Templates", access: true },
          { id: "edit_templates", name: "Edit Templates", access: false },
        ],
      },
      {
        id: "send_notifications",
        label: "Send Notifications",
        route: routePath.sendNotifications,
        access: true,
        elements: [
          {
            id: "send_bulk_notifications",
            name: "Send Bulk Notifications",
            access: true,
          },
        ],
      },
    ],
  },
  {
    id: "configurations",
    icon: Settings,
    label: "Configurations",
    access: true,
    elements: [],
    subPages: [
      {
        id: "locations",
        label: "Locations",
        access: true,
        elements: [],
        subPages: [
          {
            id: "organizations",
            label: "Organizations",
            route: routePath.organizations,
            access: true,
          },
          {
            id: "properties",
            label: "Properties",
            route: routePath.propertyManagement,
            access: true,
          },
          {
            id: "rvc_outlets",
            label: "RVC Outlets",
            route: routePath.rvcOutlets,
            access: true,
          },
          {
            id: "outlet_types",
            label: "Outlet Types",
            route: routePath.outletTypes,
            access: true,
          },
        ],
      },
      {
        id: "loyalty",
        label: "Loyalty",
        access: true,
        elements: [],
        subPages: [
          {
            id: "loyalty_programs",
            label: "Loyalty Programs",
            route: routePath.membershipPrograms,
            access: true,
          },
          {
            id: "tier_types",
            label: "Loyalty Tier Types",
            route: routePath.membershipTierTypes,
            access: true,
          },
          {
            id: "loyalty_tiers",
            label: "Loyalty Tiers",
            route: routePath.membershipTiers,
            access: true,
          },
          {
            id: "loyalty_categories",
            label: "Loyalty Categories",
            route: routePath.membershipCategories,
            access: true,
          },
        ],
      },
      {
        id: "points_configuration",
        label: "Points",
        access: true,
        elements: [],
        subPages: [
          {
            id: "earn_points_config",
            label: "Earn Points",
            route: routePath.earnPointsConfig,
            access: true,
          },
          {
            id: "burn_points_config",
            label: "Burn Points",
            route: routePath.burnPointsConfig,
            access: true,
          },
        ],
      },
      {
        id: "discounts",
        label: "Discounts",
        access: true,
        elements: [],
        subPages: [
          {
            id: "discount_itemizers",
            label: "Discount Itemizers",
            route: routePath.discountItemizers,
            access: true,
          },
          {
            id: "micros_discounts",
            label: "Micros Discounts",
            route: routePath.microDiscounts,
            access: true,
          },
          {
            id: "discount_programs",
            label: "Discount Programs",
            route: routePath.discountPrograms,
            access: true,
          },
          {
            id: "membership_discounts",
            label: "Loyalty Discounts",
            route: routePath.membershipDiscounts,
            access: true,
          },
        ],
      },
    ],
  },
];
