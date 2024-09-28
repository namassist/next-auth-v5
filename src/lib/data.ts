export async function getUserInfo(token: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/user-info`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userInfo: UserInfoResponse = await res.json();

    if (!userInfo.meta.success) {
      return userInfo;
    }

    return userInfo as UserInfoSuccess;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}
