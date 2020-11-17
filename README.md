![GoStack][logo]

## GoBarber Backend App

[![AWS Deploy](https://img.shields.io/badge/-View_Online-brightgreen?style=flat&logo=amazon-aws&logoColor=white)][deploy]

---

### 📝 Instructions (development)

1. Install **Docker**.

2. Create and run a *Docker* container from a **PostgreSQL** image:

    ```bash
    docker run -d --name gobarber_postgres -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DATABASE=gostack_gobarber -p 5432:5432 postgres
    ```

    * Check if `uuid-ossp` extension is available to this database.

3. Create and run a *Docker* container from a **MongoDB** image:

    ```bash
    docker run -d --name gobarber_mongo MONGODB_DATABASE=gostack_gobarber -p 27017:27017 -t mongo
    ```

4. Create and run a *Docker* container from a **Redis** image:

    ```bash
    docker run -d --name gobarber_redis -p 6379:6379 -t redis:alpine
    ```

5. Install all dependencies:

    ```bash
    yarn
    ```

6. Run **TypeORM** migrations:

    ```bash
    yarn typeorm migrations:run
    ```

7. Run the project in development mode:

    ```bash
    yarn dev:server
    ```

[logo]: https://github.com/leonardosposina/gostack13-lv01-d01/blob/master/docs/gostack-bootcamp.png?raw=true
[deploy]: http://
