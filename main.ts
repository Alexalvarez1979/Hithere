const handleRequest = (request: Request) => {
 return new Response("Hi again!");
};
Deno.serve(handleRequest);
