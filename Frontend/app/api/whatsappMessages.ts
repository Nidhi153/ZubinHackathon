
export interface whatsappBroadcast {
    broadcast_id: string;
    message: string;
    contacts: number[];
    // Add other fields as necessary
}

export interface whatsappResponse {
    response_id: string;
    message: string;
    contacts: number;
    user_id: string;
    tags: string[];
    // Add other fields as necessary
}

// CREATE BROADCAST : POST /broadcasts

// READ RESPONSE : GET /responses/:id