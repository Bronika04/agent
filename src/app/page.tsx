"use client"
import { useTRPC } from "@/trpc/client";
import { Button } from "@base-ui/react";
import { useMutation } from "@tanstack/react-query";

const Page =()=>{
 const trpc=useTRPC();
 const invoke=useMutation(trpc.invoke.mutationOptions({}))
  return(
    
        <div className="p-4 max-w-7xl mx-auto">
          <Button onClick={()=> invoke.mutate({text: "garvbarthwal"})}>
            Invoke Background Job
          </Button>
        </div>
  )
}

export default Page;