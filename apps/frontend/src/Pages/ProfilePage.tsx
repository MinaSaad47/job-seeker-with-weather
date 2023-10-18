import { FaSave, FaUpload } from "react-icons/fa";

const ProfilePage = () => {
  const renderPersonalDetails = (
    <div className="bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Personal Details</div>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <img
          src="https://placehold.co/400"
          className="h-[150px] w-[150px] object-cover rounded-[50%]"
          alt=""
        />
        <div className="flex flex-col flex-wrap flex-grow text-sm gap-2  w-full">
          <fieldset className="flex flex-col gap-2">
            <label className="" htmlFor="firstName">
              Name
            </label>
            <input
              className="rounded border-2 border-gray-300 p-1"
              type="text"
              placeholder="first name"
              id="firstName"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label className="" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="rounded border-2 border-gray-300 p-1"
              type="text"
              placeholder="last name"
              id="lastName"
            />
          </fieldset>
          <fieldset className="flex flex-col gap-2">
            <label className="" htmlFor="address">
              Address
            </label>
            <input
              className="rounded border-2 border-gray-300 p-1"
              type="text"
              placeholder="address"
              id="address"
            />
          </fieldset>
        </div>
      </div>
    </div>
  );

  const renderContactDetails = (
    <div className="flex flex-col  bg-white rounded-xl p-4">
      <div className="text-xl h-14">Contact Details</div>
      <div className="grid grid-rows-3 grid-col-1 xl:grid-rows-2 xl:grid-col-2 grid-flow-col gap-4">
        <fieldset className="flex flex-col gap-2">
          <label className="" htmlFor="email">
            Email
          </label>
          <input
            className="rounded border-2 border-gray-300 p-1"
            type="text"
            placeholder="email"
            id="email"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="" htmlFor="phone1">
            Phone 1
          </label>
          <input
            className="rounded border-2 border-gray-300 p-1"
            type="text"
            placeholder="phone 1"
            id="phone1"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label className="" htmlFor="phone2">
            Phone 2
          </label>
          <input
            className="rounded border-2 border-gray-300 p-1"
            type="text"
            placeholder="phone 2"
            id="phone2"
          />
        </fieldset>
      </div>
    </div>
  );

  const renderLocationDetails = (
    <div className="bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Location Details</div>
    </div>
  );

  const renderEducationDetails = (
    <div className="bg-white rounded-xl p-4 flex flex-col">
      <div className="text-xl h-14">Education Details</div>
    </div>
  );

  const renderSkills = (
    <div className="row-span-2 flex flex-col gap-10 bg-white rounded-xl p-4 h-[650px] overflow-scroll">
      <div className="text-xl h-14 flex justify-between">Skills</div>
      <div className="flex flex-col gap-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <fieldset key={index} className="flex flex-col gap-2">
              <label className="" htmlFor="skill">
                Skill
              </label>
              <input
                className="rounded border-2 border-gray-300 p-1"
                type="text"
                placeholder="skill"
                id="skill"
              />
            </fieldset>
          ))}
      </div>
    </div>
  );

  return (
    <div className="text-gray-500 min-w-screen min-h-screen bg-gray-200 p-2 md:p-10 flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-4xl">Profile Details</h1>
        <div className="flex flex-col gap-1">
          <button className="bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2">
            <FaSave /> Save
          </button>
          <button className="bg-orange-500 text-white rounded px-10 hover:scale-105 hover:bg-orange-300 duration-300 flex gap-2 items-center justify-center p-2">
            <FaUpload /> Upload Resume
          </button>
        </div>
      </div>
      <div className="grid grid-rows-6 grid-col-1 lg:grid-rows-3 lg:grid-cols-2 grid-flow-col gap-4">
        {renderPersonalDetails}
        {renderContactDetails}
        {renderLocationDetails}
        {renderEducationDetails}
        {renderSkills}
      </div>
    </div>
  );
};

export default ProfilePage;
