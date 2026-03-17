import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from langchain_pinecone import PineconeVectorStore
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from src.helper import download_hugging_face_embeddings
from src.prompt import prompt

load_dotenv()

app = FastAPI()

# CORS for React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load embeddings and connect to Pinecone
print("Loading embeddings...")
embedding = download_hugging_face_embeddings()
index_name = "medical-chatbot"

print("Connecting to Pinecone...")
docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embedding
)

retriever = docsearch.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 3}
)

# Request model
class ChatRequest(BaseModel):
    message: str
    provider: str = "groq"

# LLM selector
def get_llm(provider: str):
    if provider == "groq":
        from langchain_groq import ChatGroq
        return ChatGroq(
            model="llama-3.1-8b-instant",
            api_key=os.getenv("GROQ_API_KEY")
        )
    elif provider == "openai":
        from langchain_openai import ChatOpenAI
        return ChatOpenAI(
            model="gpt-4o",
            api_key=os.getenv("OPENAI_API_KEY")
        )
    else:
        raise ValueError(f"Unknown provider: {provider}")

# Chat endpoint
@app.post("/chat")
async def chat(request: ChatRequest):
    llm = get_llm(request.provider)
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    rag_chain = create_retrieval_chain(retriever, question_answer_chain)
    response = rag_chain.invoke({"input": request.message})
    return {
        "answer": response["answer"],
        "provider": request.provider
    }

# Serve React frontend in production
if os.path.exists("build"):
    app.mount("/static", StaticFiles(directory="build/static"), name="static")

    @app.get("/{full_path:path}")
    async def serve_react(full_path: str):
        return FileResponse("build/index.html")
else:
    @app.get("/")
    async def root():
        return {"message": "Medical Chatbot API is running!"}