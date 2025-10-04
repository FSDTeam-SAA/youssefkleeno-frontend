"use client";

import { z } from "zod";
import { useState } from "react";
import { EyeClosed, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
// import { useSession } from "next-auth/react";
import { toast } from "sonner";

// ✅ Zod schema with validation rules
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type FormValues = z.infer<typeof formSchema>;

export default function SecurityForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  //   const session = useSession();
  //   const token = (session?.data?.user as { accessToken: string })?.accessToken;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (values: { currentPassword: string; newPassword: string }) =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      }).then((res) => res.json()),
    onSuccess: (data) => {
      if (!data?.success) {
        toast.error(data?.message || "Something went wrong");
        return;
      }
      toast.success(data?.message || "Password Change successfully!");
      form.reset();
    },
  });

  const onSubmit = (values: FormValues) => {
    // console.log("Submitted Data:", values);
    const payload = {
      currentPassword: values?.currentPassword,
      newPassword: values?.newPassword,
    };
    mutate(payload);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_8px_0px_#00000029]">
      <div className="w-full bg-[#F5F5F5] border border-[#E5E7EB] flex items-center justify-between py-5 md:py-[25px] lg:py-[29px] px-6 md:px-7 lg:px-8 rounded-t-[12px]">
        <h4 className="text-lg font-medium text-[#282828] leading-[120%]">
          Security Settings
        </h4>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-6 pt-10"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg md:text-xl font-medium text-[#499FC0] leading-[120%]">
                    Current Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showCurrent ? "text" : "password"}
                        className={`w-full h-[55px] text-lg font-bold text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 }`}
                        placeholder="............."
                        {...field}
                      />
                    </FormControl>
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowCurrent((prev) => !prev)}
                    >
                      {showCurrent ? (
                        <EyeOff size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </span>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg md:text-xl font-medium text-[#499FC0] leading-[120%]">
                    New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showNew ? "text" : "password"}
                        className={`w-full h-[55px] text-lg font-bold text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 }`}
                        placeholder="............."
                        {...field}
                      />
                    </FormControl>
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowNew((prev) => !prev)}
                    >
                      {showNew ? <EyeOff size={20} /> : <EyeClosed size={20} />}
                    </span>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg md:text-xl font-medium text-[#499FC0] leading-[120%]">
                    Confirm New Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showConfirm ? "text" : "password"}
                        className={`w-full h-[55px] text-lg font-bold text-[#282828] leading-[120%] focus-visible:outline-none border border-[#0000004D] rounded-[8px] backdrop-blur-[12px] p-5 }`}
                        placeholder="............."
                        {...field}
                      />
                    </FormControl>
                    <span
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                      onClick={() => setShowConfirm((prev) => !prev)}
                    >
                      {showConfirm ? (
                        <EyeOff size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </span>
                  </div>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center pt-1">
              <Button
                disabled={isPending}
                className="my-5 h-[51px] bg-[#499FC0] rounded-[8px] text-[#F4F4F4] text-base font-medium leading-[120%] py-4 px-[47px]"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
