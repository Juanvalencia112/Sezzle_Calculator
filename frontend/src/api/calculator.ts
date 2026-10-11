import axios from 'axios';


const API_URL = 'http://localhost:8080/api'; 

export interface CalculationRequest {
    a: number;
    b?: number;
    operation: string;
}

export interface CalculationResponse {
    result: number;
    error?: string;
}

export const calculate = async (data: CalculationRequest): Promise<CalculationResponse> => {
    const response = await axios.post<CalculationResponse>(`${API_URL}/calculate`, data);
    return response.data;
};