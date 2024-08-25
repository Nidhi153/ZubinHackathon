# Backend API with ASP.NET for system integration

1. This backend API is currently replaced by Nextjs. 
2. This backend can system integrate the AI server (e.g. Chatbot, Whatsapp, Recommendation System) and the Nextjs together. 
3. This backend can remind users registered for an event a day before the event starts.

# Code features

1. Loosely coupled

- The UI (controller) and the API client codes have separate models and are contained in separate projects. Hence, increase the maintainability. 

2. Dependency injection

- 3rd-party services are injected through dependency injection as per needed. This enables plug-and-play of 3rd party APIs. Therefore, the system integration is very horizontally scalable. 

# Advantage of using this backend

1. Zubin can extend the capabilities of their platform by introducing more 3rd party APIs into this ASP.NET backend through dependency injection.
2. Code can be maintained easily because the controllers are written in a way easy to generate Open API specification (Swagger).  
