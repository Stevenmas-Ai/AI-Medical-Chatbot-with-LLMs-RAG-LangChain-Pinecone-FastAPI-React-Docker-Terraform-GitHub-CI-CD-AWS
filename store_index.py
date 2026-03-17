from dotenv import load_dotenv
import os
load_dotenv()

from src.helper import load_pdf_file, filter_to_minimal_docs, text_split, download_hugging_face_embeddings
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["OPENAI_API_KEY"] = OPENAI_API_KEY if OPENAI_API_KEY else ""
os.environ["GROQ_API_KEY"] = GROQ_API_KEY

print("Pinecone key loaded:", PINECONE_API_KEY is not None)
print("OpenAI key loaded:", OPENAI_API_KEY is not None)
print("Groq key loaded:", GROQ_API_KEY is not None)

# Load and process data
extracted_data = load_pdf_file('data/')  # fixed syntax error (data-'data/' -> 'data/')
filter_data = filter_to_minimal_docs(extracted_data)
text_chunks = text_split(filter_data)  # fixed variable name (texts_chunk -> text_chunks)

embedding = download_hugging_face_embeddings()

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)  # removed duplicate

index_name = "medical-chatbot"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1")
    )

index = pc.Index(index_name)
print("Index created successfully!")
print(index.describe_index_stats())

# Store vectors in Pinecone
docsearch = PineconeVectorStore.from_documents(
    documents=text_chunks,  # fixed variable name
    embedding=embedding,
    index_name=index_name
)

print("Vectors stored successfully!")