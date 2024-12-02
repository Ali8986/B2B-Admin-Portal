import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import FilterAltOffRoundedIcon from "@mui/icons-material/FilterAltOffRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import AutoComplete from "../../Components/GeneralComponents/AutoComplete";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import moment from "moment";
import {
  _get_active_employees_for_loan,
  Feedback_listing,
} from "../../DAL/Listings/feedbacks/feedbacklisting";

const FeedbackFilter = ({
  selectedDate,
  filterData,
  value,
  searchFunction,
  RemoveFilterData,
  handleCompanyNameChange,
}) => {
  const [empName, setEmpName] = useState();
  const [searchText, setSearchText] = useState("");
  // const [selectedDate, setSelectedDate] = useState(dayjs());
  const [DataList, setDataList] = useState([]);

  const handleSearchInputChange = (event, newValue) => {
    setEmpName(newValue);
    setSearchText(newValue);
  };

  const handleDateChange = (newValue) => {
    // setSelectedDate(newValue);
    // setDateForFilter(moment(newValue.$d).format("YYYY-MM"));
    filterData((prev) => {
      return {
        ...prev,
        date: moment(newValue.$d).format("YYYY-MM"),
      };
    });

    // console.log(
    //   DateForFilter,
    //   "DateForFilterDateForFilterDateForFilterDateForFilterDateForFilter"
    // );
  };
  const handleFocus = async (search) => {
    const response = await _get_active_employees_for_loan(search);
    if (response.code === 200) {
      setDataList(response.employee);
    } else {
      console.log("Error in fetching data");
    }
  };

  useEffect(() => {
    if (searchText) {
      const timeoutId = setTimeout(() => {
        handleFocus(searchText);
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line
  }, [searchText]);
  console.log(filterData, "filterData");
  return (
    <form className="row" onSubmit={searchFunction}>
      <div className="col-12 mt-4">
        <AutoComplete
          optionLabelKey="full_name"
          isMultiple={false}
          onFocus={handleFocus}
          value={value}
          searchCompanyData={DataList}
          handleCompanyNameChange={handleCompanyNameChange}
          onInputChange={handleSearchInputChange}
          DataNotFound="Not a company name"
          label="Select Company"
        />
      </div>
      <div className="col-12 mt-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="col-12"
            value={selectedDate}
            onChange={handleDateChange}
            label="Select Month"
            views={["month", "year"]}
          />
        </LocalizationProvider>
      </div>
      <div className="col-12 d-flex justify-content-end mt-3">
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="Data-Adding-Btn"
          startIcon={<TuneRoundedIcon />}
        >
          Apply Filter
        </Button>
      </div>
      <div className="col-12 d-flex justify-content-end mt-3">
        <Button
          fullWidth
          variant="contained"
          onClick={RemoveFilterData}
          className="Data-Adding-Btn"
          startIcon={<FilterAltOffRoundedIcon />}
        >
          Clear Filter
        </Button>
      </div>
    </form>
  );
};

export default FeedbackFilter;
