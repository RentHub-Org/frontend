
export function GET(req: Request){
    console.log("in the get baby...");
    return Response.json({"hello":"world"});
}