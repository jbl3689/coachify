import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createUser } from '../services/apiUsers';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';

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
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast("User added");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      reset();
    },
    onError: (error) => {
      toast("Error adding user");
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
      <Form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2">
        <div>
          <FormRow
            label="First name"
            error={errors?.first_name?.message as string}
          >
            <Input
              type="text"
              id="first_name"
              disabled={isPending}
              {...register("first_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow
            label="Last name"
            error={errors?.last_name?.message as string}
          >
            <Input
              type="text"
              id="last_name"
              disabled={isPending}
              {...register("last_name", {
                required: "This field is required",
              })}
            />
          </FormRow>
          <FormRow label="Email" error={errors?.email?.message as string}>
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
