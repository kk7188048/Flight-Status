from fastapi import FastAPI
from app.routes import router
import uvicorn
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Allow all origins for simplicity
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


if __name__ == "__main__":
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
