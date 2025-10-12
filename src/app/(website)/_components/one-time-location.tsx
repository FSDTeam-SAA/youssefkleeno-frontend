"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// ✅ Fix Leaflet icon issue in Next.js (type-safe)
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ Zod schema
const formSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
});

// ✅ Type for props
interface LocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (location: string) => void;
  position: [number, number];
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>;
}

// ✅ Helper component: Update map view programmatically
function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  map.setView(coords, 13, { animate: true });
  return null;
}

export default function OneTimeLocation({
  open,
  onOpenChange,
  onNext,
  position,
  setPosition, // ✅ receive from parent
}: LocationModalProps): JSX.Element {
  // ✅ Setup form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { location: "" },
  });

  // ✅ Fetch coordinates from location
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const query = encodeURIComponent(values.location);
      const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`;

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setPosition([lat, lon]);
      } else {
        alert("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      alert("Failed to fetch location");
    }
  }

  // ✅ Continue button handler
  const handleContinue = (values: z.infer<typeof formSchema>) => {
    if (!values.location.trim()) {
      alert("Please enter a location!");
      return;
    }
    onNext(values.location);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="space-y-4 w-[600px] max-w-full">
        <h4 className="text-xl md:text-2xl lg:text-[32px] font-semibold text-black text-center">
          Your Location
        </h4>

        {/* ✅ Map Section */}
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
            key={`${position[0]}-${position[1]}`}
          >
            <ChangeMapView coords={position} />
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Location: {position[0].toFixed(4)}, {position[1].toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* ✅ Form Section */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (values) => {
                await onSubmit(values);
              })}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="w-full h-[62px] bg-white border border-[#0000001A] rounded-[8px]"
                        placeholder="Enter a Location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => handleContinue(form.getValues())}
                  className="w-full h-[55px] bg-[#499FC0] text-white rounded-md"
                >
                  Continue
                </button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

