import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAddEvent } from "@/hooks/useEvents";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/Form";
import TimeSelect from "../../ui/TimeSelect";
import { Input } from "../../ui/Input";
import { Button } from "../../ui/button";
import { DayState } from "@/types/types";

interface LoginFormProps {
  selectedDay: DayState;
  eventType: string;
  setFormEventType: Dispatch<SetStateAction<string | null>>;
  isCreating?: boolean;
}

// Define the form schema using zod
const loginFormSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type LoginFormInputs = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

function LoginForm() {
  const { mutate } = useAddEvent(0);

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);

    // Extracting form data
    const { first_name, last_name, email, password } = values;
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-4/6 mx-auto gap-4"
        >
          <div className="flex flex-col gap-4 justify-evenly">
            {/* form.control is used to validate that the name is correct/register the field */}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="email">Enter email</FormLabel>
                  <FormControl>
                    <Input type="email" id="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="password">Enter password</FormLabel>
                  <FormControl>
                    <Input type="password" id="password" {...field} />
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
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
