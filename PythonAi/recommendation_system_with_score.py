import json
import numpy as np

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

# Example usage
request_data = {
    "skills": ["pottery", "painting"],
    "events": [
        {"event-id": "1", "skills": ["public speaking", "painting", "pottery"]},
        {"event-id": "2", "skills": ["cooking", "yoga", "dancing"]},
        {"event-id": "3", "skills": ["painting", "singing", "dancing"]},
        {"event-id": "4", "skills": ["archery", "pottery", "public speaking"]}
    ]
}

# Read request data from a JSON file
with open("request.json", "r") as file:
    request_data = json.load(file)

# Call the recommend_events function
response = recommend_events(request_data)

# Write the output to a JSON file
with open("response.json", "w") as file:
    json.dump(response, file, indent=2)

print("Response saved to response.json")