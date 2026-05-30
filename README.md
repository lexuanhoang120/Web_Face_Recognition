# Web Face Recognition

> **Status:** This project was indefinitely paused before reaching production deployment.

A full-stack face recognition management platform. Register faces, organize them into lists, and track real-time recognition events — all through a web dashboard. Built for office attendance and identity management.

**My role:** Back-end development — FastAPI REST API, MongoDB schema, face detection/embedding pipeline, and real-time recognition integration.

> This project was developed during my time at **[VTCODE Company](https://vtcode.vn/)**.

---

## Demo

### Login & Dashboard

<img src="https://user-images.githubusercontent.com/83819024/219291144-c7dea7b3-74b6-4705-bd0c-e83555d58abf.png" width=48%> <img src="https://user-images.githubusercontent.com/83819024/219291300-eb970e6f-8644-4a2f-9b17-53ebf88074a2.png" width=48%>

### Face List Management

https://user-images.githubusercontent.com/83819024/219294189-f7c72dd0-68d4-496a-972e-9f66c47618ac.mp4

### Person Information

https://user-images.githubusercontent.com/83819024/219295263-91ab9f04-d578-40b1-81ae-ef6fc8ede389.mp4

### Database (MongoDB)

<img src="https://user-images.githubusercontent.com/83819024/219296179-f8bf4c58-e320-432d-834f-b51c4b2585cd.png" width=48%> <img src="https://user-images.githubusercontent.com/83819024/219296233-bc5526d0-87e2-4573-98ee-474e191bc9fd.png" width=48%>

---

## Architecture

```
Front-end (React)                    Back-end (FastAPI)                ML Pipeline
─────────────────                    ──────────────────                ───────────
     │                                      │                              │
     │  REST API calls                      │                              │
     ├─────────────────────────────────────►│                              │
     │                                      │  Face detection     │
     │                                      ├─────────────────────────────►│
     │                                      │                              │
     │                                      │  Face embedding     │
     │                                      ├─────────────────────────────►│
     │                                      │                              │
     │                                      │  MongoDB                     │
     │                                      ├─────────────────────────────►│
     │                                      │                              │
     │  JSON responses                      │                              │
     │◄─────────────────────────────────────┤                              │
     │                                      │                              │
```

---

## Back-end (my work)

### Tech stack

| Layer | Technology |
|---|---|
| Framework | FastAPI (Python) |
| Database | MongoDB (PyMongo) |
| Face detection | MTCNN (PyTorch) |
| Face embeddings | VGGFace2 / ResNet50 (Keras) |
| Person tracking | Custom centroid tracker (Euclidean distance) |
| Auth | SHA-256 hashed passwords, token-based |
| Static files | FastAPI StaticFiles for face images |
| Server | Uvicorn, port 9000 |

### API design

All endpoints follow a consistent response format:

```json
{
  "data": { ... },
  "errorCode": 0,
  "message": "SUCCESS",
  "errors": []
}
```

**Routes:**

| Endpoint | Methods | Description |
|---|---|---|
| `/auth/login` | POST | Username/password authentication with token |
| `/face_recognition/list_information/` | GET, POST, PUT, DELETE | CRUD for registered people (name, photo, list assignment) |
| `/face_recognition/list_information/detect/` | POST | Upload photo → detect one face → crop → return face path |
| `/face_recognition/list_storage/` | GET, POST, PUT, DELETE | CRUD for face lists/groups |
| `/face_recognition/dashboard/realtime/{n}` | GET | Fetch latest N real-time recognition events |

### MongoDB schema

Four collections in the `identify_human` database:

| Collection | Purpose | Key fields |
|---|---|---|
| `list_information` | Registered people | `_id`, `name`, `id_list_name`, `birth_day`, `gender`, `description` |
| `embedding_face` | Face images + embeddings | `_id`, `id` (FK), `image_path`, `embedding_face` (2048-dim array) |
| `list_storage` | Face lists/groups | `_id`, `list_name`, `created_time` |
| `dashboard_storage` | Real-time recognition events | `created_time`, recognition results |

The `list_information` endpoint uses MongoDB aggregation pipelines (`$lookup`) to join across `list_storage` and `embedding_face` collections, building complete person records in a single query — no N+1 problem.

### Face processing pipeline

When a new person is registered:

1. **Front-end** uploads a photo → `POST /detect/`
2. **MTCNN** detects exactly one face in the image (rejects if 0 or 2+ faces)
3. Face region is cropped with 20px padding, resized to 224×224, and saved to disk
4. On form submit → `POST /` creates the person record
5. **Background task** runs VGGFace2 embedding on the saved face image, stores the 2048-dim vector in `embedding_face`

The embedding computation is offloaded to a FastAPI `BackgroundTasks` thread so the HTTP response returns immediately while the ML work completes in the background.

### Concurrency & performance

- Face detection rejects multi-face images at the API level — guaranteeing clean single-face enrollment
- Embedding computation runs asynchronously via background tasks
- MongoDB aggregation pipelines minimize round-trips for joined data
- CORS enabled for all origins (development/internal deployment)

### Project layout (back-end)

```
Back-end/
├── main.py                    # FastAPI app entry point, router registration
├── login.py                   # Authentication (SHA-256 + token)
├── packages/
│   ├── detecting_face.py      # MTCNN face detection
│   ├── embedding_face.py      # VGGFace2/ResNet50 embedding
│   └── tracking_face.py       # Centroid tracker for multi-frame identity
├── router/
│   └── face_recognition/
│       ├── list_information.py # CRUD for registered faces + detect endpoint
│       ├── list_storage.py     # CRUD for face lists
│       ├── dashboard.py        # Real-time event feed
│       └── add_target.py       # (legacy) alternative add-target logic
├── images/                     # Saved face & context images
├── more/
│   ├── models/                 # SSD, Haar cascade, mask detector models
│   ├── id_list_storage.txt     # Auto-increment ID state
│   └── id_list_information.txt # Auto-increment ID state
└── requirement.txt
```

---

## Front-end (summary)

The React front-end provides:

- **Login** with token-based auth
- **Dashboard** — real-time recognition event feed
- **Face list management** — paginated table with search, CRUD modals, face image upload
- **List storage management** — create/edit/delete face groups
- Built with Redux for state, custom component library, SCSS styling

See `Front-end/README.md` for details.

---

## Getting started

```bash
# Back-end
cd Back-end
pip install -r requirement.txt
python main.py          # Starts on port 9000

# Front-end
cd Front-end
yarn install
yarn start
```

Requires MongoDB running on `localhost:27017`.
