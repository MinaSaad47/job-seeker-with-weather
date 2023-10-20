import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import { ValidateProfile } from "../validations/profile.validation";
import Modal from "./Modal";
import SkillItem from "./SkillItem";
import TextField from "./TextField";

const SkillsDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [skill, setSkill] = useState("");
  const { getValues } = useFormContext<z.infer<typeof ValidateProfile>>();
  const {
    fields: skills,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({ name: "skills" });

  const handleAddSkill = () => {
    if (skill.trim().length < 5) {
      toast.warn("skill must at least contains 5 characters", {
        position: "bottom-center",
      });
      return;
    }
    appendSkill(skill);
    setSkill("");
    setShowModal(false);
  };

  const renderSkills = skills.map((_item, index) => (
    <SkillItem
      onClick={() => removeSkill(index)}
      icon={<FaTrash className="text-red-500" size={20} />}
      key={index}>
      {getValues(`skills.${index}`)}
    </SkillItem>
  ));

  return (
    <div className="h-fit flex flex-col gap-10 bg-white rounded-xl p-4 h-[650px]">
      <div className="text-xl h-14 flex justify-between">Skills</div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {renderSkills}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="px-10 bg-primary text-white rounded  hover:scale-105 hover:bg-primary-400 duration-300 p-2 flex items-center justify-center gap-2">
          add Skill
        </button>
      </div>
      <Modal onClose={() => setShowModal(false)} open={showModal}>
        <div className="m-4 flex flex-col items-center gap-4">
          <TextField
            label="Skill"
            value={skill}
            onChange={(e: any) => setSkill(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary text-white rounded px-10 hover:scale-105 hover:bg-primary-300 duration-300 flex gap-2 items-center justify-center p-2"
            onClick={handleAddSkill}>
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SkillsDetails;
