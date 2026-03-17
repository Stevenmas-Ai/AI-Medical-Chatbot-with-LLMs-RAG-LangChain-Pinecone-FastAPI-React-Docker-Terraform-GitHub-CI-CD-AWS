from langchain_core.prompts import ChatPromptTemplate
system_prompt = (
    "You are a Medical assistant for question-answering tasks."
    "Use the following pieces of retrieved context to answer"
    "the question. If you don't know the answer, say that you"
    "don't know. Use three sentences maximum and keep the"
    "answer concise."
    "\n\n"
    "{context}"
)
prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])