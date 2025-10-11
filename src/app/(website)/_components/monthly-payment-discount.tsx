"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  code: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface MonthlyPaymentDiscountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: () => void;
  bookingId: string;
}

const MonthlyPaymentDiscount = ({
  open,
  onOpenChange,
  onNext,
  bookingId,
}: MonthlyPaymentDiscountProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });
  const total = 29;


// apply promo code 
  const {mutate, isPending} = useMutation({
    mutationKey : ["apply-discount"],
    mutationFn: (values: z.infer<typeof formSchema>)=>fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-code/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res)=>res.json())
  })


//   payment api call 
 const {mutate: paymentApi, isPending: paymentPending} = useMutation({
    mutationKey : ["payment"],
    mutationFn: ({bookingId, amount, userId}:{bookingId: string, amount: number, userId: string})=>fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({bookingId, amount, userId}),
    }).then((res)=>res.json())
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload = {
      code: values?.code,
      bookingId: bookingId,
    }
    mutate(payload)
  }

  const handlePay = () => {
    onNext();
    onOpenChange(false);
    paymentApi({
      bookingId: bookingId,
      amount: total,
      userId : "68a9310b60a8cc4db5a8b6cf"
    })
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-0 gap-0">
        <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
          Payment Details
        </h4>

        <div className="pt-5 md:pt-6 lg:pt-8">
          <h3 className="text-lg md:text-xl font-medium text-[#2F2F2F] leading-[120%]">
            Order Summary
          </h3>
          <div className="flex items-center justify-between pt-3 md:pt-4 lg:pt-6">
            <span className="text-base md:text-lg font-normal text-[#3E3E3E] leading-[120%]">
              Monthly Subscription (4 washes)
            </span>
            <span className="text-base md:text-lg font-semibold text-black leading-[120%]">
              $29
            </span>
          </div>
          <p className="text-base font-normal text-[#505050] leading-[120%] py-2 md:py-3 lg:py-4">
            Includes 4 washes over a month period
          </p>
          <div className="border-b border-[#0000001A] pb-4 md:pb-5 lg:pb-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="w-full flex items-center border border-gray-300 rounded-[6px] overflow-hidden">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            {...field}
                           className="w-full h-[65px] border border-[#499FC066] bg-[#499FC01A] rounded-l-[6px] py-3 md:py-4 px-3 md:px-4 text-base font-medium text-[#333333] leading-[120%] focus:outline-none focus:ring-0"
                            placeholder="Enter Promo Code"
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-red-500 mt-1" />
                      </FormItem>
                    )}
                  />
                  <button
                    disabled={isPending}
                    type="submit"
                    className="h-[65px] bg-[#499FC0] rounded-r-[6px]  px-5 md:px-7 lg:px-[49px] text-base font-medium text-white leading-[120%]" 
                  >
                    Apply
                  </button>
                </div>
              </form>
            </Form>
          </div>

          <div className="flex justify-between text-lg font-semibold mt-4 pb-4 md:pb-6 lg:pb-8">
            <span className="text-lg md:text-xl font-semibold text-black leading-[120%]">Total</span>
            <span className="text-lg md:text-xl font-semibold text-[#499FC0] leading-[120%]">${total}</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={paymentPending}
          className="w-full h-[55px] text-white text-lg font-semibold"
          style={{ backgroundColor: "#499FC0" }}
          onClick={handlePay}
        >
          Pay ${total}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyPaymentDiscount;







// "use client";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";

// const formSchema = z.object({
//   code: z.string().min(2, {
//     message: "Promo code must be at least 2 characters.",
//   }),
// });

// interface MonthlyPaymentDiscountProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onNext: () => void;
//   bookingId: string;
// }

// const MonthlyPaymentDiscount = ({
//   open,
//   onOpenChange,
//   onNext,
//   bookingId,
// }: MonthlyPaymentDiscountProps) => {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: { code: "" },
//   });

//   const BASE_PRICE = 29;
//   const [discountPrice, setDiscountPrice] = useState<number>(0);
//   const [promoMessage, setPromoMessage] = useState<string>("");

//   // ✅ Apply promo code
//   const { mutate, isPending } = useMutation({
//     mutationKey: ["apply-discount"],
//     mutationFn: (values: z.infer<typeof formSchema>) =>
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-code/validate`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       }).then((res) => res.json()),

//     onSuccess: (data) => {
//       if (data?.success) {
//         setDiscountPrice(data.data.discountPrice || 0);
//         setPromoMessage("Promo code applied successfully!");
//       } else {
//         setDiscountPrice(0);
//         setPromoMessage(data?.message || "Invalid promo code");
//       }
//     },
//     onError: () => {
//       setPromoMessage("Something went wrong while applying promo code.");
//     },
//   });

//   // ✅ Payment API
//   const { mutate: paymentApi, isPending: paymentPending } = useMutation({
//     mutationKey: ["payment"],
//     mutationFn: ({
//       bookingId,
//       amount,
//       userId,
//     }: {
//       bookingId: string;
//       amount: number;
//       userId: string;
//     }) =>
//       fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/create-payment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookingId, amount, userId }),
//       }).then((res) => res.json()),
//   });

//   // ✅ Handle promo form
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     mutate(values);
//   }

//   // ✅ Calculate total after discount
//   const total = Math.max(BASE_PRICE - discountPrice, 0);

//   const handlePay = () => {
//     onNext();
//     onOpenChange(false);
//     paymentApi({
//       bookingId,
//       amount: total,
//       userId: "68a9310b60a8cc4db5a8b6cf",
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="space-y-0 gap-0">
//         <h4 className="text-2xl md:text-[28px] lg:text-[32px] font-semibold text-black leading-[150%] text-center">
//           Payment Details
//         </h4>

//         <div className="pt-5 md:pt-6 lg:pt-8">
//           <h3 className="text-lg md:text-xl font-medium text-[#2F2F2F] leading-[120%]">
//             Order Summary
//           </h3>

//           <div className="flex items-center justify-between pt-3 md:pt-4 lg:pt-6">
//             <span className="text-base md:text-lg font-normal text-[#3E3E3E] leading-[120%]">
//               Monthly Subscription (4 washes)
//             </span>
//             <span className="text-base md:text-lg font-semibold text-black leading-[120%]">
//               ${BASE_PRICE}
//             </span>
//           </div>

//           <p className="text-base font-normal text-[#505050] leading-[120%] py-2 md:py-3 lg:py-4">
//             Includes 4 washes over a month period
//           </p>

//           {/* ✅ Promo code input */}
//           <div className="border-b border-[#0000001A] pb-4 md:pb-5 lg:pb-6">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//               >
//                 <div className="w-full flex items-center border border-gray-300 rounded-[6px] overflow-hidden">
//                   <FormField
//                     control={form.control}
//                     name="code"
//                     render={({ field }) => (
//                       <FormItem className="flex-1">
//                         <FormControl>
//                           <Input
//                             {...field}
//                             className="w-full h-[65px] border border-[#499FC066] bg-[#499FC01A] rounded-l-[6px] py-3 md:py-4 px-3 md:px-4 text-base font-medium text-[#333333] leading-[120%] focus:outline-none focus:ring-0"
//                             placeholder="Enter Promo Code"
//                           />
//                         </FormControl>
//                         <FormMessage className="text-sm text-red-500 mt-1" />
//                       </FormItem>
//                     )}
//                   />
//                   <button
//                     disabled={isPending}
//                     type="submit"
//                     className="h-[65px] bg-[#499FC0] rounded-r-[6px] px-5 md:px-7 lg:px-[49px] text-base font-medium text-white leading-[120%]"
//                   >
//                     {isPending ? "Applying..." : "Apply"}
//                   </button>
//                 </div>
//               </form>
//             </Form>
//             {promoMessage && (
//               <p
//                 className={`mt-2 text-sm ${
//                   discountPrice > 0 ? "text-green-600" : "text-red-500"
//                 }`}
//               >
//                 {promoMessage}
//               </p>
//             )}
//           </div>

//           {/* ✅ Price summary */}
//           <div className="flex justify-between text-lg font-semibold mt-4">
//             <span className="text-base text-gray-600">Subtotal</span>
//             <span>${BASE_PRICE}</span>
//           </div>

//           {discountPrice > 0 && (
//             <div className="flex justify-between text-lg font-semibold text-green-600">
//               <span>Discount</span>
//               <span>- ${discountPrice}</span>
//             </div>
//           )}

//           <div className="flex justify-between text-lg font-semibold mt-3 pb-4 md:pb-6 lg:pb-8">
//             <span className="text-lg md:text-xl font-semibold text-black leading-[120%]">
//               Total
//             </span>
//             <span className="text-lg md:text-xl font-semibold text-[#499FC0] leading-[120%]">
//               ${total}
//             </span>
//           </div>
//         </div>

//         <Button
//           type="submit"
//           disabled={paymentPending}
//           className="w-full h-[55px] text-white text-lg font-semibold"
//           style={{ backgroundColor: "#499FC0" }}
//           onClick={handlePay}
//         >
//           Pay ${total}
//         </Button>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default MonthlyPaymentDiscount;






