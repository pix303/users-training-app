package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/schema"
	"github.com/jinzhu/copier"
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

// users rappresents data to search
var users []User

// errors constants
const (
	ERROR_LOADING_DATA           = "error on load data"
	ERROR_PARSING_DATA           = "error on parsing json data"
	ERROR_PARAMETER              = "parameter not allowed"
	ERROR_USER_NOT_FOUND         = "user not found"
	ERROR_USER_NOT_TRANSFORMABLE = "user cant be transformed in json"
)

type UserResponse struct {
	Message string `json:"message"`
	Value   string `json:"value"`
}

// init load and prepare data
func init() {
	log.Println("init data...")
	rawData, err := os.ReadFile("users.json")
	if err != nil {
		log.Fatalf("%s %v", ERROR_LOADING_DATA, err)
	}

	err = json.Unmarshal(rawData, &users)
	if err != nil {
		log.Fatalf("%s %v", ERROR_PARSING_DATA, err)
	}
	log.Printf("data loaded: %d users", len(users))
}

// welcomeHandler give a feedback and welcome
func welcomeHandler(rw http.ResponseWriter, r *http.Request) {
	rw.Write([]byte("Welcome to search user server with search endpoint"))
}

func setHeaders(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	(*w).Header().Set("Content-Type", "application/json")
}

// searchUserHandler handles request for searching user by name
func searchUserHandler(rw http.ResponseWriter, r *http.Request) {
	queries := r.URL.Query()

	if searchName := queries.Get("name"); searchName == "" {
		http.Error(rw, ERROR_PARAMETER, http.StatusBadRequest)
		return
	}

	var candidates []User = make([]User, 0)
	for _, candidate := range users {
		if strings.Contains(strings.ToLower(candidate.Name), strings.ToLower(queries.Get("name"))) {
			candidates = append(candidates, candidate)
		}
	}

	setHeaders(&rw)
	result, err := json.Marshal(&candidates)
	if err != nil {
		http.Error(rw, ERROR_USER_NOT_TRANSFORMABLE, http.StatusInternalServerError)
	}

	log.Printf("Num items found: %d\r", len(candidates))

	rw.Write(result)
}

// userHandler return user by id
func userHandler(rw http.ResponseWriter, r *http.Request) {
	pathParts := strings.Split(r.URL.Path, "/")
	id, err := strconv.Atoi(pathParts[len(pathParts)-1])
	if err != nil {
		http.Error(rw, ERROR_PARAMETER, http.StatusBadRequest)
	}

	var candidate User
	var candidateFounded = false
	for _, candidate = range users {
		if candidate.ID == id {
			candidateFounded = true
			break
		}
	}

	setHeaders(&rw)

	if !candidateFounded {
		http.Error(rw, ERROR_USER_NOT_FOUND, http.StatusNoContent)
		return
	}

	result, err := json.Marshal(&candidate)
	if err != nil {
		http.Error(rw, ERROR_USER_NOT_TRANSFORMABLE, http.StatusInternalServerError)
		return
	}

	//log.Println(string(result))

	rw.Write(result)
}

func usersHandler(rw http.ResponseWriter, r *http.Request) {
	setHeaders(&rw)
	result, err := json.Marshal(&users)
	if err != nil {
		http.Error(rw, ERROR_USER_NOT_TRANSFORMABLE, http.StatusInternalServerError)
		return
	}

	rw.Write(result)
}

func singleUserHandler(rw http.ResponseWriter, r *http.Request) {

	if r.Method == "DELETE" {
		http.Error(rw, "Method not yet implemented", http.StatusNotImplemented)
		return
	}

	if r.Method != "POST" {
		http.Error(rw, "Not allowed method", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(0)
	if err != nil {
		http.Error(rw, fmt.Sprintf("error on parse data: %s", err.Error()), http.StatusBadRequest)
		return
	}

	var decoder = schema.NewDecoder()
	var user User
	decoder.Decode(&user, r.PostForm)

	var ur UserResponse

	if r.FormValue("id") != "" {
		user.ID, _ = strconv.Atoi(r.FormValue("id"))
		for k := range users {
			u := &users[k]
			if u.ID == user.ID {
				copier.Copy(&u, &user)
				ur.Message = "User updated"
				ur.Value = strconv.Itoa(user.ID)
				break
			}
		}
	} else {
		user.ID = len(users) + 1
		users = append(users, user)
		ur.Message = "User added"
		ur.Value = strconv.Itoa(user.ID)
	}

	urBody, err := json.Marshal(&ur)
	if err != nil {
		http.Error(rw, fmt.Sprintf("error on marshall data response: %s", err.Error()), http.StatusInternalServerError)
		return
	}

	rw.Write(urBody)
}

func main() {
	http.HandleFunc("/", welcomeHandler)
	http.HandleFunc("/users/search", searchUserHandler)
	http.HandleFunc("/users/", userHandler)
	http.HandleFunc("/users", usersHandler)
	http.HandleFunc("/user", singleUserHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
