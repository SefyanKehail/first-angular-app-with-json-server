# FirstAngularApp

Application for managing products lists and authentication / roles

# Technologies

#### 1)  Angular: 17.3.7
#### 2) Node: 20.11.1
#### 3) Bootstrap 5.3.3
#### 4) JSON-SERVER as fake backend.

# Covered topics

#### 1) Right use of services
#### 2) Managing states using Behaviour Subjects
#### 3) Getting familiar with Lifecycle Hooks and Change Detection Mechanism
#### 4) Reactive Forms
#### 5) Stateless Authentication ( I should have stored JWT tokens in secure HttpOnly cookies, but I used session storage for simplification)
#### 6) Functional Route Guards
#### 7) Http Interceptors
#### 9) Reusable Custom Toast Messages
#### 10) From scratch pagination
#### 11) Environment variables

# Start App:

Angular server:
<code>npm run start</code> or <code>ng serve</code>

JSON server:
<code>json-server --watch ./fake-database/db.json -p 8089 -H 0.0.0.0
</code>



### Important:

Please make sure to install this version of JSON-SERVER 0.17.4 or the search feature is not available:

<code>npm install -g json-server@0.17.4</code>
