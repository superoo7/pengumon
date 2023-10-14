export async function GET(request: Request) {
  console.log(fetch);

  return new Response(JSON.stringify({ message: "Hello world!" }));
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log({
    type: 1,
    id: requestBody.id,
    body: { input: requestBody.input },
  });
  const res = await fetch(
    "https://philosopher-gpt-johnson.vercel.app/api/gpt",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: 1,
        id: requestBody.id,
        body: { input: requestBody.input },
      }),
    }
  );
  const response = new Response(JSON.stringify(await res.json()));
  return response;
}
