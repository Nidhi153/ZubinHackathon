import chromadb
from chromadb.config import DEFAULT_TENANT, DEFAULT_DATABASE, Settings
import re
import warnings
from huggingface_hub import InferenceClient
import os
warnings.filterwarnings("ignore")
import json
from dotenv import load_dotenv

load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

def init_chatbot(API_KEY:str):
      API_TOKEN = API_KEY
      repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"
        
      
      client = InferenceClient(
            repo_id,
            token = API_TOKEN,
            timeout = 120
        )
      return client
    
class Chatbot():
    def __init__(self):
        # Initialize all variables
        self.doc_chunks = []

        # Initialize chat history
        self.chat_history = []

        # Create a persistent connection to the vector database's collection
        db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)

        collection_name = "zubin-foundation"

        # Might experiment with embedding_function
        self.collection = db.get_or_create_collection(name=collection_name, embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())

    def query(self, prompt:dict, client, show_context:bool=False, context_length:int = 1) -> str:
        
        prompt = prompt.get("input")
        standalone_prompt = prompt
            
        if self.chat_history != []:
            standalone_prompt = f"""
            Given the following conversation and a follow up question, rephrase the follow up question
            to be a standalone question. This standalone question will be used to retrieve documents with 
            additional context.
            
            Let me share a couple of examples:
            
            If you believe that the follow up question does not have any relevance to the conversation, in other
            words, if it is not a question related to the current conversation, you MUST return the follow up question as is.
            
            '''
            Chat History:
            Human: How is Victor doing?
            AI: He's doing well!
            
            Follow up question: Are apples healthy?
            Standalone question: Are apples healthy?
            '''
            
            If the follow up question is relevant to the current conversation, then you must rephrase the question 
            to be a standalone question.
            
            '''
            Chat History:
            Human: Where is the university of Hong Kong located in?
            AI: It is located in Hong Kong.
            
            Follow up question: What is it famous for?
            Standalone question: What is the university of Hong Kong famous for?
            '''
            
            Now with these examples, here is the actual chat history. The follow up question will be provided by the user!
            Please only answer with the standalone question, and no explanation:
            
            '''
            Chat History: 
            Human: {self.chat_history[-2]['content']}
            AI: {self.chat_history[-1]['content']}
            '''
            """

            standalone_prompt = client.chat_completion(
                                messages=[{"role":"system", "content":standalone_prompt},
                                        {"role": "user", "content": "Follow up question: "+prompt}],
                                max_tokens=500,
                                temperature=0.3,
                                stream=False,
                            ).choices[0].message.content
            
            # print("Standalone Question:", standalone_prompt)

        res_db = self.collection.query(query_texts=[standalone_prompt],
                                            n_results=context_length)['documents'][0]

        source = '\n'.join(res_db)

        prompt_instructions=f"""

        You are tasked with two responsibilities:

        Classification: Classify user prompts into one of the following three categories based on the content of the prompt:

        FAQ: If the user is seeking information, clarification, or has a general inquiry, classify it as "FAQ".
        CANCEL: If the user intends to cancel or withdraw from an event or activity, classify it as "CANCEL".
        REGISTRATION: If the user expresses interest in signing up, registering, or joining an event or activity, classify it as "REGISTRATION".
        Output Format: Your output must begin with one of these three keywords: FAQ, CANCEL, or REGISTRATION.
        Response Generation:

        Answering the User: After classification, answer the user's question using only the facts listed in the sources provided. Be brief and concise in your response.
        Source Limitation: If there isn't enough information available in the provided sources, respond with "I don't know." Do not generate answers beyond what is included in the sources.


        Your job is to try to give the best possible answer to the query. Try to guide the user to right resources. 
        If there is a link provided in the source relevant to the context, you MUST include it in your response.

        Here is the source:
        {source}

        """

        chatbot_response = client.chat_completion(
            messages=[{"role":"system", "content":prompt_instructions},
                      {"role": "user", "content": standalone_prompt}],
            max_tokens=500,
            temperature=0.3,
            stream=False,
        ).choices[0].message.content

        self.chat_history.append({"role": "user", "content": standalone_prompt})
        self.chat_history.append({"role": "assistant", "content": chatbot_response})

        words = chatbot_response.split()
        
        title = words[0]
        response_text = ' '.join(words[1:])
        
        return {"title": title, "text": response_text}

    def delete_database(self):
        # Only run if you would like to remove all information fed into the vector database!
        db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)
        collection_name = "zubin-foundation"
        db.delete_collection(name=collection_name)

    def show_chat_log(self):
        # Just like the name, this function returns the chat logs for each phone number in the system.
        return self.chat_history

with open("zubin_data.txt", "r", encoding="utf-8") as file:
    doc_chunks = [file.read()]

doc_ids = ["0"]

'''This is for scalability of our LLM when new data is added to the zubin_data.txt'''
# db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)
# collection_name = "zubin-foundation"
# doc_metadatas=[{"About": "Zubin Foundation"}]
# collection = db.get_or_create_collection(name=collection_name, embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())
# collection.add(documents=doc_chunks, ids=doc_ids, metadatas=doc_metadatas)

def main():
    chatbot_instance = Chatbot()
    client = init_chatbot(HF_TOKEN)
    print(chatbot_instance.query({"input":"i wanna do my registration for an event on pottery"}, client))

    print()

    print(chatbot_instance.query({"input":"i need adult counselling"}, client))

if __name__ == '__main__':
    main()