import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import { useLogin } from "@/hooks/auth/useLogin";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { Select } from "../ui/select";

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

function UserForm() {
  const { isPending, login } = useLogin();

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      full_name: "",
      pos_primary: "",
      pos_secondary: "",
      email: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof userFormSchema>) => {
    // Extracting form data
    const { full_name, pos_primary, pos_secondary, email } = values;

    // login({ email });
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
              name="pos_primary"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="pos_primary">
                      Primary Position
                    </FormLabel>
                    <FormControl>
                      <Select />
                    </FormControl>
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
                  <FormLabel htmlFor="email">Enter email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      {...field}
                      disabled={isPending}
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
