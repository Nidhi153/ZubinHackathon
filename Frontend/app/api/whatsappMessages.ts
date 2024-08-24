import axios, { AxiosResponse } from 'axios';

export interface WhatsappBroadcast {
    broadcast_id: string;
    message: string;
    contacts: number[];
    // Add other fields as necessary
}

export interface WhatsappResponse {
    response_id: string;
    message: string;
    contacts: number;
    user_id: string;
    tags: string[];
    // Add other fields as necessary
}

// CREATE BROADCAST : POST /broadcasts
export async function createWhatsappBroadcast(broadcast: WhatsappBroadcast): Promise<WhatsappResponse> {
    try {
        const response: AxiosResponse<WhatsappResponse> = await axios.post('/broadcasts', broadcast);
        return response.data;
    } catch (error) {
        console.error('Error creating Whatsapp broadcast:', error);
        throw error;
    }
}  

// READ ALL RESPONSES : GET /responses
export async function getAllWhatsappResponses(): Promise<WhatsappResponse[]> {
    try {
      const response: AxiosResponse<WhatsappResponse[]> = await axios.get('/responses');
      return response.data;
    } catch (error) {
      console.error('Error getting Whatsapp responses:', error);
      throw error;
    }
}

// READ RESPONSE : GET /responses/:id
export async function getWhatsappResponse(id: string): Promise<WhatsappResponse> {
    try {
      const response: AxiosResponse<WhatsappResponse> = await axios.get(`/responses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting Whatsapp response:', error);
      throw error;
    }
}