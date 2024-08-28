import {Contact} from "../models";
import {IContact} from "../types/contact";
import createHttpError from "http-errors";

export default class ContactService {
    static async getContacts() {
        return await Contact.findAll();
    }

    static async createContact(data: IContact) {
        const {phone, location, gmail, instagram, facebook, linkedin} = data

        return await Contact.create({phone, location, gmail, instagram, facebook, linkedin});
    }

    static async updateContact(id: number, data: IContact) {
        const {phone, location, gmail, instagram, facebook, linkedin} = data

        const contact = await Contact.findByPk(id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        contact.phone = phone || 'N/A';
        contact.location = location || 'N/A';
        contact.gmail = gmail || 'N/A';

        contact.instagram = instagram || 'N/A';
        contact.facebook = facebook || 'N/A';
        contact.linkedin = linkedin || 'N/A';

        await contact.save();

        return contact;
    }
}
