import Datepicker from "tailwind-datepicker-react";
import { useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Dispatch, SetStateAction } from "react";

export default function DatePicker({
  setSelectedDate,
  selectedDate,
  age,
}: {
  setSelectedDate: Dispatch<SetStateAction<Date | null>>;
  selectedDate: Date | null;
  age?: Number | null;
}) {
  const options = {
    title: "Select Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2020-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-white dark:bg-gray-800",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "text-neutral-300",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => (
        <span>
          <ArrowLeftIcon className="w-4 h-4" />
        </span>
      ),
      next: () => (
        <span>
          <ArrowRightIcon className="w-4 h-4" />
        </span>
      ),
    },
    datepickerClassNames: "absolute top-0 left-0",
    defaultDate: new Date(
      selectedDate ? selectedDate?.toDateString() : "2016-01-01"
    ),
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
  };

  const [show, setShow] = useState<boolean>(false);

  const handleChange = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    console.log(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  return (
    <div>
      <Datepicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      >
        <div className="relative outline outline-1 outline-neutral-400 p-2 rounded">
          <CalendarIcon className="w-4 h-4 absolute inset-y-2.5 left-1" />
          <input
            type="text"
            className="pl-5"
            placeholder="Select Date"
            value={selectedDate?.toDateString()}
            onFocus={() => setShow(true)}
            name="birthday"
            readOnly
          />
          {age && (
            <p className="absolute inset-y-2.5 right-2 text-sm text-neutral-500">
              You&apos;re {age.toString()}
            </p>
          )}
        </div>
      </Datepicker>
    </div>
  );
}
