"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { createRentingRequest } from "@/services/RentingService";
import { IListing,  } from "@/types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const RentRequestModal = ({ listing }: { listing: IListing }) => {
  const [open, setOpen] = useState(false);
  const form = useForm();
  const { user } = useUser();
  const {
    formState: { isSubmitting },
  } = form;

  // console.log("user in renting", user);
  // console.log("listing details", listing);

  const handleAuthorizeUser = () => {
    toast.error("You are not allowed! Please login first!");
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    if (!data?.isAgree || data?.isAgree == "undefined") {
      toast.error("Please agree with the terms and conditions");
      return;
    }

    if(user?.userRole !== "tenant"){
      toast.error("Please register as a tenant to book this house!!!");
      return;
    }

    const requestingDetails = {
      listing: listing?._id,
      landlord: listing?.landLord?._id,
      tenant: user?.userId as string,
      moveInDate: data?.moveInDate,
      duration: Number(data?.duration),
      rentalStatus: "pending",
      paymentStatus: "",
      transactionId: "",
      landlordPhone: "",
    };

    console.log("requestingDetails", requestingDetails);
    try {
      const res = await createRentingRequest(requestingDetails);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        setOpen(false);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!user ? (
        <Button onClick={handleAuthorizeUser} className="w-full mt-5">
          Click For Renting
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} className="w-full mt-5">Request For Renting</Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Renting Information</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="moveInDate"
              render={({ field }) => (
                <FormItem className="flex flex-col my-4">
                  <FormLabel>Move-in Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "yyyy-MM-dd") // Format date as YYYY-MM-DD
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(date.toISOString().split("T")[0]); // Store as YYYY-MM-DD
                          }
                        }}
                        disabled={(date) => date < new Date()} // Disable past dates
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration of Months</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAgree"
              render={({ field }) => (
                <FormItem className="mt-5 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I'm accepting the terms and conditions
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-5 w-full">
              {isSubmitting ? "Creating...." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RentRequestModal;
