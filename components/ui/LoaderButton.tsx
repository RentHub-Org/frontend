import React from "react";
import { Button } from "./button";
import { Loader2Icon } from "lucide-react";

const LoaderButton = () => {
  return (
    <Button className="flex items-center justify-center" disabled type="submit">
      <Loader2Icon className="animate-spin h-5 w-5 border-b-2 border-t-2 border-gray-900 mr-2 rounded-full" />
      Please Wait...
    </Button>
  );
};

export default LoaderButton;
