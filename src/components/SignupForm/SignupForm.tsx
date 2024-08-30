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
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { useSignup } from "./hooks/useSignup";

// Define the form schema using zod
const signupFormSchema = z.object({
  full_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignupFormInputs = {
  full_name: string;
  email: string;
  password: string;
};

function SignupForm() {
  const { isPending, signup } = useSignup();

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);

    // Extracting form data
    const { full_name, email, password } = values;

    signup({ full_name, email, password });
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
              name="full_name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="email">Enter full name</FormLabel>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel htmlFor="password">Enter password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
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

export default SignupForm;
