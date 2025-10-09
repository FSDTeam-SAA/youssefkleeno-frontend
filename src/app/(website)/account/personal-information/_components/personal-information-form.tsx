"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "FullName must be at least 2 characters.",
  }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, {
    message: "Phone Number must be at least 10 characters.",
  }),
  // phoneNumber: z
  //   .string()
  //   .regex(/^\+?[0-9]{10,15}$/, { message: "Enter a valid phone number." }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(2, {
    message: "Zip Code must be at least 2 characters.",
  }),
  street: z.string().min(2, {
    message: "Zip Code must be at least 2 characters.",
  }),
  dob: z.date({
    message: "Please select a start date",
  }),
});

export interface ProfileResponse {
  success: boolean;
  message: string;
  data: {
    avatar: {
      public_id: string;
      url: string;
    };
    _id: string;
    name: string;
    dob: string;
    email: string;
    lastActive: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    city: string;
    phone: string;
    state: string;
    street: string;
    zip: string;
  };
}

const PersonalInformationForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGJmZjg3NzIwZmZmYTNiYjA2ZjEyMDYiLCJlbWFpbCI6Im5pbG95QGV4YW1wbGUuY29tIiwiaWF0IjoxNzU5OTA0MDczLCJleHAiOjE3NTk5OTA0NzN9.mn6lRS1vsu-PjKQO0KRFZLAY135W9YRsEVc1R6Z5nCo";
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dob: undefined,
      city: "",
      state: "",
      zipCode: "",
      street: "",
    },
  });

  // profile get api
  const { data } = useQuery<ProfileResponse>({
    queryKey: ["profile"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data?.data?.name,
        email: data?.data?.email,
        phoneNumber: data?.data?.phone,
        dob: new Date(data?.data?.dob),
        city: data?.data?.city,
        state: data?.data?.state,
        zipCode: data?.data?.zip,
        street: data?.data?.street,
      });
    }
  }, [data, form]);

  // profile post api
  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (formData: FormData) =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update-profile`, {
        method: "PATCH",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }).then((res) => res.json()),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phoneNumber);
    formData.append("city", values.city);
    formData.append("state", values.state);
    formData.append("zip", values.zipCode);
    formData.append("street", values.street);
    formData.append("dob", values.dob.toString());
    mutate(formData);
  }
  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_#00000029]">
      <div className="w-full bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-between py-5 md:py-[25px] lg:py-[29px] px-6 md:px-7 lg:px-8 rounded-t-[12px]">
        <h4 className="text-lg font-medium text-[#282828] leading-[120%]">
          Personal Information
        </h4>
        <div>
          {isEditing ? (
            <p></p>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm font-medium hover:font-semibold text-[#282828] leading-[120%] hover:underline"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-6 pt-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="John Smith"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="john.smith@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="(555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              {/* Date Picker */}
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%] pb-2">
                      Date of Birth
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            disabled={!isEditing}
                            className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                              isEditing
                                ? "cursor-text"
                                : "cursor-not-allowed bg-gray-100"
                            } ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value
                              ? field.value.toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                })
                              : "1985-06-15"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      Street Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="123 Main Street"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="New York"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      State
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="NY"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal text-[#499FC0] leading-[120%]">
                      Zip Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={!isEditing}
                        readOnly={!isEditing}
                        className={`w-full h-[59px] text-base font-medium text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 ${
                          isEditing
                            ? "cursor-text"
                            : "cursor-not-allowed bg-gray-100"
                        }`}
                        placeholder="10001"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center justify-center ">
              {isEditing && (
                <Button
                  disabled={isPending}
                  className="my-5 h-[51px] bg-[#499FC0] rounded-[8px] text-[#F4F4F4] text-base font-medium leading-[120%] py-4 px-[47px]"
                  type="submit"
                >
                  {isPending ? "Updating..." : "Update now"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PersonalInformationForm;
