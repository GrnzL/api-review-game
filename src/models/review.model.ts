import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
import { Game } from "./game.model";

export interface ReviewAttributes {
  id: number;
  gameId: number;
  rating: number;
  review: string;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, "id"> {
}

export class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes {
  public id!: number;
  public gameId!: number;
  public rating!: number;
  public review!: string;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "game_id",
      references: {
        model: Game,
        key: "id"
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      }
    },
    review: {
      type: DataTypes.STRING,
      field: "review_text",
      allowNull: true,
    }

  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, { foreignKey: "game_id" });
Game.hasMany(Review, { foreignKey: "game_id" });