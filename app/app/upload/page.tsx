import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DevSection from "./components/devsection"
import RentalSection from "./components/rentalsection"

export default function DashBoard(){
    return (
        <Tabs defaultValue="dev">
            <div className="flex gap-2 items-center">
                <p className="text-2xl font-semibold leading-none tracking-tight">
                    Uploads
                </p>
                <TabsList className="h-[32px]">
                    <TabsTrigger value="dev" className="px-5 h-[25px]">Dev</TabsTrigger>
                    <TabsTrigger value="rental" className="px-5 h-[25px]">Rental</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="dev"><DevSection /></TabsContent>
            <TabsContent value="rental"><RentalSection /></TabsContent>
            <div className="absolute bottom-0 w-full h-[40px] border-t-2 p-2 text-sm text-[#575757]">
                Visit <a href={process.env.NEXT_PUBLIC_TUTORIALS_LINK} className="text-theme-3 underline">this link</a> to see tutorials on using this interface. And <a href={process.env.NEXT_PUBLIC_DOCS_LINK} className="text-theme-3 underline">docs</a> to use telegram and SDK.
            </div>
        </Tabs>
    )
}