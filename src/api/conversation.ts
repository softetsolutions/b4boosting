import { handleUnauthorized } from "src/utils/auth";
export async function getAllConversations(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/user/${userId}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      await handleUnauthorized();
      return;
    }
    const errMessage = await response.json();
    throw new Error(errMessage.message);
  }

  const data = await response.json();
  return data;
}

export async function getAllMessagesBetweenTwoUsers(
  userId: string,
  receiverId: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/between/${userId}/${receiverId}`,
    {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      await handleUnauthorized();
      return;
    }
  let errMessage = "Failed to fetch messages.";
      try {
        const json = await response.json();
        errMessage = json?.message || errMessage;
      } catch {
        // In case response is not valid JSON
      }
      throw new Error(errMessage);
  }

  const data = await response.json();
  return data;
}
