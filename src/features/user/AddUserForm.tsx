import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoMdArrowDropdownCircle as DropdownArrow } from "react-icons/io";
import { IoMdArrowDropupCircle as DropupArrow } from "react-icons/io";

import { createUser } from "../../services/apiUsers";

import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

const positions = [
  "GK",
  "LB",
  "CB",
  "RB",
  "LWB",
  "RWB",
  "CDM",
  "CM",
  "CAM",
  "RM",
  "LM",
  "RW",
  "LW",
  "CF",
  "ST",
];

function AddUserForm() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();
  const [formShown, setFormShown] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      alert("User added");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      reset();
    },
    onError: (error) => {
      alert("Error adding user");
      console.error(error);
    },
  });

  const onSubmit = (data: {
    first_name: string;
    last_name: string;
    email: string;
    pos_primary: string;
    pos_secondary: string;
  }) => {
    mutate(data);
  };

  return (
    <>
      <div className="flex justify-center gap-16 pt-2">
        <Heading as="h3" className="text-accentColor">
          Add a Player
        </Heading>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2">
        <div>
          <FormRow label="First name">
            <Input
              type="text"
              id="first_name"
              disabled={isPending}
              {...register("first_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Last name">
            <Input
              type="text"
              id="last_name"
              disabled={isPending}
              {...register("last_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Email">
            <Input
              type="text"
              id="email"
              disabled={isPending}
              {...register("email", {
                required: "This field is required",
              })}
            />
          </FormRow>
        </div>

        <div className="">
          <div className="">
            <FormRow label="Primary Position">
              <select
                id="pos_primary"
                {...register("pos_primary")}
                disabled={isPending}
                className="w-20 mx-auto text-black border border-gray-300 rounded"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </FormRow>
            <FormRow label="Secondary Position">
              <select
                id="pos_secondary"
                {...register("pos_secondary")}
                disabled={isPending}
                className="w-20 mx-auto text-black border border-gray-300 rounded"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </FormRow>
            <div className="flex flex-row items-center justify-center w-auto pt-8">
              <FormRow>
                <>
                  <button
                    type="submit"
                    className="p-2 text-white rounded bg-secondaryColor min-w-24"
                    disabled={isPending}
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="p-2 text-white rounded bg-bgGray min-w-24"
                    disabled={isPending}
                  >
                    Reset
                  </button>
                </>
              </FormRow>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
}

export default AddUserForm;
