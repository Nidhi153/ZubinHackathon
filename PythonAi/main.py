import json
import numpy as np
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

def recommend_events(request_data):
    # Extract skills and events from the request data
    volunteer_skills = request_data["skills"]
    events = request_data["events"]

    # Create skill to index mapping
    all_skills = list(set([skill for event in events for skill in event["skills"]] + volunteer_skills))
    skill_to_index = {skill: i for i, skill in enumerate(all_skills)}

    # Create skill vectors
    volunteer_vector = np.zeros(len(all_skills))
    for skill in volunteer_skills:
        volunteer_vector[skill_to_index[skill]] = 1

    event_skill_vectors = []
    for event in events:
        event_vector = np.zeros(len(all_skills))
        for skill in event["skills"]:
            event_vector[skill_to_index[skill]] = 1
        event_skill_vectors.append(event_vector)

    # Calculate cosine similarities
    similarities = [(event["event-id"], np.dot(volunteer_vector, event_vector) / (np.linalg.norm(volunteer_vector) * np.linalg.norm(event_vector))) for event_vector, event in zip(event_skill_vectors, events)]

    # Sort and return the top 3 events
    top_events = sorted(similarities, key=lambda x: x[1], reverse=True)[:3]
    return [{"event-id": event_id, "similarity": similarity} for event_id, similarity in top_events]

@app.post("/recommend-events")
async def get_recommended_events(request: Request):
    request_data = await request.json()
    response = recommend_events(request_data)
    return JSONResponse(content=response)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)