import { BASE_URL } from "@/lib/utils";
// import { getSession, signOut } from "next-auth/react";

const generateSearchParams = (url: string, params?: object) => {
  const newUrl = new URL(url);
  if (params) {
    for (const key of Object.keys(params)) {
      const value = (params as any)[key];
      if (value) {
        newUrl.searchParams.set(key, value);
      }
    }
  }
  console.log(newUrl.toString());
  return newUrl.toString();
};

// const getToken = async () => {
//   const session = await getSession();
//   if (session) return session.user.token;
//   return null;
// };

export const getData = async (
  slug: string,
  params?: object,
  cacheType?: RequestCache
) => {
  //   const token = await getToken();
  let headers: HeadersInit | undefined = undefined;

  //   if (token) {
  //     headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //   }

  const res = await fetch(generateSearchParams(`${BASE_URL}${slug}`, params), {
    cache: cacheType ? cacheType : undefined,
    headers,
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};

// POST
export const postData = async <T>(slug: string, body: T) => {
  //   const token = await getToken();
  const headers: HeadersInit | undefined = {
    "Content-Type": "application/json",
  };

  //   if (token) {
  //     headers["Authorization"] = `Bearer ${token}`;
  //   }

  const res = await fetch(`${BASE_URL}${slug}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};

// POST FORMDATA
export const postFormData = async (slug: string, body: FormData) => {
  //   const token = await getToken();
  const headers: HeadersInit | undefined = {
    "Content-Type": "multipart/form-data",
  };

  //   if (token) {
  //     headers["Authorization"] = `Bearer ${token}`;
  //   }

  const res = await fetch(`${BASE_URL}${slug}`, {
    method: "POST",
    headers,
    body: body,
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};

// PUT
export const putData = async <T>(slug: string, body: T) => {
  //   const token = await getToken();
  const headers: HeadersInit | undefined = {
    "Content-Type": "application/json",
  };

  //   if (token) {
  //     headers["Authorization"] = `Bearer ${token}`;
  //   }

  const res = await fetch(`${BASE_URL}${slug}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};

// PATCH
export const patchData = async <T>(slug: string, body: T) => {
  //   const token = await getToken();
  const headers: HeadersInit | undefined = {
    "Content-Type": "application/json",
  };

  //   if (token) {
  //     headers["Authorization"] = `Bearer ${token}`;
  //   }

  const res = await fetch(`${BASE_URL}${slug}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};

// DELETE
export const deleteData = async (slug: string) => {
  //   const token = await getToken();
  let headers: HeadersInit | undefined = undefined;

  //   if (token) {
  //     headers = {
  //       Authorization: `Bearer ${token}`,
  //     };
  //   }

  const res = await fetch(`${BASE_URL}${slug}`, {
    method: "DELETE",
    headers,
  });

  //   if (res.status === 401) {
  //     return signOut();
  //   }

  return res.json();
};
