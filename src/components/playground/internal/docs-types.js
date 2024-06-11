export const cUrlDocs = {
    title: 'Send a WhatsApp message',
    description: "Use our simple messaging form below to send a test WhatsApp message to the number you verified during sign-up. By doing this, you are starting a business-initiated conversation, where you, as the business, send the first message to your customers using a pre-approved message template.",
    lesson: `

\`\`\`bash
curl -L -g 'https://vj44dv.api.infobip.com/whatsapp/1/message/template' \n
-H 'Authorization: App ********************************-********-****-****-****-********31bd' \n
-H 'Content-Type: application/json' \n
-H 'Accept: application/json' \n
-d '{"messages":[{"from":"447860099299","to":"5548998457797","messageId":"32f0e98f-04d5-47dd-b18c-507a9bba12cc","content":{"templateName":"message_test","templateData":{"body":{"placeholders":["Jean"]}},"language":"en"}}]}'
\`\`\`
`,
}

export const javaDocs = {
    title: 'Send a WhatsApp message',
    description: "Use our simple messaging form below to send a test WhatsApp message to the number you verified during sign-up. By doing this, you are starting a business-initiated conversation, where you, as the business, send the first message to your customers using a pre-approved message template.",
    lesson: `
\`\`\`java
OkHttpClient client = new OkHttpClient().newBuilder()
    .build();

MediaType mediaType = MediaType.parse("application/json");

RequestBody body = RequestBody.create(mediaType, "{\"messages\":[{\"from\":\"447860099299\",\"to\":\"5548998457797\",\"messageId\":\"080738b3-b700-483a-becb-55956be2d04b\",\"content\":{\"templateName\":\"message_test\",\"templateData\":{\"body\":{\"placeholders\":[\"Jean\"]}},\"language\":\"en\"}}]}");

Request request = new Request.Builder()
    .url("https://vj44dv.api.infobip.com/whatsapp/1/message/template")
    .method("POST", body)
    .addHeader("Authorization", "App ********************************-********-****-****-****-********31bd")
    .addHeader("Content-Type", "application/json")
    .addHeader("Accept", "application/json")
    .build();
Response response = client.newCall(request).execute();
\`\`\`
    `,
}

export const pythonDocs = {
    title: 'Send a WhatsApp message',
    description: "Use our simple messaging form below to send a test WhatsApp message to the number you verified during sign-up. By doing this, you are starting a business-initiated conversation, where you, as the business, send the first message to your customers using a pre-approved message template.",
    lesson: `
\`\`\`python
import http.client
import json

conn = http.client.HTTPSConnection("vj44dv.api.infobip.com")
payload = json.dumps({
    "messages": [
        {
            "from": "447860099299",
            "to": "5548998457797",
            "messageId": "4ec01a6e-0972-4308-868b-41e1a79d2f91",
            "content": {
                "templateName": "message_test",
                "templateData": {
                    "body": {
                        "placeholders": ["Jean"]
                    }
                },
                "language": "en"
            }
        }
    ]
})
headers = {
    'Authorization': 'App ********************************-********-****-****-****-********31bd',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
conn.request("POST", "/whatsapp/1/message/template", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
\`\`\`
    `,
}