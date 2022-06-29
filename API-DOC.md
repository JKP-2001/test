<div align="center">

# Api Documentation (Company Side):
</div>

## Endpoints:-

### 1. **Register A Company API**
- For registering a company 
- URL for registration
  ```http
  POST /company/register
  ```
- Request body structure for registering user.

  | Parameter | Type | Required | Description | Default |
  | :--- | :--- | :--- | :--- | :---|
  | `email` | `string` | **true** | company email | - 
  | `password` | `string` | **true** | password | - 
  | `company_name` | `string` | **true** | company name | - 
  | `postal_address` | `string` | **true** | postal address of company | - 
  | `office_contact` | `string` | **true** | contact of office | -
  | `organization_type` | `string` | **true** | type of oraganization | -
  | `indrustry_sec` | `string` | **true** | indrusty section | - 
  | `F_email` | `string` | **true** | first point of contact email | - 
  | `F_name` | `string` | **true** | first point of contact name | - 
  | `F_altemail` | `string` | **false** | first point of contact alternate email | "" 
  | `F_contact` | `string` | **true** | first point of contact contact | - 
  | `S_email` | `string` | **true** | second point of contact email | - 
  | `S_name` | `string` | **true** | second point of contact name | - 
  | `S_altemail` | `string` | **false** | second point of contact alternate email | ""
  | `S_contact` | `string` | **true** | second point of contact contact | - 
  | `company_desc` | `string` | **false** | company desc in TEXT | ""
  | `Company_Desc` | `file` | **false** | company desc in **PDF** (**max 10MB**) and this will add to the DB as (**company_desc_path**) | ""



  

- Example Input (**If PDF Is Not Choosen**)
  
    ![image](https://user-images.githubusercontent.com/84286157/176546111-0fcb9da8-e303-4f88-a508-03597dda4cdd.png)
    ![image](https://user-images.githubusercontent.com/84286157/176546132-54460e2f-684b-460b-9dea-3d45bf059d5b.png)


- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": ""
  }
  ```
- Example Input (**If PDF Is Choosen**)
  
    ![image](https://user-images.githubusercontent.com/84286157/176546111-0fcb9da8-e303-4f88-a508-03597dda4cdd.png)|
    ![image](https://user-images.githubusercontent.com/84286157/176546840-233b1299-840e-45a5-b5e5-3a28bad685e5.png)

- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": "http://localhost:5000/uploads/company/2-48-53-30-6-2022-admit card.pdf"
  }
  ```
- Remarks:
  - Here we get a response in which the keys are **msg** and **url** and values are  **success** and a **url** of the uploaded file.



### 2. **Edit A Company Details**
- For edit A Registered Company.
- URL
  ```http
  PUT /company/update-profile/:id
  ```
- Remarks:
  - Here id is passed as a parameter is the **_id** of the company document in the DB.

- Request body structure

    | Parameter | Type | Required | Description | Default |
    | :--- | :--- | :--- | :--- | :---|
    | `company_name` | `string` | **true** | company name | - 
    | `postal_address` | `string` | **true** | postal address of company | - 
    | `office_contact` | `string` | **true** | contact of office | -
    | `organization_type` | `string` | **true** | type of oraganization | -
    | `indrustry_sec` | `string` | **true** | indrusty section | - 
    | `F_email` | `string` | **true** | first point of contact email | - 
    | `F_name` | `string` | **true** | first point of contact name | - 
    | `F_altemail` | `string` | **false** | first point of contact alternate email | "" 
    | `F_contact` | `string` | **true** | first point of contact contact | - 
    | `S_email` | `string` | **true** | second point of contact email | - 
    | `S_name` | `string` | **true** | second point of contact name | - 
    | `S_altemail` | `string` | **false** | second point of contact alternate email | ""
    | `S_contact` | `string` | **true** | second point of contact contact | - 
    | `company_desc` | `string` | **false** | company desc in TEXT | ""
    | `Company_Desc` | `file` | **false** | company desc in **PDF** (**max 10MB**) and this will add to the DB as (**company_desc_path**) | ""

- Example Input (**If PDF Is Not Choosen**)
  
    ![image](https://user-images.githubusercontent.com/84286157/176549709-bfbb1331-49fc-4207-975b-942f3f688431.png)


- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": ""
  }
  ```
- Example Input (**If PDF Is Choosen**)
  
    ![image](https://user-images.githubusercontent.com/84286157/176549709-bfbb1331-49fc-4207-975b-942f3f688431.png)
    ![image](https://user-images.githubusercontent.com/84286157/176549781-6bd647de-3cb5-4f53-85c9-a89310b868c0.png)

- Example Response on success **(status code 200)**
  ```javascript
  {
  "msg": "success",
  "url": "http://localhost:5000/uploads/company/3-9-57-30-6-2022-4-D.pdf"
  }
  ```
- Remarks:
  - Here we get a response in which the keys are **msg** and **url** and values are  **success** and a **url** of the uploaded file.
    

### 3. **Getting A Registered Company Details**
- For retrieving details of A Registered Company.
- URL
  ```http
  GET /company/get-company/:id
  ```
- Remarks:
  - Here id is passed as a parameter is the **_id** of the company document in the DB. 

Example Response on success **(status code 200)**
  ```javascript
{
    "first_point": {
        "email": "at@gmail.com",
        "full_name": "Atul Kumar",
        "alt_email": "atx@gmail.com",
        "contact": "8837462736"
    },
    "second_point": {
        "email": "atxs@gmail.com",
        "full_name": "Atx Singh",
        "alt_email": "atxss@gmail.com",
        "contact": "9878986567"
    },
    "_id": "62bcc4382f176ac179c157e2",
    "email": "johndoe@gmail.com",
    "company_name": "HP",
    "company_desc": "",
    "company_desc_path": "",
    "postal_address": "Cecilia Chapman Nulla St. Mankato Mississippi",
    "website_url": "https://hp.com/en",
    "office_contact": "9939925438",
    "organization_type": "Tech",
    "indrustry_sec": "IT",
    "__v": 0
}
