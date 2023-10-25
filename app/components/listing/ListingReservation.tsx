"use client";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingResrvationProps {
  price: number;
  dateRange: Range;
  dayCount: number; // number of nights booked
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingResrvationProps> = ({
  price,
  dateRange,
  dayCount,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border-[1px]
        border-neutral-200
        bg-white
    "
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">${price}</div>
        <div className="font-light text-neutral-600">per night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit}></Button>
      </div>
      <div
        className="
        flex
        flex-row
        items-center
        justify-between
        p-4
        text-lg
        font-semibold
      "
      >
        <div className="flex flex-row">
          <div>Total</div>
          {dayCount > 0 && (
            <div className="px-1 font-light text-neutral-600">{`(${dayCount} night${
              dayCount > 1 ? "s" : ""
            })`}</div>
          )}
        </div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
