## Description

Simple Club management User endpoints(GET , POST , PATCH , DELETE)


## API hosted on Heroku

```bash
https://mahadi-hotel-mgt.herokuapp.com
```
## API documentation link(Live)

```bash
All user : 
 GET : https://mahadi-hotel-mgt.herokuapp.com/users/all
```

```bash
Create user : 
 POST : https://mahadi-hotel-mgt.herokuapp.com/users/all
 
 payload : 
  {
   "name" : "Mahadi"
   "Designation" : "Software Engineer"
   "Description" : "Lorem ipsum..."
   "image" : "mahadi.png"
  }
```

```bash
Single user : 
 GET : https://mahadi-hotel-mgt.herokuapp.com/users/singleuser/{userId}
```

```bash
Update user : 
 PATCH : https://mahadi-hotel-mgt.herokuapp.com/users/userupdate/{userId}
 
  payload : 
  {
   "name" : "Mahadi Hassan"
   "Designation" : "Senior Software Engineer"
  }
  
```

```bash
Delete user : 
 DEL : https://mahadi-hotel-mgt.herokuapp.com/users/delete/{userId}
```

## Installation locally(clone the repo and enter into the project folder)

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

## API documentation link(local) : 

```bash
https://documenter.getpostman.com/view/13826612/UVkjwJLL
```


## 🚫 .ENV file  

```bash
.env file uploaded for reducing hassle at testing end . It's not recommended ! 
```

