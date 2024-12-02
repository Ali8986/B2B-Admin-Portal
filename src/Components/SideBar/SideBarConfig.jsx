import {
  usePrivileges,
  useSidebarStatus,
  useRole,
} from "../../Hooks/App_Context";
import Iconify from "../GeneralComponents/Iconify";
import { useMemo } from "react";

const getIcon = (name) => (
  <Iconify icon={name} width={25} height={25} color={"#016699"} />
);

export const useNavOptions = () => {
  const { privileges } = usePrivileges();
  const { sidebarStatus } = useSidebarStatus();
  const { Role: role } = useRole();

  const options = useMemo(() => {
    const baseOptions = [
      {
        title: "Dashboard",
        path: "dashboard",
        badge: false,
        icon: getIcon("eva:pie-chart-2-fill"),
      },
    ];

    // if (privileges?.my_attendance?.sidebar) {
    //   baseOptions.push({
    //     title: "My Attendance",
    //     path: "/my-attendance",
    //     badge: false,
    //     icon: getIcon("heroicons-outline:presentation-chart-line"),
    //   });
    // }
    // if (privileges?.employee?.sidebar) {
    //   baseOptions.push({
    //     title: "Team Members",
    //     path: "/team-member",
    //     icon: getIcon("fe:users"),
    //     badge: false,
    //   });
    // }
    // if (privileges?.my_team?.sidebar) {
    //   baseOptions.push({
    //     title: "My Team",
    //     path: "/my-team-member",
    //     icon: getIcon("fluent:people-team-add-24-filled"),
    //     badge: false,
    //   });
    // }
    // if (privileges?.role?.sidebar) {
    //   baseOptions.push({
    //     title: "Roles",
    //     path: "/roles",
    //     badge: false,
    //     icon: getIcon("carbon:user-role"),
    //   });
    // }
    // if (privileges?.leaves?.sidebar) {
    //   baseOptions.push({
    //     title: "All Leaves",
    //     badge: sidebarStatus?.leaves ? true : false,
    //     icon: getIcon("majesticons:door-exit"),
    //     children: [
    //       {
    //         title: "Pending Leave",
    //         path: "/pending-admin-leave",
    //         icon: getIcon("mdi:beach"),
    //       },
    //       {
    //         title: "Leaves",
    //         path: "/approved-admin-leave",
    //         icon: getIcon("mdi:beach"),
    //       },
    //     ],
    //   });
    // }
    // if (
    //   role?.title === "HR" ||
    //   role?.title === "Admin" ||
    //   role?.title === "All"
    // ) {
    //   baseOptions.push({
    //     title: "Reports",
    //     badge: sidebarStatus?.leaves ? true : false,
    //     icon: getIcon("carbon:report"),
    //     children: [
    //       {
    //         title: "Leaves Report",
    //         path: "/leave-maintenance-list",
    //         icon: getIcon("mdi:beach"),
    //       },
    //     ],
    //   });
    // }
    // if (privileges?.my_leaves?.sidebar) {
    //   baseOptions.push({
    //     title: "My Leaves",
    //     path: "/leaves",
    //     badge: sidebarStatus?.my_leaves ? true : false,
    //     icon: getIcon("mdi:beach"),
    //   });
    // }
    // if (privileges?.loans?.sidebar) {
    //   baseOptions.push({
    //     title: "Loan ",
    //     path: "/loan",
    //     badge: sidebarStatus?.loans ? true : false,
    //     icon: getIcon("game-icons:pay-money"),
    //   });
    // }
    // if (privileges?.my_loans?.sidebar) {
    //   baseOptions.push({
    //     title: "My Loan",
    //     path: "/my-loan-request",
    //     badge: sidebarStatus?.my_loans ? true : false,
    //     icon: getIcon("solar:hand-money-linear"),
    //   });
    // }
    // if (privileges?.lunch?.sidebar) {
    //   baseOptions.push({
    //     title: "Lunch",
    //     path: "/lunch",
    //     badge: sidebarStatus?.lunch ? true : false,
    //     icon: getIcon("emojione-monotone:pot-of-food"),
    //   });
    // }
    // if (privileges?.fine_sheet?.sidebar) {
    //   baseOptions.push({
    //     title: "Fines",
    //     path: "/fine",
    //     badge: sidebarStatus?.fine_sheet ? true : false,
    //     icon: getIcon("carbon:websheet"),
    //   });
    // }
    // if (privileges?.allowance?.sidebar) {
    //   baseOptions.push({
    //     title: "Allowances",
    //     path: "/allowances",
    //     badge: sidebarStatus?.allowance ? true : false,
    //     icon: getIcon("carbon:event"),
    //   });
    // }
    // if (privileges?.payroll?.sidebar) {
    //   baseOptions.push({
    //     title: "Payroll",
    //     path: "/payroll",
    //     badge: sidebarStatus?.payroll ? true : false,
    //     icon: getIcon("simple-icons:amazonpay"),
    //   });
    // }

    // if (privileges?.department?.sidebar) {
    //   baseOptions.push({
    //     title: "Departments",
    //     path: "/department",
    //     badge: false,
    //     icon: getIcon("tabler:git-branch"),
    //   });
    // }
    // if (privileges?.company?.sidebar) {
    //   baseOptions.push({
    //     title: "Companies",
    //     path: "/companies",
    //     badge: false,
    //     icon: getIcon("arcticons:company-portal"),
    //   });
    // }
    // if (privileges?.attendance?.sidebar) {
    //   baseOptions.push({
    //     title: "Attendance",
    //     path: "/attendance",
    //     badge: false,
    //     icon: getIcon("fluent:presence-away-24-filled"),
    //   });
    // }
    // if (privileges?.announcement?.sidebar) {
    //   baseOptions.push({
    //     title: "Announcements",
    //     path: "/announcement",
    //     badge: sidebarStatus?.announcement ? true : false,

    //     icon: getIcon("mdi:announcement-outline"),
    //   });
    // }

    // if (
    //   privileges?.upcomming_anniversary?.sidebar ||
    //   privileges?.upcomming_birthdays?.sidebar ||
    //   privileges?.upcomming_increments?.sidebar
    // ) {
    //   baseOptions.push({
    //     title: "Events",
    //     icon: getIcon("mdi:event-star"),
    //     children:
    //       privileges?.upcomming_anniversary?.sidebar &&
    //       privileges?.upcomming_birthdays?.sidebar &&
    //       privileges?.upcomming_increments?.sidebar
    //         ? [
    //             {
    //               title: "Upcoming Anniversary",
    //               path: "/upcoming-anniversary",
    //               icon: getIcon("mdi:party-popper"),
    //             },
    //             {
    //               title: "Upcoming Birthdays",
    //               path: "/upcoming-birthdays",
    //               icon: getIcon("mdi:birthday-cake"),
    //             },
    //             {
    //               title: "Upcoming Increments",
    //               path: "/upcoming-increments",
    //               icon: getIcon("mdi:account-cash"),
    //             },
    //           ]
    //         : [
    //             privileges?.upcomming_anniversary?.sidebar
    //               ? {
    //                   title: "Upcoming Anniversary",
    //                   path: "/upcoming-anniversary",
    //                   icon: getIcon("mdi:party-popper"),
    //                 }
    //               : privileges?.upcomming_birthdays?.sidebar
    //               ? {
    //                   title: "Upcoming Birthdays",
    //                   path: "/upcoming-birthdays",
    //                   icon: getIcon("mdi:birthday-cake"),
    //                 }
    //               : privileges?.upcomming_increments?.sidebar
    //               ? {
    //                   title: "Upcoming Increments",
    //                   path: "/upcoming-increments",
    //                   icon: getIcon("mdi:account-cash"),
    //                 }
    //               : {
    //                   title: "No Upcoming Events",
    //                   icon: getIcon("nonicons:not-found-16"),
    //                 },
    //           ],
    //   });
    // }

    // if (
    //   privileges?.asset?.sidebar ||
    //   privileges?.brand?.sidebar ||
    //   privileges?.category?.sidebar ||
    //   privileges?.vendor?.sidebar
    // ) {
    //   baseOptions.push({
    //     title: "Company Assets",
    //     icon: getIcon("fluent:web-asset-24-filled"),
    //     children: [],
    //   });
    // }
    // if (privileges?.expense?.sidebar || privileges?.expense_category?.sidebar) {
    //   baseOptions.push({
    //     title: "Expense",
    //     icon: getIcon("game-icons:money-stack"),
    //     children: [],
    //   });
    // }
    // if (
    //   privileges?.feedback_template?.sidebar ||
    //   privileges?.feedback?.sidebar
    // ) {
    //   baseOptions.push({
    //     title: "Teams Feedback",
    //     path: "/feedbackss",
    //     icon: getIcon("ic:round-feedback"),
    //     children: [],
    //   });
    // }
    // if (privileges?.support?.sidebar) {
    //   baseOptions.push({
    //     title: "Support",
    //     path: "/support-tickets",
    //     icon: getIcon("mdi:support"),
    //     badge: sidebarStatus?.supports ? true : false,
    //   });
    // }
    // if (privileges?.my_support?.sidebar) {
    //   baseOptions.push({
    //     title: "My Support",
    //     path: "/my-support-tickets",
    //     icon: getIcon("fluent:person-support-24-filled"),
    //     badge: sidebarStatus?.my_supports ? true : false,
    //   });
    // }
    // if (privileges?.feedback_and_improvements?.sidebar) {
    //   baseOptions.push({
    //     title: "Feedback Improvement",
    //     path: "/improvement-feedback",
    //     icon: getIcon("fluent:person-feedback-20-filled"),
    //     badge: sidebarStatus?.feedback_and_improvements ? true : false,
    //   });
    // }
    // if (privileges?.general_settings?.sidebar) {
    //   baseOptions.push({
    //     title: "General Settings",
    //     path: "/general-settings",
    //     icon: getIcon("ant-design:setting-outlined"),
    //   });
    // }

    // if (privileges?.tax_calculator?.sidebar) {
    //   baseOptions.push({
    //     title: "Tax Calculator",
    //     path: "/calculator",
    //     badge: sidebarStatus?.tax_calculator ? true : false,
    //     icon: getIcon("ri:calculator-line"),
    //   });
    // }
    // if (
    //   privileges?.asset?.sidebar ||
    //   privileges?.brand?.sidebar ||
    //   privileges?.category?.sidebar ||
    //   privileges?.vendor?.sidebar
    // ) {
    //   baseOptions.forEach((item, index) => {
    //     if (item.title === "Company Assets") {
    //       if (privileges?.asset?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "All Assets",
    //           path: "/company-assets",
    //           icon: getIcon("mdi:briefcase-outline"),
    //         });
    //       }
    //       if (privileges?.category?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Assets Categories ",
    //           path: "/assets-categories",
    //           icon: getIcon("carbon:collapse-categories"),
    //         });
    //       }
    //       if (privileges?.vendor?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Vendors",
    //           path: "/assets-vendors",
    //           icon: getIcon("mdi:handshake-outline"),
    //         });
    //       }
    //       if (privileges?.brand?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Brands ",
    //           path: "/assets-brands",
    //           icon: getIcon("mdi:tag-outline"),
    //         });
    //       }
    //     }
    //   });
    // }

    // if (privileges?.expense?.sidebar || privileges?.expense_category?.sidebar) {
    //   baseOptions.forEach((item, index) => {
    //     if (item.title === "Expense") {
    //       if (privileges?.expense?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Top Up",
    //           path: "/top-up",
    //           icon: getIcon("game-icons:money-stack"),
    //         });
    //       }
    //       if (privileges?.expense?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Expense",
    //           path: "/expense",
    //           icon: getIcon("game-icons:money-stack"),
    //         });
    //       }
    //       if (privileges?.expense_category?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Expense Category",
    //           path: "/expenses_category",
    //           icon: getIcon("game-icons:money-stack"),
    //         });
    //       }
    //     }
    //   });
    // }

    // if (
    //   privileges?.feedback_template?.sidebar ||
    //   privileges?.feedback?.sidebar
    // ) {
    //   baseOptions.forEach((item, index) => {
    //     if (item.title === "Teams Feedback") {
    //       if (privileges?.feedback_template?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Feedback Template",
    //           path: "/feedbacks-templates",
    //           badge: sidebarStatus?.feedback_template ? true : false,
    //           icon: getIcon("ic:round-feedback"),
    //         });
    //       }
    //       if (privileges?.feedback?.sidebar) {
    //         baseOptions[index].children.push({
    //           title: "Feedback",
    //           path: "/feedback",
    //           badge: sidebarStatus?.feedback_template ? true : false,
    //           icon: getIcon("simple-icons:reacthookform"),
    //         });
    //       }
    //     }
    //   });
    // }

    return baseOptions;
    // eslint-disable-next-line
  }, [privileges, sidebarStatus, role]);

  return options;
};
