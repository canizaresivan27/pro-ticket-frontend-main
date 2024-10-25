import { apiRequest } from "@/api/request";
import type { ResellerCreate, UserCreate, UserUpdate } from "@/contracts";

//----------------------------------------------------- GET DATA ---------------------------------------------------------
export const getUsers = async (
  userId: string,
  page: number,
  limit: number
): Promise<object> => {
  return apiRequest({
    url: `/users/related/${userId}`,
    method: "get",
    params: { page, limit },
  });
};

export const getRelatedUsers = async (
  userId: string,
  page: number,
  limit: number
): Promise<object> => {
  return apiRequest({
    url: `/users/related/${userId}`,
    method: "get",
    params: { page, limit },
  });
};

export const getUserById = async (userId: string): Promise<object> => {
  return apiRequest({
    url: `/users/${userId}`,
    method: "get",
    params: {},
  });
};

//----------------------------------------------------- POST DATA ---------------------------------------------------------
export const createUser = async (user: UserCreate) => {
  return apiRequest({
    url: "/users",
    method: "post",
    data: new URLSearchParams({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      img: user.img,
      creatorId: user.creatorId,
    }).toString(),
  });
};

export const createReseller = async (user: ResellerCreate) => {
  return apiRequest({
    url: "/users/reseller",
    method: "post",
    data: new URLSearchParams({
      name: user.name,
      email: user.email,
      password: user.password,
      creatorId: user.creatorId,
    }).toString(),
  });
};

//----------------------------------------------------- UPDATE DATA ---------------------------------------------------------
export const updateUser = async (user: UserUpdate) => {
  return apiRequest({
    url: "/users",
    method: "put",
    data: new URLSearchParams({
      id: user.id,
      name: user.name,
      phone: user.phone,
      img: user.img,
      state: user.state,
    }),
  });
};

//----------------------------------------------------- DELETE DATA ---------------------------------------------------------
export const deleteUser = async (userId: string) => {
  return apiRequest({
    url: "/users",
    method: "delete",
    data: new URLSearchParams({ id: userId }).toString(),
  });
};

export const deleteUserReseller = async (userId: string) => {
  return apiRequest({
    url: "/users/reseller",
    method: "delete",
    data: new URLSearchParams({ id: userId }).toString(),
  });
};
