"use client"
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      {" "}
      <Button onClick={() => alert()}>Click me</Button>
    </div>
  );
};

export default page;
