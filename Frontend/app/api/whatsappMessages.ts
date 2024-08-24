import axios, { AxiosResponse } from 'axios';

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
export async function createWhatsappBroadcast(broadcast: whatsappBroadcast): Promise<whatsappResponse> {
    try {
        const response: AxiosResponse<whatsappResponse> = await axios.post('/broadcasts', broadcast);
        return response.data;
    } catch (error) {
        console.error('Error creating Whatsapp broadcast:', error);
        throw error;
    }
}  

// READ ALL RESPONSES : GET /responses
export async function getAllWhatsappResponses(): Promise<whatsappResponse[]> {
    try {
      const response: AxiosResponse<whatsappResponse[]> = await axios.get('/responses');
      return response.data;
    } catch (error) {
      console.error('Error getting Whatsapp responses:', error);
      throw error;
    }
}

// READ RESPONSE : GET /responses/:id
export async function getWhatsappResponse(id: string): Promise<whatsappResponse> {
    try {
      const response: AxiosResponse<whatsappResponse> = await axios.get(`/responses/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting Whatsapp response:', error);
      throw error;
    }
}