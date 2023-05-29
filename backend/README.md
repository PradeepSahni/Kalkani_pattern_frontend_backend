# create db  and table schema 
npx sequelize-cli db:create
npx sequelize-cli db:migrate

# run seeder 
npx sequelize-cli db:seed --seed 20220913114332-users.js
npx sequelize-cli db:seed --seed 20220913114333-address.js

    1. api/updateUser
    2. api/getUsers?city=Fort Lelandport&search=Ke
    3. api/pattern/5