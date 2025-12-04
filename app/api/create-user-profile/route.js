// app/api/create-user-profile/route.js
import { NextResponse } from 'next/server';
import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export async function POST(request) {
  try {
    const { firstName, lastName, email, phone } = await request.json();

    // Validate input
    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: 'First name and last name are required' },
        { status: 400 }
      );
    }

    // Create user profile in database
    const profile = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID,
      'user_profiles',
      'unique()',
      {
        first_name: firstName,
        last_name: lastName,
        email: email || '',
        phone: phone || '',
        created_at: new Date().toISOString()
      }
    );

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Error creating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to create user profile' },
      { status: 500 }
    );
  }
}