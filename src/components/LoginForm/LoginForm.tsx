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
import { FlexBox } from "../ui/FlexBox";

// Define the form schema using zod
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginFormInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const { isPending, login } = useLogin();

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "test@mail.com",
      password: "12341234",
    },
  });

  const handleSubmit = (values: z.infer<typeof loginFormSchema>) => {
    // Extracting form data
    const { email, password } = values;

    login({ email, password });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-4/6 gap-4 mx-auto max-w-md"
        >
          <FlexBox
            container
            flexDirection="column"
            gap="20px"
            justifyContent="space-between"
          >
            {/* form.control is used to validate that the name is correct/register the field */}

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
          </FlexBox>

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

export default LoginForm;
