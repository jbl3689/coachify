import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useAddEvent } from "@/hooks/events/useAddEvent";
import { DayState, EventState, eventTypes } from "@/types/types";
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
import { FlexBox } from "../ui/FlexBox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useIncreaseDaySession } from "@/hooks/days/useIncreaseDaySession";
import { useNavigate } from "react-router-dom";
import { useUpdateEvent } from "@/hooks/events/useUpdateEvent";
import { addMinutes, roundToNearestBlock } from "@/utils/calendarLogic";

interface EventFormProps {
  selectedDay: DayState;
  selectedEvent?: EventState;
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
  selectedEvent,
  setIsDialogOpen,
}: EventFormProps) {
  const navigate = useNavigate();

  const { mutate: addEvent, isPending: isPendingCreate } = useAddEvent();
  const { mutate: updateEvent, isPending: isPendingUpdate } = useUpdateEvent();

  const { increaseDaySession, isIncreasingDaySession } =
    useIncreaseDaySession();

  const isLoading =
    isPendingCreate || isPendingUpdate || isIncreasingDaySession;

  const defaultTimeBlock = 15;
  const timeBlockStart = roundToNearestBlock(defaultTimeBlock);
  const timeBlockEnd = roundToNearestBlock(defaultTimeBlock, 60);

  // zodResolver will link the form validation to the schema
  // anytime the data changes, the form will be revalidated based on the form schema
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      event_start_time: selectedEvent?.event_start_time ?? timeBlockStart,
      event_end_time: selectedEvent?.event_end_time ?? timeBlockEnd,
      location: selectedEvent?.location ?? "",
      event_type: selectedEvent?.event_type ?? eventTypes[0],
    },
  });

  const handleSubmit = (values: z.infer<typeof eventFormSchema>) => {
    const { event_start_time, event_end_time, location, event_type } = values;

    const eventData = {
      event_start_time,
      event_end_time,
      location,
      event_type,
      session_number: (selectedDay.num_of_sessions ?? -1) + 1,
      day_id: selectedDay.id,
    };

    if (selectedEvent && selectedEvent.id) {
      updateEvent(
        { id: selectedEvent.id, newEventData: eventData },
        {
          onSuccess: () => {
            console.log("Event updated successfully");
            setIsDialogOpen(false);
            navigate("/calendar");
          },
          onError: (error) => {
            console.error("Error updating event:", error);
          },
        }
      );
    } else {
      addEvent(eventData, {
        onSuccess: () => {
          increaseDaySession(selectedDay.id);
          form.reset();
          console.log("Event added successfully");
          setIsDialogOpen(false);
          navigate("/calendar");
        },
        onError: (error) => {
          console.error("Error adding event:", error);
        },
      });
    }
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
                      <Input
                        type="time"
                        id="event_start_time"
                        {...field}
                        step={600}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
              disabled={isLoading}
            />
            <FormField
              control={form.control}
              name="event_end_time"
              render={({ field }) => {
                return (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="event_end_time">End time</FormLabel>

                    <FormControl>
                      <Input
                        type="time"
                        id="event_end_time"
                        {...field}
                        maxLength={5}
                        step={600}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
              disabled={isLoading}
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </FlexBox>

          <Button
            className="px-24 mx-auto mt-8"
            variant="default"
            type="submit"
            disabled={isLoading}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EventForm;
