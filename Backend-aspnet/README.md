# Backend API with ASP.NET for system integration 

1. This backend API is currently replaced by Nextjs. 
2. This backend can system integrate the AI server (e.g. Chatbot, Whatsapp, Recommendation System) and the Nextjs together. 
3. This backend can remind users registered for an event a day before the event starts.

# Code features
1. Dependency injection
- 3rd-party services are injected through dependency injection as per needed. This enables plug-and-play of 3rd party APIs. Therefore, the system integration is very horizontally scalable.
2. Written to easily generate Open API (Swagger) specification.
- In the future, development can be eased because of the API specification developed. 

# Advantage of using this backend

1. Zubin can extend the capabilities of their platform by introducing more 3rd party APIs into this ASP.NET backend through dependency injection.

# Future improvement
1. Loosely coupled
- The API client code, the controller, and the core business logic inside this ASP.NET can be broken down into 3 independent projects in the future, which is common in real world system integration.
- Making this code even easier to maintain.
