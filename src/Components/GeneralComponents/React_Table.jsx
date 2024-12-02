import ReactTable from "@meta-dev-zone/react-table";

const ReactDataTable = ({
  data,
  header,
  Menu,
  pagination,
  search,
  is_sticky_header = false,
  is_hide_footer_pagination = false,
  is_hide_header_pagination = false,
  is_hide_search = false,
  CustomStyling = "",
}) => {
  return (
    <>
      <ReactTable
        data={data}
        TABLE_HEAD={header}
        MENU_OPTIONS={Menu}
        custom_pagination={pagination}
        custom_search={search}
        class_name={CustomStyling}
        theme_config={{
          background: "white",
          color: "black",
          iconColor: "#006599",
        }}
        is_sticky_header={is_sticky_header}
        is_hide_footer_pagination={is_hide_footer_pagination}
        is_hide_header_pagination={is_hide_header_pagination}
        is_hide_search={is_hide_search}
      />
    </>
  );
};

export default ReactDataTable;
