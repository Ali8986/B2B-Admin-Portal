import ReactDataTable from "../GeneralComponents/React_Table";
const TABLE_HEAD_leaves_List = [
  {
    id: "any",
    label: "#",
    renderData: (row, index) => index + 1,
  },
  {
    id: "any",
    label: "Member Name",
  },
  {
    id: "any",
    label: "Leave Date",
  },

  {
    id: "any",
    label: "Leave Type",
  },
  {
    id: "status",
    label: "status",
  },
];

const MENU_OPTIONS = [];
const MembersLeavesTable = ({ OnLeaveMembersList }) => {
  return (
    <ReactDataTable
      data={OnLeaveMembersList}
      header={TABLE_HEAD_leaves_List}
      Menu={MENU_OPTIONS}
      pagination={{}}
      search={{}}
      is_sticky_header={false}
      is_hide_footer_pagination={true}
      is_hide_header_pagination={true}
      is_hide_search={true}
    />
  );
};

export default MembersLeavesTable;
