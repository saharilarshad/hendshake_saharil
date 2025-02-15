"use client"

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast, Toaster } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Pencil, BookCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  activity: z.string().min(2, {
    message: "Activity must be at least 2 characters.",
  }),
  price: z.number().min(1, {
    message: "Price must be a number and at least 1 characters.",
  }),
  type: z.enum([
    "education", "recreational", "social", "diy", "charity", "cooking",
    "relaxation", "music", "busywork"
  ]),
  booking_required: z.boolean(),
  accessibility: z.number(),
});


type TEnum = "education" | "recreational" | "social" | "diy" | "charity" | "cooking" | "relaxation" | "music" | "busywork";

export type TData = {
  activity: string;
  price: number;
  type: TEnum;
  booking_required: boolean;
  accessibility: number;
};

export default function Home() {

  const [data, setData] = useState<TData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activity: "",
      price: 0,
      type: "education",
      booking_required: false,
      accessibility: 0.0,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values)

    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = { ...updatedData[editIndex], ...values };
      setData(updatedData);
      setEditIndex(null);

      toast.success("Item updated successfully!");
    } else {
      setData((prevData) => [...prevData, { ...values }]);
    }
    form.reset();
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    const itemToEdit = data[index];
    form.setValue("activity", itemToEdit.activity);
    form.setValue("price", itemToEdit.price);
    form.setValue("type", itemToEdit.type);
    form.setValue("booking_required", itemToEdit.booking_required);
    form.setValue("accessibility", itemToEdit.accessibility);
  };

  const handleDelete = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  console.log("data", data)
  console.log("selectedDeleteId", selectedDeleteId)

  return (
    <>
      <Toaster position="top-center" richColors closeButton />


      <>
        <div className="mt-20 flex flex-col gap-5 items-center justify-center w-screen">
          <h2 className="text-2xl font-semibold">Add Book Here!</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/3">
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Activity Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your display activity name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Price" {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ""}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Activity Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Activity Type</SelectLabel>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="recreational">Recreational</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="diy">DIY</SelectItem>
                            <SelectItem value="charity">Charity</SelectItem>
                            <SelectItem value="cooking">Cooking</SelectItem>
                            <SelectItem value="relaxation">Relaxation</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="busywork">Busywork</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="booking_required"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Required</FormLabel>
                    <FormControl>
                      <Input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="checkbox" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accessibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accessibility ({field.value} to 1)</FormLabel>
                    <FormControl>

                      <Slider
                        defaultValue={[0.0]}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                        max={1.0}
                        step={0.1}

                      // {...field}
                      />


                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <Button type="submit" className="btn btn-primary w-full">
                {editIndex !== null ? "Update Activity" : "Add Activity"}
              </Button>
            </form>
          </Form>


          <div className="p-5 w-full flex items-center justify-center">
            <Table className="">
              <TableCaption>A List Your Data.</TableCaption>
              <TableHeader className="w-full text-center">
                <TableRow className="text-center">
                  <TableHead className="w-[40px]">No.</TableHead>
                  <TableHead className="text-center">Activity</TableHead>
                  <TableHead className="text-center">Price</TableHead>
                  <TableHead className="text-center">Type Activity</TableHead>
                  <TableHead className="text-center">Booking</TableHead>
                  <TableHead className="text-center">Accessibility</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="w-full">
                {data &&
                  data.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow className="w-full">
                        <TableCell className="font-medium w-[40px]">
                          {index + 1}
                        </TableCell>

                        <TableCell className="text-center">
                          {item.activity}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.price}
                        </TableCell>

                        <TableCell className="text-center">
                          {item.type}
                        </TableCell>

                        <TableCell className="text-center">
                          {item.booking_required ? "Yes" : "No"}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.accessibility}
                        </TableCell>

                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-3">


                            <span
                              onClick={() => {
                                setOpenModalDelete(true);
                                setSelectedDeleteId(index);
                              }}
                            >
                              <Trash2 className="cursor-pointer text-red-500" />
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {openModalDelete && (
          <AlertDialog
            open={openModalDelete}
            onOpenChange={setOpenModalDelete}
          >

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undo. This will proceed to Delete
                  Book.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                {selectedDeleteId && (
                  <AlertDialogAction
                    onClick={() => {
                      handleDelete(selectedDeleteId);
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                )}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </>
    </>

  );
}
