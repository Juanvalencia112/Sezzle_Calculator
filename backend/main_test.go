package main

import (
	"testing"
)

func TestCalculate(t *testing.T) {
	
	tests := []struct {
		name      string
		a         float64
		b         float64
		operation string
		expected  float64
		expectErr bool
	}{
		{"Suma simple", 5, 3, "add", 8, false},
		{"Resta simple", 10, 4, "subtract", 6, false},
		{"Multiplicacion", 7, 6, "multiply", 42, false},
		{"Division exacta", 20, 5, "divide", 4, false},
		{"Division por cero", 10, 0, "divide", 0, true},
		{"Operacion invalida", 5, 5, "power", 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := Calculate(tt.a, tt.b, tt.operation)
			
		
			if (err != nil) != tt.expectErr {
				t.Errorf("esperaba error: %v, obtuve: %v", tt.expectErr, err)
			}
			
			
			if result != tt.expected {
				t.Errorf("esperaba resultado: %v, obtuve: %v", tt.expected, result)
			}
		})
	}
}