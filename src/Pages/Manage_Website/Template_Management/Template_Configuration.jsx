import React, { useState, useEffect } from "react";
import ReactTable from "@meta-dev-zone/react-table";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import DeletingModal from "../../../Components/GeneralComponents/CustomDeletingModal";
import DeletionConfirmation from "../../Exhibitors/DeletingUser";
import {
  Deleting_Template_Configuration,
  Template_Configuration_List,
} from "../../../DAL/Login/Login";
import { useSnackbar } from "notistack";
import HeaderWithBackButton from "../../../Components/backButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TemplateConfiguration() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [Templates, setTemplates] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [valueForDeleting, setValueForDeleting] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const FetchTemplateConfig = async (page, rowsPerPage, SearchTemplate) => {
    setLoading(true);
    const response = await Template_Configuration_List(
      page,
      rowsPerPage,
      SearchTemplate
    );
    if (response.code === 200) {
      const { template_configuration, total_count, total_pages } = response;
      const proccessedData = template_configuration.map((item) => ({
        ...item,
        name: item.template_name || "Unknown",
        status: item.template_status,
      }));
      setTemplates(proccessedData);
      setTotalCount(total_pages);
      setTotalPages(total_count);
      localStorage.setItem("rowsPerPage", totalCount);
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setLoading(false);
  };

  const searchFunction = async (e) => {
    e.preventDefault();
    localStorage.setItem("searchText_Template_Config_page", searchText);
    setPage(0);
    await FetchTemplateConfig(0, rowsPerPage, searchText);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    FetchTemplateConfig(newPage, rowsPerPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    FetchTemplateConfig(0, newRowsPerPage);
  };

  const HandleEditingTemplate = (value) => {
    navigate(`/template-configuration/edit-template/${value._id}`, {
      state: value,
    });
  };

  const handleAddingTemplate = () => {
    navigate("/template-configuration/add-template");
  };

  const HandleDeletingTemplate = (value) => {
    setValueForDeleting(value);
    setModelOpen(true);
  };

  const onCancel = () => {
    setModelOpen(false);
  };

  const onConfirm = async (e) => {
    e.preventDefault();
    const response = await Deleting_Template_Configuration(
      valueForDeleting._id
    );
    if (response.code === 200) {
      // eslint-disable-next-line
      const TemplatesAfterDeletion = Templates.filter((user) => {
        if (user._id !== valueForDeleting._id) {
          // eslint-disable-next-line
          return (user.name = user.name);
        }
      });
      setTotalPages((prev) => prev - 1);
      setTemplates(TemplatesAfterDeletion);
      enqueueSnackbar(response.message, { variant: "success" });
    } else {
      enqueueSnackbar(response.message, { variant: "error" });
    }
    setModelOpen(false);
  };

  const TABLE_HEAD = [
    { id: "action", label: "Action", type: "action" },
    {
      id: "any",
      label: "Template Name",
      className: "cursor-pointer",
      renderData: (row, index) => {
        return <span>{row.template_name}</span>;
      },
    },
    {
      id: "page_component_name",
      label: "Template Type",
      type: "page_component_name",
    },
    {
      id: "status",
      label: "Status",
      type: "row_status",
    },
  ];

  const Menu_Options = [
    {
      label: "Edit",
      icon: <EditIcon />,
      handleClick: HandleEditingTemplate,
    },
    {
      label: "Delete",
      icon: <DeleteForeverIcon className="Delete-Icon" />,
      handleClick: HandleDeletingTemplate,
    },
  ];

  useEffect(() => {
    const savedSearchText = localStorage.getItem(
      "searchText_Template_Config_page"
    );
    const count = localStorage.getItem("rowsPerPage");
    if (savedSearchText) {
      setSearchText(savedSearchText);
      FetchTemplateConfig(page, rowsPerPage, savedSearchText);
      setTotalPages(count);
    } else {
      FetchTemplateConfig(page, rowsPerPage);
    }
    // eslint-disable-next-line
  }, [page, rowsPerPage]);

  return (
    <div className="row my-4 mx-3">
      <div className="d-flex justify-content-between align-items-center my-4 ">
        <HeaderWithBackButton
          className="Layout-heading"
          title="Template Configuration"
        />
        <Button
          variant="contained"
          size="medium"
          onClick={handleAddingTemplate}
          className="Data-Adding-Btn"
        >
          Create Template
        </Button>
      </div>
      <div className="Template_Configuration">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center circular_progress_bar ">
            <CircularProgress />
          </div>
        ) : (
          <ReactTable
            data={Templates}
            TABLE_HEAD={TABLE_HEAD}
            MENU_OPTIONS={Menu_Options}
            custom_pagination={{
              total_count: totalCount,
              rows_per_page: rowsPerPage,
              page: page,
              total_pages: totalPages,
              handleChangePage: handleChangePage,
              handleRowsPerPageChange: handleRowsPerPageChange,
            }}
            custom_search={{
              searchText: searchText,
              setSearchText: setSearchText,
              handleSubmit: searchFunction,
            }}
            class_name=""
            theme_config={{
              background: "white",
              color: "black",
              iconColor: "#7396CC",
            }}
            is_sticky_header={false}
            is_hide_footer_pagination={false}
            is_hide_header_pagination={false}
            is_hide_search={false}
          />
        )}
      </div>
      <DeletingModal
        className="Deleting-modal"
        open={modelOpen}
        handleClose={() => setModelOpen(false)}
        component={
          <DeletionConfirmation
            onConfirm={(e) => onConfirm(e)}
            onCancel={onCancel}
          />
        }
      />
    </div>
  );
}

export default TemplateConfiguration;
