import chromadb
from chromadb.config import DEFAULT_TENANT, DEFAULT_DATABASE, Settings
import re
import warnings
from huggingface_hub import InferenceClient
import os
warnings.filterwarnings("ignore")
import json



class Chatbot():
    def __init__(self):

        #Initialize all variables
        self.storedFiles = dict()
        self.textualizedFiles = dict()
        self.document_paths = []
        self.document_names = []
        self.doc_chunks = []
        self.doc_metadata = []
  

        #Initialize chat history
        self.chat_history = {}

        #Create a persistent connection to the vector database's collection
        db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)

        collection_name = "zubin-foundation"

        #Might experiment with embedding_function
        self.collection = db.get_or_create_collection(name=collection_name, embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())

    def query(self, prompt:str, show_context:bool=False, context_length:int = 1) -> str:

        #Currently taking {context_length} number of chunks -> {context_length}*125 tokens for context
        #Llama 3.1 has context length of 128k tokens...
        res_db = self.collection.query(query_texts=[prompt],
                                        n_results=context_length)['documents'][0]
        source = '\n'.join(res_db)

        standalone_question_prompt=f"""

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

        Here is the source:
        {source}

        """

        API_TOKEN = "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"
        repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"

        client = InferenceClient(
            repo_id,
            token = API_TOKEN,
            timeout = 120
        )

        chatbot_response = client.chat_completion(
            messages=[{"role":"system", "content":standalone_question_prompt},
                      {"role": "user", "content": prompt}],
            max_tokens=500,
            temperature=0.3,
            stream=False,
        ).choices[0].message.content

        print("Answer:", chatbot_response)
        return chatbot_response

    def delete_database(self):
        '''
        Only run if you would like to remove all information fed into the vector database!
        '''
        db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)

        collection_name = "zubin-foundation"

        db.delete_collection(name=collection_name)

    '''
    BELOW ARE DEBUGGING FUNCTIONS!!!
    '''
    

    def show_text(self, doc_path: str, image_number: int):
        '''
        Just like the name, this function return the text version of the pdf file in question
        '''
        return self.textualizedFiles[doc_path][image_number]

    def show_chat_log(self):
        '''
        Just like the name, this function returns the chat logs for each phone number in the system.
        '''
        return self.chat_history

    def delete_chat_log(self, phone_number:str="+85298226209"):
        '''
        Just like the name, this function deletes all chat logs associated with a phone number in the system.
        '''
        self.chat_history[phone_number] = []


# Example usage
json_string = """
{
  "data": [
    {
      "User Prompt": "Tell me about the Women’s Empowerment event in Yau Tsim Mong"
    }
  ]
}
"""

#need to fix the api receiving stuff for this
def extract_text_from_json(json_data):
    text = []

    # Extract the title
    if "data" in json_data:
        for item in json_data["data"]:
            if "User Prompt" in item:
                text.append(item["User Prompt"])

    return " ".join(text)


json_data = json.loads(json_string)
extracted_text = extract_text_from_json(json_data)
extracted_text


db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)
collection = db.get_or_create_collection(name="zubin-foundation", embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())

collection.get()


db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)
collection = db.get_or_create_collection(name="zubin-foundation", embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())

doc_chunks = ["""
The Zubin Foundation

They are a small but dedicated team with a strong commitment to improving the lives in Hong Kong.

Fundraising Comittee
Objective:
To raise funds for and increase awareness of The Zubin Foundation.

Scholarships' Committee
Objective:
To independently select the candidates for The Zubin Foundation scholarships.

SEN Centre Advisory Committee
Objective:
To provide advise on the workflow and protocols for the SEN Centre as well as recommend professionals who can help.

EMWBC Committee
Objective:
To provide advice on the service protocol and other issues as related to the service provided by the Ethnic Minority Well-being Centre.

When in need, community members can utilize these links for help:
Call Mira: Helpline for Women and Girls in Crisis https://www.zubinfoundation.org/our-work/call-mira-helpline/

Adult Counselling - Ethnic Minority Well-being Centre
https://api.whatsapp.com/send?phone=85296823100&text=Hello%20from%20The%20Zubin%20Foundation%20Ethnic%20Minority%20Well-being%20Centre.%20%0A%0AOur%20opening%20hours%20are%209-5pm%2C%20Monday%20to%20Friday.%20%0A%0APlease%20message%20us%20if%20you%20have%20any%20questions%20or%20if%20you%20would%20like%20to%20book%20an%20appointment.%20%0A

Upcoming events:
Event name: Summer Dance Fiesta
Event Descriptions: Join us for an exhilarating summer dance festival featuring a variety of styles, from salsa to hip-hop. Learn new moves, meet fellow dance enthusiasts, and showcase your talent on the dance floor.
Event Date: August 30 - September 3, 2024
Event Venue: Hong Kong Convention and Exhibition Centre
Food option: Food trucks and refreshment stalls on-site

Event name: Pottery Workshop Series
Event Descriptions: Unleash your inner artist and learn the art of pottery making. Experienced instructors will guide you through the entire process, from shaping the clay to glazing and firing your unique creations.
Event Date: September 7 - October 12, 2024 (Every Saturday)
Event Venue: Hong Kong Arts Centre
Food option: Light refreshments available



Event name: University Application Bootcamp
Event Descriptions: Prepare for your university applications with this comprehensive bootcamp. Receive guidance on essay writing, interview skills, and navigating the admissions process from experienced counselors.
Event Date: November 2 - 16, 2024 (Every Saturday and Sunday)
Event Venue: Hong Kong University of Science and Technology
Food option: Snacks and refreshments available
"""]

doc_ids = ["0"]

# db = chromadb.PersistentClient(path="./chroma", settings=Settings(), tenant=DEFAULT_TENANT, database=DEFAULT_DATABASE)

# collection_name = "zubin-foundation"

# doc_metadatas=[{"About": "Zubin Foundation"}]
# collection = db.get_or_create_collection(name=collection_name, embedding_function=chromadb.utils.embedding_functions.DefaultEmbeddingFunction())
# collection.add(documents=doc_chunks, ids=doc_ids, metadatas=doc_metadatas)




chatbot_instance = Chatbot()

print(chatbot_instance.query("i wanna do my registration for university bootcamp"))