# Description
"Zubin Events" is a content management system tailor-made for the Zubin Foundation to centrally manage their events and participants in one system, reducing manual workload and inefficiency.
# Tech stack
![Tech stack](https://github.com/user-attachments/assets/df45a6c5-dee4-406e-a308-6830768b4f0e)

# Features
## Homepage: upcoming events and registered events
The homepage displays all upcoming events. Users can check the event details and register for an event. After registering, users can check the events they have registered and unregister if they are no longer interested in participating.
## Registering for an event
Members can register for an event after they have chosen one. They simply have to fill in a preset form by the admin and apply.
## Register as a volunteer
Volunteers can also apply to help out in an event. After clicking the “register as a volunteer” button, they can watch a training video if necessary and confirm that they have finished their training.
## View registration data as admin
Admins can check the registration data whenever necessary. A table shows all the information about registrants, including their names, phone numbers, and other details that they have filled in the form.
## Broadcast a message as an admin
Being a centralized content management system, Zubin Events can also support broadcasting WhatsApp messages to all participants registered in an event. The admin can directly send a message to all participants by just clicking one button.
## QR Code Attendance
Our platform redefines attendance management with a very effective  approach that leverages QR codes integrated seamlessly with WhatsApp. For each event, the admin can effortlessly generate and distribute unique QR codes directly to participants via WhatsApp, ensuring immediate and convenient access. During the event, a simple scan of the QR instantly records attendance, capturing real-time data with precision and ease. This method not only simplifies the process but also enhances participant engagement by utilizing a platform they are already familiar with. All attendance data is securely stored and easily accessible for future reference, guaranteeing that every aspect of the event is meticulously documented and ready for review at any time.
## Managing messages from members
When a member sends a message to the admin WhatsApp account, the message will be processed by the system. An AI algorithm categorizes the message and labels it with one or more tags, such as “emergency” and “food”. After sticking several labels onto this message, the system stores it in the database for the admin to view. The admin can reply to all messages directly on the website, and the reply will be sent via a WhatsApp message back to the members.
## Creating an event (template is incomplete)
When the admin wants to create an event, they are prompted to enter details about the new event, such as the name, date, and time. The admin can also specify which questions members should answer during registration, such as asking their names, addresses, preferences, and so on. This part functions similarly to Google Forms, only with a slight twist: the admin can present these questions in a template in order to keep the wording the same across all event forms.
# How to run it
To get started, clone the repository and paste these lines of code onto your terminal.
```
git clone https://github.com/Nidhi153/ZubinHackathon.git
cd PythonAi/whatsapp_api/
pip install -r requirements.txt
```

For running the AI chatbot, recommendation system, and whatsapp broadcasting run this code:
```
uvicorn main:app --host 0.0.0.0 --port 8000 
```

For running the webhook run this code:
```
ngrok http <port_number> --domain <domain>
```
You should also run another server in another terminal. Move to the qrcode directory and run:
```
uvicorn server:app --reload --host localhost --port 2000
```

And then open another terminal, move to the same PythonAI directory and run this code:
```
python webhook.py
```
To set up the fronend, run this code:
```
cd Frontend
npm install
npm run dev
```

Follow the link to go to `http://localhost:3000`.
