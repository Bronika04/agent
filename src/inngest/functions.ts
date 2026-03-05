import { Agent, openai, anthropic,  createAgent } from "@inngest/agent-kit";
import {Sandbox } from "@e2b/code-interpreter"
import { inngest } from "./client";
import { step } from "inngest";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" ,
    retries:2
  },
  { event: "test/hello.world" },
  async ({ event}) => {
    const sandboxId= await step.run("get-sandbox-id",async() =>{
      const sandbox=await  Sandbox.create("garvbarthwal/agent-nextjs-garvbarthwal");
      return sandbox.sandboxId;
    })

     const codeagent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js developer . You write readable, maintainable code. Write simple Next.js & React snippets",
      model: openai({ model: "gpt-4.1-mini" },),
    });
    const { output } = await codeagent.run(`Write the following snippet: ${event.data.value}`);
    const sandboxUrl=await step.run("get-sandbox-url",async()=> {
      const sandbox=await getSandbox(sandboxId);
      const host=  sandbox.getHost(3000);
      return `https://${host}`
    })
    return {output,sandboxUrl };

  },
);