"use client";

import { useAppDispatch } from "@/redux/hooks";
import { setHeader } from "@/redux/headerSlice";
import { useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { PlusIcon } from "lucide-react";
import { addPath, getPaths } from "@/lib/path";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Path } from "@/types/path";
import { getDocuments } from "@/lib/firebase-helpers";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFirefetch from "@/hooks/use-firefetch";
import { Skeleton } from "@/components/ui/skeleton";

interface NewPathProps {
  children: React.ReactNode;
  userId: string;
}

const pathSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z.string().min(20, "Desc must atleast have 20 chars"),
  status: z.string(),
});

type PathFormData = z.infer<typeof pathSchema>;

export default function Page() {

  const dispatch = useAppDispatch();
  const { data: paths , loading, error, mutateData } = useFirefetch<Path[]>(getDocuments,"paths")

  

  // function NewPath({ children, userId }: NewPathProps) {
  //   const [loading, setLoading] = useState(false);

  //   const form = useForm<PathFormData>({
  //     resolver: zodResolver(pathSchema),
  //     defaultValues: {
  //       name: "",
  //       description: "",
  //       status: "",
  //     },
  //   });

  //   async function onSubmit(values: PathFormData) {
  //     try {
  //       setLoading(true);

  //       const path = await addPath(userId, {
  //         ...values,
  //         status: values.status || "draft",
  //         completed: false,
  //         taskCount: 0,
  //       } as Omit<Path, "id" | "created" | "updated" | "lastUsed">);

  //       toast.success("New path created successfully!");
  //       form.reset();

  //       mutateData([path, ...(paths ?? [])]);
  //     } catch (err: any) {
  //       toast.error(err.message || "Failed to create path");
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   return (
  //     <Drawer direction="right">
  //       <DrawerTrigger asChild>{children}</DrawerTrigger>
  //       <DrawerContent>
  //         <DrawerHeader className="gap-1">
  //           <DrawerTitle>New Path</DrawerTitle>
  //           <DrawerDescription>
  //             Remember each path should have a well-defined purpose and your
  //             deep desire to succeed.
  //           </DrawerDescription>
  //         </DrawerHeader>

  //         <div className="p-4">
  //           <Form {...form}>
  //             <form
  //               onSubmit={form.handleSubmit(onSubmit)}
  //               className="flex flex-col gap-4"
  //             >
  //               <FormField
  //                 control={form.control}
  //                 name="name"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Name</FormLabel>
  //                     <FormControl>
  //                       <Input placeholder="New path name" {...field} />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               <FormField
  //                 control={form.control}
  //                 name="description"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Description</FormLabel>
  //                     <FormControl>
  //                       <Textarea
  //                         placeholder="Describe what this path is about..."
  //                         {...field}
  //                       />
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               <FormField
  //                 control={form.control}
  //                 name="status"
  //                 render={({ field }) => (
  //                   <FormItem>
  //                     <FormLabel>Status</FormLabel>
  //                     <FormControl>
  //                       <Select
  //                         onValueChange={field.onChange}
  //                         value={field.value}
  //                       >
  //                         <SelectTrigger className="w-[180px]">
  //                           <SelectValue placeholder="Select the status" />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                           <SelectGroup>
  //                             <SelectLabel>Status</SelectLabel>
  //                             <SelectItem value="active">Active</SelectItem>
  //                             <SelectItem value="archived">Archived</SelectItem>
  //                             <SelectItem value="draft">Draft</SelectItem>
  //                           </SelectGroup>
  //                         </SelectContent>
  //                       </Select>
  //                     </FormControl>
  //                     <FormMessage />
  //                   </FormItem>
  //                 )}
  //               />

  //               <Button type="submit" disabled={loading}>
  //                 {loading ? "Adding..." : "Add Path"}
  //               </Button>
  //             </form>
  //           </Form>
  //         </div>

  //         <DrawerFooter>
  //           <DrawerClose asChild>
  //             <Button variant="outline">Close</Button>
  //           </DrawerClose>
  //         </DrawerFooter>
  //       </DrawerContent>
  //     </Drawer>
  //   );
  // }

  useEffect(() => {
    dispatch(setHeader(["paths & Milestones"]));
  }, [dispatch]);

  return (
    <section className="p-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Paths</h1>

        {/* {user?.uid && (
          <NewPath userId={user.uid}>
            <Button>
              <PlusIcon /> New Path
            </Button>
          </NewPath>
        )} */}
      </div>

      <div className="grid grid-cols-1 mt-10   sm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] justify-start gap-5">
        {loading &&
          Array.from({ length: 9 }).map((_, id) => {
            return <Skeleton className="h-[160px] w-full" key={id} />;
          })}

        {paths?.map((path) => (
          <PathCard key={path.id} path={path} />
        ))}
      </div>
    </section>
  );
}

interface pathCardProps {
  path: Path;
}

function PathCard({ path }: pathCardProps) {
  return (
    <Link href="/paths/id" className=" w-[320px] sm:w-full  block">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{path.name}</CardTitle>
          <CardDescription className="truncate w-24">
            {path.description}
          </CardDescription>
          <CardAction>
            <Badge variant="outline">{path.status}</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p>Tasks Count</p>
            <p className="text-sm">{path.taskCount}</p>
          </div>

          <div>
            <p>Last Used</p>
            <p className="text-xs">
              {path.updated.toDate().toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
