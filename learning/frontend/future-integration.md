Future Frontend Integration

These concepts are part of the 26-week product but should be learned when their backend capability is introduced.

Authentication

Target flow:

login form → FastAPI auth endpoint → authenticated session/token → protected API requests → logout

Frontend must handle:

authentication state

loading

expired/invalid session

unauthorized responses

protected routes

AI streaming

The current AI UI models:

processing

streaming

complete

error

Later the simulated response will be replaced with real backend streaming.

Target flow:

question → FastAPI → RAG/LLM pipeline → stream → frontend

Handle:

connection start

partial output

completion

errors

cancellation

citations/evidence

saving results

Server-Sent Events

Understand SSE for one-way server → browser streaming.

WebSockets

Later BioCollab will use realtime communication for collaboration/chat.

browser ↔ persistent WebSocket connection ↔ backend

Notifications

Eventually consume backend-generated notifications and realtime updates.

Principle

Do not implement these integrations prematurely. Add them when the corresponding backend/AI milestone is reached.