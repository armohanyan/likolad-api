import {Contact} from "../models";
import {IContact} from "../types/contact";
import createHttpError from "http-errors";

export default class ContactService {
    static async getContacts() {
        return await Contact.findAll();
    }

    static async createContact(data: IContact) {
        const {phone, location, gmail, instagram, facebook, linkedin} = data

        return await Contact.create({
            phone: phone || 'N/A',
            gmail: gmail || 'N/A',
            instagram: instagram || 'N/A',
            facebook: facebook || 'N/A',
            linkedin: linkedin || 'N/A',
            location: location || 'N/A',
        });
    }

    static async updateContact(id: number, data: IContact) {
        const {phone, location, gmail, instagram, facebook, linkedin} = data

        const contact = await Contact.findByPk(id);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        await contact.update({
            phone: phone || 'N/A',
            gmail: gmail || 'N/A',
            location: location || 'N/A',
            instagram: instagram || 'N/A',
            facebook: facebook || 'N/A',
            linkedin: linkedin || 'N/A',
        });

        return contact;
    }
}
