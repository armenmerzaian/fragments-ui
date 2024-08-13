// src/api.ts

// fragments microservice API to use, defaults to localhost:8080 if not set in env
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

/**
 * Given an authenticated user, request all fragments for this user from the
 * fragments microservice (currently only running locally). We expect a user
 * to have an `idToken` attached, so we can send that along with the request.
 */
export async function getUserFragments(user: any, expand: number = 0) {
  console.log("Requesting user fragments data...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments?expand=${expand}`, {
      // Generate headers with the proper Authorization bearer token to pass.
      // We are using the `authorizationHeaders()` helper method we defined
      // earlier, to automatically attach the user's ID token.
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Successfully got user fragments data", { data });
    return data;
  } catch (err) {
    console.error("Unable to call GET /v1/fragment", { err });
  }
}


/**
 * Get fragment data for a specific fragment id.
 */
export async function getFragmentById(user: any, id: string, ext: any) {
 console.log(`Requesting fragment data for id: ${id}...`);
 try {
   const res = await fetch(
     `${apiUrl}/v1/fragments/${id}${ext ? `.${ext}` : ""}`,
     {
       headers: user.authorizationHeaders(),
     }
   );
   if (!res.ok) {
     throw new Error(`${res.status} ${res.statusText}`);
   }

   // Check the response content type to determine how to parse the response
   const contentType = res.headers.get("Content-Type");
   let data;
   if (contentType?.includes("application/json")) {
     data = await res.json();
   } else {
     data = await res.text();
   }

   console.log(`Successfully got fragment data for id: ${id}`, { data });
   return data;
 } catch (err) {
   console.error(`Unable to call GET /v1/fragments/${id}`, { err });
 }
}

/**
 * Get metadata for a specific fragment id.
 */
export async function getFragmentMetadata(user: any, id: string) {
  console.log(`Requesting fragment metadata for id: ${id}...`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}/info`, {
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log(`Successfully got fragment metadata for id: ${id}`, { data });
    return data;
  } catch (err) {
    console.error(`Unable to call GET /v1/fragments/${id}/info`, { err });
  }
}

/**
 * Create a new fragment for the authenticated user.
 */
export async function createFragment(user: any, content: string, type: string) {
  console.log("Creating a new fragment...");
  try {
    const res = await fetch(`${apiUrl}/v1/fragments`, {
      method: "POST",
      headers: user.authorizationHeaders(type),
      body: content,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Successfully created fragment", { data });
    return data;
  } catch (err) {
    console.error("Unable to call POST /v1/fragments", { err });
  }
}

/**
 * Update an existing fragment for the authenticated user.
 */
export async function updateFragment(user: any, id: string, content: string, type: string) {
  console.log(`Updating fragment with id: ${id}...`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "PUT",
      headers: user.authorizationHeaders(type),
      body: content,
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Successfully updated fragment", { data });
    return data;
  } catch (err) {
    console.error(`Unable to call PUT /v1/fragments/${id}`, { err });
  }
}

/**
 * Delete a fragment for the authenticated user.
 */
export async function deleteFragment(user: any, id: string) {
  console.log(`Deleting fragment with id: ${id}...`);
  try {
    const res = await fetch(`${apiUrl}/v1/fragments/${id}`, {
      method: "DELETE",
      headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    console.log(`Successfully deleted fragment with id: ${id}`);
    return true;
  } catch (err) {
    console.error(`Unable to call DELETE /v1/fragments/${id}`, { err });
    return false;
  }
}