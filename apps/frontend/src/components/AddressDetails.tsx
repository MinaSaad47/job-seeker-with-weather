import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";

const LocationDetails = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<z.infer<typeof ValidateProfile>>();

  const [_, updateState] = useState(null);

  return (
    <div className="h-full bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Address Details</div>
      <div className="flex flex-col xl:flex-row gap-4">
        <div className="xl:w-1/2 flex flex-col gap-2">
          <div>Country</div>
          <CountryDropdown
            onChange={(val) => {
              updateState({} as any);
              setValue("address.country", val);
            }}
            classes="p-2 rounded-xl w-full"
            value={getValues("address.country")}
            defaultOptionLabel="Select Country"
          />
          <ErrorMessage
            errors={errors}
            name="address.country"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
        <div className="xl:w-1/2 flex flex-col gap-2">
          <div>Region</div>
          <RegionDropdown
            onChange={(val) => {
              updateState({} as any);
              setValue("address.region", val);
            }}
            classes="p-2 rounded-xl w-full"
            value={getValues("address.region")}
            country={getValues("address.country")}
            defaultOptionLabel="Select Region"
            blankOptionLabel="Select Country First"
          />
          <ErrorMessage
            errors={errors}
            name="address.region"
            render={({ message }) => <p className="text-red-500">{message}</p>}
          />
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name="address"
        render={({ message }) => (
          <p className="text-center text-red-500 mt-4">{message}</p>
        )}
      />
    </div>
  );
};

export default LocationDetails;
