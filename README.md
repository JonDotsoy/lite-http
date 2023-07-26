## Lite HTTP

Simple HTTP Server

**Sample**

```ts
const server = new LiteHTTP();
await server.listen();
server.api(
    "my_api",
    new URLPattern({ pathname: "/my_api" }),
    z.object({ firstName: z.string(), lastName: z.string() }),
    z.object({ fullName: z.string() }),
    async ({ firstName, lastName }) => {
        return { fullName: `${firstName} ${lastName}` };
    },
);

console.log(`Server ready on ${server.toURL()}`); // Server ready on http://localhost:50138/
```

```shell
curl --request POST \
  --url http://localhost:50138/my_api \
  --header 'user-agent: vscode-restclient'

# HTTP/1.1 422 Unprocessable Entity
# Content-Type: application/x-yaml; profile="http://localhost:50138/schemas/my_api.schema.json"
# Date: Wed, 26 Jul 2023 04:34:50 GMT
# Connection: close
# Transfer-Encoding: chunked
# 
# error:
#   - code: invalid_type
#     expected: object
#     received: undefined
#     path: []
#     message: Required
```

```shell
curl --request POST \
  --url http://localhost:50138/my_api \
  --data 'firstName: Jhon\nlastName: Crose'

# HTTP/1.1 200 OK
# Content-Type: application/x-yaml; profile="http://localhost:50138/schemas/my_api.schema.json"
# Date: Wed, 26 Jul 2023 04:38:51 GMT
# Connection: close
# Transfer-Encoding: chunked
# 
# fullName: Jhon Crose
```