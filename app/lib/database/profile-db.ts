import Profile from "../models/Profile";

//Create new profile
export async function createProfile(email: string) {
  try {
    const profile = new Profile({ email: email });

    await profile.save();
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//Add Contact to each user
export async function addContacts(inviter: string, accepter: string) {
  try {
    const addToInviter = await Profile.findOne({ userId: inviter });
    addToInviter.contacts?.push(accepter);
    await addToInviter.save();

    const addToAccepter = await Profile.findOne({ userId: accepter });
    addToAccepter.contacts?.push(inviter);
    await addToAccepter.save();

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

//Remove Contact
export async function removeContact(userID: string, contact: string) {
  try {
    const profile = await Profile.findOne({ userId: userID });
    const index = profile?.contacts.indexOf(contact);

    if (index > -1) {
      profile?.contacts.splice(index, 1);
    }

    await profile.save();

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
