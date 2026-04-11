"use client";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";

const Page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const trpc = useTRPC();

  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError(error) {
        toast.error(error.message);
      },
      onSuccess(data) {
        router.push(`/projects/${data.id}`);
      },
    })
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto flex flex-col gap-y-4 px-4">
        
        <Label>Enter the prompt here</Label>

        <TextareaAutosize
          minRows={1}
          maxRows={12}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Make a beautiful landing page"
          className="w-full resize-none rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />

        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value })}
        >
          {createProject.isPending ? "Creating..." : "Submit"}
        </Button>

      </div>
    </div>
  );
};

export default Page;