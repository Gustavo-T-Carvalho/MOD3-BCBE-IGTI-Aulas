import Sequelize from "sequelize"

const sequelize = new Sequelize(
    "postgres://lkiskhma:aEUJNNo-CSJNXV4AmX4tVus4AUoRdzqy@motty.db.elephantsql.com/lkiskhma",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
)

export default sequelize;