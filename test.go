package main

import (
	"fmt"
)

func main() {
	var num, totalDigit, i int
	var count int = 10

	fmt.Scan(&num)

	for i = 0; i < num; i++ {
		count *= 10
		num /= count
		totalDigit += num
	}
	
	switch {
		case totalDigit % 5 == 0:
			fmt.Print("Diskon")
		case totalDigit % 3 == 0 && !(totalDigit % 5 == 0):
			fmt.Print("Cashback")
		default:
			fmt.Print("Invalid")
	}
}