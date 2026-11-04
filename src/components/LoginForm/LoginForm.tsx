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
      email: "",
      password: "",
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
          className="mx-auto flex w-full max-w-md flex-col gap-6"
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
                <FormItem className="w-full text-left">
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@yourclub.com"
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
                <FormItem className="w-full text-left">
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
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

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Logging in…" : "Log in"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
