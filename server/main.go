package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

// User write down thanks to https://mholt.github.io/json-to-go/
type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Address  struct {
		Street  string `json:"street"`
		Suite   string `json:"suite"`
		City    string `json:"city"`
		Zipcode string `json:"zipcode"`
		Geo     struct {
			Lat string `json:"lat"`
			Lng string `json:"lng"`
		} `json:"geo"`
	} `json:"address"`
	Phone   string `json:"phone"`
	Website string `json:"website"`
	Company struct {
		Name        string `json:"name"`
		CatchPhrase string `json:"catchPhrase"`
		Bs          string `json:"bs"`
	} `json:"company"`
}

var users []User

func init() {
	log.Println("init data")
	rawData, err := ioutil.ReadFile("users.json")
	if err != nil {
		log.Fatalf("Error init data to search: %v", err)
	}

	err = json.Unmarshal(rawData, &users)
	if err != nil {
		log.Fatalf("Error unmarshal data to search: %v", err)
	}
}

func searchUser(rw http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()
	for k := range queries {
		log.Print(fmt.Sprintf("chiave: %s = %v", k, queries.Get(k)))
	}

	var candidate User
	for _, candidate = range users {
		if strings.Contains(candidate.Name, queries.Get("name")) {
			break
		}
	}

	log.Print(rw.Write([]byte(fmt.Sprintf("hello you are searching for: %s\n\n", queries.Get("name")))))

	result, err := json.Marshal(&candidate)
	if err != nil {
		http.Error(rw, "Error on parsing json", http.StatusInternalServerError)
	}
	rw.Write(result)
}

func main() {
	http.HandleFunc("/search", searchUser)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
