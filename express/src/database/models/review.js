module.exports = (sequelize, DataTypes) => {
const Review = sequelize.define('Review', {
  reviewID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'productID'
      }
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    numberOfStars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
     reviewText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
      dateCreated: {
        type: DataTypes.DATE,
        allowNull: false 
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active'  //Values can be 'active', 'flagged', 'deleted'
      }
  }, {
    tableName: 'Reviews'
  });
  return Review; 
}