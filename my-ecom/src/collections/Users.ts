import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    create: () => true, // Allow anyone to create a user account (public signup)
    read: () => true, // Allow anyone to read users (you can restrict this if needed)
    update: ({ req: { user } }) => {
      // Users can update their own account
      if (user) {
        return true
      }
      return false
    },
    delete: ({ req: { user } }) => {
      // Only authenticated users can delete (you can restrict further if needed)
      return !!user
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
