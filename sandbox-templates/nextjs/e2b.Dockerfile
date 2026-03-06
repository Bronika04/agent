FROM node:21-slim

RUN apt-get update && apt-get install -y curl && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY compile_page.sh /compile_page.sh
RUN chmod +x /compile_page.sh

WORKDIR /home/user/nextjs-app

RUN npx --yes create-next-app@15.3.3 . --yes

RUN npm install tailwindcss-animate

RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force
RUN npx --yes shadcn@2.6.3 add --all --yes

RUN npm install clsx tailwind-merge lucide-react
RUN npm install -D @types/node

RUN mkdir -p /home/user/lib

RUN printf "import { clsx, type ClassValue } from 'clsx'\nimport { twMerge } from 'tailwind-merge'\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n" > /home/user/lib/utils.ts

RUN printf "'use client'\n\nexport default function Page(){\n  return <div className='p-10'>AI Sandbox Ready</div>\n}\n" > /home/user/nextjs-app/app/page.tsx

RUN mv /home/user/nextjs-app/* /home/user/ && rm -rf /home/user/nextjs-app