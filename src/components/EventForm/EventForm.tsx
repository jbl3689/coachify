import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAddEvent } from "@/hooks/events/useAddEvent";
import { DayState, eventTypes } from "@/types/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import TimeSelect from "../ui/TimeSelect";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { FlexBox } from "../ui/FlexBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface EventFormProps {
  selectedDay: DayState;
  sessionNumber: number;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
}

// Define the form schema using zod
const eventFormSchema = z.object({
  event_start_time: z.string().min(1),
  event_end_time: z.string().min(1),
  location: z.string(),
  event_type: z.string().min(1),
});

export type EventFormInputs = {
  event_start_time: string;
  event_end_time: string;
  location: string;
  event_type: string;
};

function EventForm({
  selectedDay,
  sessionNumber,
  setIsDialogOpen,
}: EventFormProps) {
  const { mutate } = useAddEvent(0);

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      event_start_time: "18:00",
      event_end_time: "21:00",
      location: "",
      event_type: eventTypes[0],
    },
  });

  const currentStartTime = form.watch("event_start_time");

  const handleSubmit = (values: z.infer<typeof eventFormSchema>) => {
    const { event_start_time, event_end_time, location, event_type } = values;

    const eventData = {
      event_start_time,
      event_end_time,
      location,
      event_type,
      session_number: sessionNumber,
      day_id: selectedDay.id,
    };

    mutate(eventData, {
      onSuccess: () => {
        form.reset();
        console.log("Event added successfully");
        setIsDialogOpen(false);
      },
      onError: (error) => {
        console.error("Error adding event:", error);
      },
    });
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <FlexBox
            container
            flexDirection="row"
            gap="20px"
            justifyContent="space-between"
          >
            {/* form.control is used to validate that the name is correct/register the field */}
            <FormField
              control={form.control}
              name="event_start_time"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="event_start_time">Start time</FormLabel>
                    <FormControl>
                      <TimeSelect id="event_start_time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="event_end_time"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="event_end_time">End time</FormLabel>

                    <FormControl>
                      <TimeSelect
                        id="event_end_time"
                        startTime={parseInt(currentStartTime)}
                        isDisabled={currentStartTime === ""}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </FlexBox>

          <FlexBox
            container
            flexDirection="row"
            gap="20px"
            justifyContent="center"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        id="location"
                        {...field}
                        placeholder="Enter location"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="event_type"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="location">Event type</FormLabel>
                    <FormControl>
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
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </FlexBox>

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

export default EventForm;
