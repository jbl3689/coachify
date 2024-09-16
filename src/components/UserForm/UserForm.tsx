import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PositionAcronym, positionAcronymArray } from "@/types/types";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";

// Define the form schema using zod
const userFormSchema = z.object({
  full_name: z.string().min(2),
  pos_primary: z.string(),
  pos_secondary: z.string(),
  email: z.string().email(),
});

export type UserFormInputs = {
  email: string;
  password: string;
};

interface UserFormProps {
  full_name?: string;
  pos_primary?: string;
  pos_secondary?: string;
  email?: string;
  id?: number;
  onFormClose?: () => void;
}

function UserForm({
  full_name,
  pos_primary,
  pos_secondary,
  email,
  id,
  onFormClose,
}: UserFormProps) {
  const { isPending, updateUser } = useUpdateUser();

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: full_name ?? "",
      pos_primary: pos_primary ?? "",
      pos_secondary: pos_secondary ?? "",
      email: email ?? "",
    },
  });

  const handleSubmit = (values: z.infer<typeof userFormSchema>) => {
    // Extracting form data
    const { full_name, pos_primary, pos_secondary, email } = values;

    // Typecasting pos_primary and pos_secondary to PositionAcronym
    const castedPosPrimary = pos_primary as PositionAcronym;
    const castedPosSecondary = pos_secondary as PositionAcronym;

    if (id === undefined) {
      console.log("Adding user");
    } else {
      updateUser({
        newUserData: {
          id,
          full_name,
          pos_primary: castedPosPrimary,
          pos_secondary: castedPosSecondary,
          email,
        },
        id,
      });
    }

    onFormClose?.();
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-4/6 gap-4 mx-auto"
        >
          <div className="flex flex-col gap-4 justify-evenly">
            {/* form.control is used to validate that the name is correct/register the field */}

            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="full_name">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="full_name"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pos_primary"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="pos_primary">
                      Primary Position
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positionAcronymArray.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the players primary position
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="pos_secondary"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="pos_secondary">
                      Secondary Position
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positionAcronymArray.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the players secondary position
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      disabled={isPending || email !== undefined}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="px-24 mx-auto mt-8"
            variant="default"
            type="submit"
            disabled={isPending}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default UserForm;
