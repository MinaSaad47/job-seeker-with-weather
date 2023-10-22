import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaMapMarkerAlt } from "react-icons/fa";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import LocationPicker from "./LocationPicker";
import Modal from "./Modal";

const LocationDetails = () => {
  const {
    formState: { errors },
    trigger,
    setValue,
    getValues,
  } = useFormContext<z.infer<typeof ValidateProfile>>();

  const [location, setLocation] = useState(getValues("location"));
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(false);
    setValue("location", location);
    trigger(["location"]);
  };

  const locationError = (
    <ErrorMessage
      errors={errors}
      name="location"
      render={({ message }) => <p className="text-red-500">{message}</p>}
    />
  );

  return (
    <div className="h-full bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Address Details</div>
      <div className="flex flex-col xl:flex-row justify-center gap-4">
        {getValues("location") && (
          <div className="flex flex-col xl:flex-row justify-center gap-4">
            <div className="flex w-1/2 text-center text-xl  xl:text-2xl ">
              <div className="italic w-full flex flex-col mr-4">Lat:</div>
              {getValues("location.lat").toFixed(2)}
            </div>
            <div className="flex w-1/2 text-center text-xl  xl:text-2xl">
              <div className="italic w-full flex flex-col mr-4">Lng:</div>
              {getValues("location.lng").toFixed(2)}
            </div>
          </div>
        )}
        {locationError}
      </div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-2 bg-primary m-auto text-white rounded p-4 hover:bg-primary-400 hover:scale-110 duration-300 ">
        <FaMapMarkerAlt className="text-2xl" /> Choose Location
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="m-4 flex flex-col items-center gap-3">
          <div className="h-[60vh] aspect-square">
            <LocationPicker
              onChange={setLocation as any}
              value={location as any}
            />
          </div>
          <button
            type="button"
            className="bg-primary text-white text-xl py-2 px-10 hover:scale-110 hover:bg-primary-300 rounded-full"
            onClick={onClick}>
            Accept
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LocationDetails;
