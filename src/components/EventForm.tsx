import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAddEvent } from '../hooks/useEvents';
import { DayState } from '../types/types';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import TimeSelect from './ui/TimeSelect';

interface EventFormProps {
  selectedDay: DayState;
  eventType: string;
  setFormEventType: Dispatch<SetStateAction<string | null>>;
  isCreating?: boolean;
}

// Define the form schema using zod
const eventFormSchema = z.object({
  event_start_time: z.string().min(1),
  event_end_time: z.string(),
  location: z.string(),
});

export type EventFormInputs = {
  event_start_time: string;
  event_end_time: string;
  location: string;
};

function EventForm({
  selectedDay,
  eventType,
  setFormEventType,
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
    },
  });

  const currentStartTime = form.watch("event_start_time");

  const handleSubmit = (values: z.infer<typeof eventFormSchema>) => {
    console.log(values);

    // Extracting form data
    const { event_start_time, event_end_time, location } = values;

    // Prepare the event data object. Adjust keys as necessary for your backend/API.
    const eventData = {
      event_start_time,
      event_end_time,
      location,
      event_type: eventType,
      day_id: selectedDay.id,
    };

    // Call the mutate function to submit the event data
    mutate(eventData, {
      onSuccess: () => {
        // Handle success, e.g., reset the form, show a success message
        form.reset();
        console.log("Event added successfully");
        setFormEventType(null);
      },
      onError: (error) => {
        // Handle error, e.g., show an error message
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
          <div className="flex flex-row gap-4 justify-evenly">
            {/* form.control is used to validate that the name is correct/register the field */}
            <FormField
              control={form.control}
              name="event_start_time"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="event_start_time">
                      Enter start time
                    </FormLabel>
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
                    <FormLabel htmlFor="event_end_time">
                      Enter end time
                    </FormLabel>

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
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => {
              return (
                <FormItem className="text-2xl">
                  <FormLabel htmlFor="location">Enter location</FormLabel>
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
