import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

interface ContactAttributes {
  id: number;
  phone: string;
  location: string;
  gmail: string;
  instagram: string;
  facebook: string;
  linkedin: string;
}

type ContactCreationAttributes = Optional<ContactAttributes, 'id'>;

export default (sequelize: Sequelize) => {
  class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    public id!: number;
    public phone!: string;
    public location!: string;
    public gmail!: string;
    public instagram!: string;
    public facebook!: string;
    public linkedin!: string;
  }

  Contact.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'contacts',
  });

  return Contact;
};
