const handleRequest = (request: Request) => {
 return new Response("Hi there!");
};
Deno.serve(handRequest);
