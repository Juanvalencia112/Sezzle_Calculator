package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type RequestPayload struct {
	A         float64 `json:"a"`
	B         float64 `json:"b"`
	Operation string  `json:"operation"`
}

type ResponsePayload struct {
	Result float64 `json:"result,omitempty"`
	Error  string  `json:"error,omitempty"`
}

func calculateHandler(w http.ResponseWriter, r *http.Request) {
	
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload RequestPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ResponsePayload{Error: "Invalid JSON format"})
		return
	}

	result, err := Calculate(payload.A, payload.B, payload.Operation)
	
	w.Header().Set("Content-Type", "application/json")
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ResponsePayload{Error: err.Error()})
		return
	}

	json.NewEncoder(w).Encode(ResponsePayload{Result: result})
}

func main() {
	http.HandleFunc("/api/calculate", calculateHandler)
	log.Println("Server starting on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}